import { FC } from 'react'
import RoomParticpantBadge from '../RoomParticpantBadge'
import { useAppSelector } from '../../../../../../functions/hooks/reduxHooks'
import { RoomAskToJoin, Statement } from 'delib-npm'
import { participantsSelector } from '../../../../../../model/statements/statementsSlice'

interface Props {
    statement: Statement
}

const AdminSeeAllGroups: FC<Props> = ({ statement }) => {

    const participants = useAppSelector(participantsSelector(statement.statementId))
    console.log(participants)
    console.log(divideItoTopics(participants))
    return (
        <div>
            <h1>חלק לחדרים בלחיצה</h1>
            <div className="wrapper">
                <h3>משתתפים</h3>
                <div>
                    {participants.map((request) => (
                        <RoomParticpantBadge key={request.participant.uid} participant={request.participant} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminSeeAllGroups

function divideItoTopics(participants: RoomAskToJoin[]) {
    try {

        const topicsParticipants: any = {};
        participants.forEach((participant) => {
            try {
                if (!(participant.statementId in topicsParticipants)) {
                    topicsParticipants[participant.statementId] = { statementId: participant.statementId, statement: participant.statement, participants: [participant] };
                } else {
                    topicsParticipants[participant.statementId].participants.push(participant);
                }

            } catch (error) {
                console.error(error);
                return undefined;
            }
        })

        for (const key in topicsParticipants) {

            const patricipantsInTopic = topicsParticipants[key].participants;
            const rooms = divideIntoRooms(patricipantsInTopic, 7);
            topicsParticipants[key].rooms = rooms;

        }
        return topicsParticipants;

    } catch (error) {
        console.error(error);
        return undefined
    }
}

function divideIntoRooms(participants: RoomAskToJoin[], maxPerRoom: number) {
    try {
        const rooms = [[]];
       
        let count = 0;
        const _participants = [...participants].sort(() => Math.random() - 0.5);
        debugger;
        for (let index = 0; index < _participants.length; index++) {
            const participant = _participants[index];
            if (count < maxPerRoom) {
                rooms[0].push(participant);
                count++;
            } else {
                rooms.push([]);
                room = [];
                count = 0;
            }
        }
        return rooms;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}