import { store } from "../../../model/store";
import { User } from "delib-npm";
import { auth } from "../auth";

export function getUserFromFirebase(): User | null {
    try {
        console.log(store.getState())
        const _user = auth.currentUser;
        if (!_user) throw new Error("User not logged in");

        const userStore = store.getState().user;
        if(!userStore) throw new Error("User not logged in");

        // const user: any = {
        //     uid: _user.uid
        // }

        // if (_user.displayName) user.displayName = _user.displayName;
        // if (_user.email) user.email = _user.email;
        // if (_user.photoURL) user.photoURL = _user.photoURL;

        return userStore.user;

    } catch (error) {
        console.error(error)
        return null;
    }
}