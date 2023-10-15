import { Collections, User, UserSchema } from "delib-npm";
import { DB } from "../config";
import { doc, setDoc } from "firebase/firestore";

export async function setUserToDB(user:User) {
    try {
        console.log('setUserToDB',user);
        UserSchema.parse(user);
        const userRef = doc(DB, Collections.users, user.uid);
        setDoc(userRef, user, { merge: true }) 
        
    } catch (error) {
        console.error(error)
    }
}