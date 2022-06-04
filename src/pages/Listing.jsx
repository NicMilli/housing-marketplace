import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import {getAuth} from 'firebase/auth'
import { Marker, MapContainer, Popup, TileLayer } from "react-leaflet"
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import formatMoney from "../utils/formatMoney"
//SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async() => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if(loading) {
        return <Spinner/>
    }

  return (
    <main>
         
 <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    slidesPerView={1}
    pagination={{ clickable: true }}
    navigation
    style={{ height: '500px',
    marginLeft: '2%', marginRight: '2%' }}
>
    {listing.imgUrls.map((url, index) => {
       return (
            <SwiperSlide key={index}>
                <div
                    className='swiperSlideDiv'
                    style={{
                        background: `url(${listing.imgUrls[index]}) center no-repeat`,
                        backgroundSize: 'cover',
                    }}
                ></div>
            </SwiperSlide>
        );
    })}
</Swiper>

<div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

        <div className="listingDetails">
            <p className="listingName">{listing.name} - $
            {listing.offer 
            ? listing.discountedPrice.toString().replace(/\b(?:0*(0\.\d+)|0+)/g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
            : listing.regularPrice.toString().replace(/\b(?:0*(0\.\d+)|0+)/g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <p className="listingLocation">{listing.Location}</p>
            <p className="listingType">
                For {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer ? (<p className='discountPrice'>
                {formatMoney(listing.regularPrice - listing.discountedPrice)} discount!
            </p>
            ) : null}

            <ul className="listingDetailsList">
                <li>
                    {listing.bedrooms > 1 
                    ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
                </li><li>
                    {listing.bathrooms > 1 
                    ? `${listing.bathrooms} Bedrooms`
                : '1 Bathroom'}
                </li>
                <li>{listing.parking 
                ? 'Parking Spot Available!' 
                : 'No Parking Spot Available'}
                </li>
                <li>{listing.furnished 
                ? 'Furnished!' 
                : 'Unfurnished'}
                </li>
                </ul>

                <p className="listingLocationTitle">Location</p>

                <div className="leafletContainer">
                    <MapContainer style={{height: '100%', width: '100%'}}
                    center={[listing.geolocation.lat, listing.geolocation.lng]}
                    zoom={13}
                    scrollWheelZoom={false}>
                       <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                       />

                       <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                           <Popup>{listing.location}</Popup>
                       </Marker>
                    </MapContainer >
                </div>
            
            {auth.currentUser?.uid !== listing.userRef ? (<Link to=
            {`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'>Contact Landlord!</Link>) : null}
        </div>
    </main>
  )
}

export default Listing