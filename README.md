# This description will be update soon- for now please feel free to view the published app [here](https://housing-marketplace-one.vercel.app/)

Sign in to list a property and access the member profile area. <br/>
The front end is build using React and the database is hosted on google Firebase!



# Skills Used:
  - Array and object mapping/sorting 
  - Styled error and success messages  
  - Asynchronous functions
  - Easily updateable content using Firebase as a CMS
  - CSS styling

# Technologies Used:
* React
* React-router-dom
* React-toastify
* dotenv
* Firebase
* CSS3
* Git
* GitHub
* JavaScript
* Google Recaptcha
* React-Icons
* Axios
* FormSpark

# Approach:
I wanted to build a react app within 1 week in order to test and showcase my skills. I also wanted this app to be a portfolio website that can be used in job applications and thus could show many of my new skills; as well as convey my personality. Lastly I believe that websites should be easy to edit, even for those with no technical know-how. Most react apps and courses that I have come across have been hard coded, meaning that any minor changes to the content would likely require an engineer to rewrite the code and re-deploy the website. I wanted to make my website easily customizable.

I knew that creating the elements and content of the website would be easy as most courses cover these aspects thoroughly, the parts that I had less experience with were the CSS styling (React courses usually provide the CSS files pre-configured) and integrating the data from a database into my elements. The CSS would just be a case of developing a plan for a desired user interface look and researching ways to achieve that interface. This would be easy to do using open source frameworks such as Tailwind or Bulma but I decided it would be beneficial to write my own CSS to improve my understanding and display my personality in the design This left me with deciding where to store my CMS data.

I chose Firebase to host my CMS as it is newer and faster than AWS and wouldn't require me to run my own backend server like using the MERN stack. I also had a good grasp on how to use it after my [Housing Marketplace App](https://github.com/NicMilli/housing-marketplace) and the google analytics would give me an oportunity to learn another service as well as improve this site in future.

# Successes and areas for improvement:
* Success:
  * Created an app that successfully shows off my skills as well as my personality.
  * Took the app from design to deployment in under 1 week.
  * Learn't many new layout and design tricks using CSS3.
  * Easily customizable content using Firebase as a backend service.

* Areas for future improvements:
  * Did not pre-designed CSS viewport breakpoints meaning that time was wasted tweaking the breakpoints for each CSS class.
  * Did not define enough globally used CSS classes, again wasting time customizing each element.
  * The Firestore collection for the project information is structured as an array, my brain works better this way but in hind sight this may make the CMS more difficult to use for those who are not technical minded.
 
# Code Highlights:

Below, the 'TechStack' element references the information from Firebase to display icons for all the languages and technologies that I have used and learnt. As I learn new skills I simply need to update my firebase collection and the website content will be updated to reflect this. This means that anyone can update the content on my website without any knowledge of React.

```javascript TechStack Element
  const {Languages, Frameworks} = icons

  useEffect(() => {
      const fetchIcons = async() => {
          const iconRef = doc(db, 'Portfolio', 'StackIcons')
          const iconSnap = await getDoc(iconRef)
    
          if(iconSnap.exists()) {
              setIcons(iconSnap.data())
              setFetching(false)
          }
          
      }
    
      fetchIcons()
    }, [])

    if(fetching) {
        return <><Loading/></>
      }

  return (
    <>
        Languages:
        <br />
        {Object.keys(Languages).sort((a, b) => {
            if (Languages[a].rank < Languages[b].rank) {
            return -1;
            } else if (Languages[b].rank < Languages[a].rank) {
            return 1;
            } else {
            return a.localeCompare(b);
            }
        }).map((key) => {
            return(
                <img key={key} src={Languages[key].src} 
                alt={key} className={Languages[key].cName}/>
                )
        })}
        <br />
       
        Frameworks and Technologies:
        <br />
        {Object.keys(Frameworks).sort((a, b) => {
            if (Frameworks[a].rank < Frameworks[b].rank) {
            return -1;
            } else if (Frameworks[b].rank < Frameworks[a].rank) {
            return 1;
            } else {
            return a.localeCompare(b);
            }
        }).map((key) => {
            return(
                <img key={key} src={Frameworks[key].src} 
                alt={key} className={Frameworks[key].cName}/>
            )
        })}
    </>
  )
}
```

Using knowledge from recent courses I was able to create a much more readable app, my app.js file calls on separate elements. This is common practice, but a big improvement from my first attempts at react apps, such as my [Shared Wallet App](https://github.com/NicMilli/SharedWallet) where creating different files for elements and components was not taught.

```javascript App.js
 function App() {
  return (
    <>
      <Router>
        <div >
          <Navbar className='front'/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/resume' element={<Resume />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/wall' element={<Wall />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/> 
    </>
  );
}
```

# What I still want to add:
* I would like to add a 'Wall' page where visitors can register using Google Authentication and leave a message on my wall. This is just a fun way to add color as well as interaction.
* Once I have added a backend for my [Feedback App](https://github.com/NicMilli/feedback-app) I would like to add it to my site as a way to get feedback and hopefully both improve the site and learn more of my shortcomings.
* I would like to learn about accessibility and find ways to improve usability of the site for those with disabilities.
