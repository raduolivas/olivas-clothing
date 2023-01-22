import { takeLatest, put, all, call } from 'redux-saga/effects';

import { signInSuccess, signInFailure, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed } from './user.action';

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, createAuthUserWithEmailAndPassword, signOutUser } from '../../utils/firebase/firebase.utils';
import USER_ACTION_TYPES from './user.types';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function* getSnapshotFromUserAuth(userAuth, additionDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionDetails);
        yield put(signInSuccess({ id: userSnapshot, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail( {payload: { email, password } } ) {
    try {
        const { user } = yield  call(signInWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user)

    } catch (error) {
        yield put(signInFailure(error));
        
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signUp({payload: {email, password, dispplayame}}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { dispplayame }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInAfterSignUp({ payload: {user, additionDetails}}) {
    yield call(getSnapshotFromUserAuth, user, additionDetails);

}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSingUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, signInAfterSignUp)
}

export function* onSignOutSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSingUpStart),
        call(onSignUpSuccess),
        call(onSignOutSuccess),
    ])
}