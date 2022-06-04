import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase.config"
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import formatMoney from "../utils/formatMoney"
import Spinner from "./Spinner"

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async() => {

        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })

        setListings(listings)
        setLoading(false)
    }

    fetchListings()
    }, [])

    if(loading) {
        return <Spinner/>
    }

    if(listings.length === 0) {
      return <></>
    }

  return listings ? (
<Swiper
modules={[Navigation, Pagination, Scrollbar, A11y]}
slidesPerView={1}
pagination={{ clickable: true }}
navigation
>
{listings.map(({ data, id }) => {
  return (
    <SwiperSlide
      key={id}
      onClick={() => navigate(`/category/${data.type}/${id}`)}
    >
      <div
        style={{
          background: `url(${data.imgUrls[0]}) center no-repeat`,
          backgroundSize: 'cover',
          padding: '150px',
        }}
        className="swipeSlideDiv"
      >
        <p className="swiperSlideText">{data.name}</p>
        <p className="swiperSlidePrice">
          {formatMoney(data.discountedPrice ?? data.regularPrice)}{' '}
          {data.type === 'rent' && '/month'}
        </p>
      </div>
    </SwiperSlide>
  )
})}
</Swiper>
  ) : null
}

export default Slider