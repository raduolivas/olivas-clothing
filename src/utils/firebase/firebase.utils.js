import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAM_9Q34_m4KX2DGPo9vp0QrzUuGRtbt-I",
    authDomain: "olivas-clouthing-db.firebaseapp.com",
    projectId: "olivas-clouthing-db",
    storageBucket: "olivas-clouthing-db.appspot.com",
    messagingSenderId: "1075432599480",
    appId: "1:1075432599480:web:08edd479158f615366694d"
  };

  
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const signInWithGooglePopup = async () => {
    try{
        const res = await signInWithPopup(auth, provider)
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.empty) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authPorvider: 'google',
                email: user.email
            });
        } 
    } catch (err){
        console.log(err);
        alert(err.message);
    }
    
};

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const createUserDocumentFromAuth = async (userAuth) => {


}