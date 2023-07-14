import { User } from "../../../model/users/userModel";
import { auth } from "../auth";

export function getUserFromFirebase(): User | null {
    try {
        const _user = auth.currentUser;
        if (!_user) throw new Error("User not logged in");
        const user: any = {
            uid: _user.uid
        }

        if (_user.displayName) user.displayName = _user.displayName;
        if (_user.email) user.email = _user.email;
        if (_user.photoURL) user.photoURL = _user.photoURL;

        return user

    } catch (error) {
        console.error(error)
        return null;
    }
}