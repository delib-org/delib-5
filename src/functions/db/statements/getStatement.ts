import { collection, getDocs, query, where } from "firebase/firestore";
import { Collections } from "../collections";
import { StatementSubscription } from "../../../model/statementModel";
import { DB } from "../config";
import { auth } from "../auth";

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

export async function getStatmentsSubsciptions(): Promise<StatementSubscription[]> {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        const statementsSubscribeRef = collection(DB, Collections.statementsSubscribe);
        const q = query(statementsSubscribeRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const statementsSubscriptions: StatementSubscription[] = [];
        querySnapshot.forEach((doc) => { 
            statementsSubscriptions.push(doc.data() as StatementSubscription);
        });
        return statementsSubscriptions;
    } catch (error) {
        console.error(error);
        return [];
    }
}