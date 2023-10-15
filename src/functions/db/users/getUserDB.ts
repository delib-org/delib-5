import { doc, getDoc } from "firebase/firestore";
import { auth } from "../auth";
import { Collections } from "delib-npm";
import { DB } from "../config";

// get user font size and update document and html with the size in the DB
export async function getUserFontSizeFromDB() {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('user is not logged in');

        const userRef = doc(DB, Collections.users, user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) throw new Error('user does not exist');

        const fontSize: number | undefined = userDoc.data().fontSize as number;
        if (!fontSize) return 14;

        if (typeof fontSize !== 'number') throw new Error('fontSize is not a number');
        if (fontSize < 0) throw new Error('fontSize must be positive');
        
        return fontSize;
    } catch (error) {
        console.error(error);
        return 14;
    }
}