import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    doc,
    addDoc,
    getDoc,
    setDoc
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


export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
) => {
    
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const creatAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                creatAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

}

export const createAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password) return;
    signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}