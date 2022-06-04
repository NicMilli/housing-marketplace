import { Link } from "react-router-dom"
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import Slider from "../components/Slider"

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        <Slider />

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img 
            src={rentCategoryImage} 
            alt="Rent" 
            className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img 
            src={sellCategoryImage} 
            alt="Sell" 
            className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
