import { collection } from "firebase/firestore";
import { Collections } from "../collections";

export function listenToUserStatements() {
    const statementsRef = collection(DB, Collections.statements);
    // const query = query(statementsRef, where("userId", "==", userId));
    // const unsubscribe = onSnapshot(query, (querySnapshot) => {
    //     const statements = [];
    //     querySnapshot.forEach((doc) => {
    //         statements.push(doc.data());
    //     });
    //     callback(statements);
    // });
    // return unsubscribe;
}