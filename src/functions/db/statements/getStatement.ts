import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Collections } from "delib-npm";
import { Statement, StatementSubscription, StatementSubscriptionSchema, StatementType } from "../../../model/statements/statementModel";
import { DB } from "../config";
import { auth } from "../auth";



export function listenToUserStatements() {
 
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

export function listenToStatementSubscription(statementId: string, updateStore: Function) {
    try {
        if(!statementId) throw new Error("Statement id is undefined");
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        const statementsSubscribeRef = doc(DB, Collections.statementsSubscribe, `${user.uid}--${statementId}`);

        
        return onSnapshot(statementsSubscribeRef, (statementSubscriptionDB) => {
            const statementSubscription = statementSubscriptionDB.data() as StatementSubscription;
            StatementSubscriptionSchema.parse(statementSubscription);

            updateStore(statementSubscription);
        });
    } catch (error) {
        console.error(error);
        return () => { };
    }
}

export function listenStatmentsSubsciptions(cb: Function): Function {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        
        const statementsSubscribeRef = collection(DB, Collections.statementsSubscribe);
        const q = query(statementsSubscribeRef, where("statement.type", "==", StatementType.GROUP), where("userId", "==", user.uid), orderBy("lastUpdate", "desc"));
        // const querySnapshot = await getDocs(q);
        // const statementsSubscriptions: StatementSubscription[] = [];
        return onSnapshot(q, (subsDB) => {
            subsDB.forEach((subDB) => {

                const statementSubscription = subDB.data() as any;
                statementSubscription.lastUpdate = statementSubscription.lastUpdate;
                cb(statementSubscription);


            });
        })

    } catch (error) {
        console.error(error);
        return () => { };
    }
}

export async function getIsSubscribed(statementId: string | undefined): Promise<boolean> {
    try {
        if (!statementId) throw new Error("Statement id is undefined");
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const subscriptionRef = doc(DB, Collections.statementsSubscribe, `${user.uid}--${statementId}`);
        const subscriptionDB = await getDoc(subscriptionRef);
     
        if (!subscriptionDB.exists()) return false;
        return true;

    } catch (error) {
        console.error(error);
        return false;
    }

}


export function listenToStatement(statementId: string, updateStore: Function) {
    try {
        const statementRef = doc(DB, Collections.statements, statementId);
        return onSnapshot(statementRef, (statementDB) => {
            const statement = statementDB.data() as Statement;

            updateStore(statement);
        });
    } catch (error) {
        console.error(error);
        return () => { };
    }
}

export async function getStatementFromDB(statementId: string): Promise<Statement | undefined> {
    try {
        const statementRef = doc(DB, Collections.statements, statementId);
        const statementDB = await getDoc(statementRef);
        return statementDB.data() as Statement | undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export function listenToStatementsOfStatment(statementId: string | undefined, updateStore: Function) {
    try {
        if (!statementId) throw new Error("Statement id is undefined");
        const statementsRef = collection(DB, Collections.statements);
        const q = query(statementsRef, where("parentId", "==", statementId), orderBy("createdAt", "desc"), limit(20));
        return onSnapshot(q, (statementsDB) => {

            statementsDB.forEach((statementDB) => {
                const statement = statementDB.data() as Statement;

                updateStore(statement);
            });
        });
    } catch (error) {
        console.error(error);
        return () => { };
    }
}