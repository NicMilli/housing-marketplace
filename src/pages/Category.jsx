import { collection, getDocs, query,
     where, orderBy, limit, startAfter } 
     from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ListingItem from "../components/ListingItem"
import Spinner from "../components/Spinner"
import { db } from "../firebase.config"

function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async() => {
            try {
                //Get reference
                const listingsRef = collection(db, 'listings')

                //Create a query
                const q = query(listingsRef, 
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'), 
                    limit(10))

                //Execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                let listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('could not fetch listings')
            }
        }

        fetchListings()
    }, [params.categoryName])

    //Pagination/load more
    const onFetchMoreListings = async() => {
        try {
            //Get reference
            const listingsRef = collection(db, 'listings')

            //Create a query
            const q = query(listingsRef, 
                where('type', '==', params.categoryName), 
                orderBy('timestamp', 'desc'), 
                limit(10),
                startAfter(lastFetchedListing)
                )

            //Execute query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchedListing(lastVisible)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings((prevState) => [...prevState, ...listings] )
            setLoading(false)
        } catch (error) {
            toast.error('could not fetch listings')
        }
    }


  return (
    <div className="category">
        <header>
            <p className="pageHeader">
                {params.categoryName === 'rent' 
                ? 'Places for rent' 
                : 'Places for sale'}
            </p>
        </header>

        {loading ? (<Spinner />) 
        : listings && listings.length > 0 
        ? (
        <>
            <main>
                <ul className="categoryListings">
                    {listings.map((listing) => ( 
                        <ListingItem listing={listing.data} 
                        id={listing.id} key={listing.id}/>
                    ))}
                </ul>
            </main>

            <br/>
            <br/>
            {lastFetchedListing && (
                <p className='loadMore' onClick={onFetchMoreListings}>Load More</p>
            )}
        </>
        ) 
        : (<p>No listings for {params.categoryName}</p>)}
    </div>
  )
}

export default Category