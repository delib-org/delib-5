
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";


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
           console.log(result)

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
export function listeToAuth() {

    onAuthStateChanged(auth, (user) => {
        try {

            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
          
           
               console.log('User is signed in', user)
            } else {
                // User is signed out
                console.log('User is signed out')
            }
        } catch (error) {

        }
    });
}

export function logOut() {

    signOut(auth).then(() => {
        // Sign-out successful.
        routeTo('/');
    }).catch((error) => {
        // An error happened.
        console.error(error)
    });

}

