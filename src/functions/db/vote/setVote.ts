import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { Statement } from "delib-npm";
import { Collections } from "delib-npm";
import { getUserFromFirebase } from "../users/usersGeneral";
import { DB } from "../config";
import { Vote, getVoteId, voteSchema } from "../../../model/vote/voteModel";

export async function setVote(option: Statement, setVoteCB:Function) {
    try {
        //vote refernce
        const user = getUserFromFirebase();
        if (!user) throw new Error("User not logged in");
        const voteId = getVoteId(user.uid, option.parentId);

        const voteRef = doc(DB, Collections.votes, voteId);


        // toggle vote
        const vote: Vote = { voteId, statementId: option.statementId, parentId: option.parentId, userId: user.uid, lastUpdate: Timestamp.now().toMillis(), createdAt: Timestamp.now().toMillis() };
        
        const voteDoc = await getDoc(voteRef);
        if (voteDoc.exists() && voteDoc.data()?.statementId === option.statementId) {
            vote.statementId = "none";
        }
      

        voteSchema.parse(vote);
        setVoteCB(option)
        
        await setDoc(voteRef, vote, { merge: true });


    } catch (error) {
        console.error(error);
    }
}