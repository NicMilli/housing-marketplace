import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../firebase.config"
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            provider.setCustomParameters({
                prompt: 'select_account',
              });
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            const existingName = docSnap._document.data.value.mapValue.fields.name.stringValue

            // If user doesnt exist, create user
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
             } else if(existingName !== user.displayName) {
                 if(window.confirm('This email already exists, would you like update your display name to that of the google account?')){
                     updateDoc(docRef, { name: user.displayName })
                    }
             }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with google')
        }
    }

  return (
    <div className="socialLogin">
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt='google'/>
        </button>
    </div>
  )
}

export default OAuth
