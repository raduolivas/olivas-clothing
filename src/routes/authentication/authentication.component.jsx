import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    auth
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';  

const Authentication = () => {

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

    

    const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
        console.log(user);
    }
    

    return (
        <div className='authetication-container'>
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Authentication;