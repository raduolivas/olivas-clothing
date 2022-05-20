import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    auth
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    // useEffect(() => {
    //     async function getGoogleRedirectResult() {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //         console.log(response);
    //     }
        
    //     getGoogleRedirectResult();
       
    // }, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
        console.log(user);
    }

    const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
        console.log(user);
    }
    

    return (
        <div>
            <h1> Signin page</h1>
            <div><button onClick={logGoogleUser}>Sign Ing with Google Popup</button></div>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default SignIn;