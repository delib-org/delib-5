
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { app } from "./config";
import { parseUserFromFirebase, User } from "delib-npm";
import { setUserToDB } from "./users/setUsersDB";
import { getUserFontSizeFromDB } from "./users/getUserDB";


const provider = new GoogleAuthProvider();



export const auth = getAuth(app);

export function googleLogin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;

            // The signed-in user info.
            // const user = result.user;
            console.log('user signed in with google ', result.user)

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;

            // The AuthCredential type that was used.
            console.error(error)
            // const credential = GoogleAuthProvider.credentialFromError(error);

            // ...
        });
}
export function listenToAuth(cb: Function, cbFontSize: Function) {

    onAuthStateChanged(auth, async (user) => {
        try {

            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const _user: User | undefined = parseUserFromFirebase(user)
                console.log('User is signed in')
                if (!_user) throw new Error('user is undefined')
                cb(_user)

                const fontSize = await getUserFontSizeFromDB() || 14;

                document.documentElement.style.fontSize = fontSize + 'px';
                document.body.style.fontSize = fontSize + 'px';
                cbFontSize(fontSize);

                setUserToDB(_user);

            } else {
                // User is signed out
                console.log('User is signed out')
                cb(null)
            }
        } catch (error) {

        }
    });
}

export function logOut() {

    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.')
    }).catch((error) => {
        // An error happened.
        console.error(error)
    });

}

//fireabse anounymous login
// import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
// const auth = getAuth();
export function signAnonymously() {
    signInAnonymously(auth)
        .then((user) => {
            console.log(user)
            console.info('user signed in anounymously')
        })
        .catch((error) => {
          console.error(error)
        });
}
