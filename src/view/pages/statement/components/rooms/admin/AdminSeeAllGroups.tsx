import { FC, useEffect } from 'react'
import RoomParticpantBadge from '../RoomParticpantBadge'
import { useAppSelector } from '../../../../../../functions/hooks/reduxHooks'
import { RoomAskToJoin, Statement } from 'delib-npm'
import { participantsSelector } from '../../../../../../model/statements/statementsSlice'

interface Props {
    statement: Statement
}

const AdminSeeAllGroups: FC<Props> = ({ statement }) => {

    const participants = useAppSelector(participantsSelector(statement.statementId))

    function handleDivideIntoRooms() {
        try {
            const {rooms, topicsParticipants} = divideIntoTopics(participants, 2);
            console.log(rooms)
            console.log(topicsParticipants)
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>חלק לחדרים בלחיצה</h1>
            <div className="wrapper">
                <h3>משתתפים</h3>
                <div className="btns">
                    <button onClick={handleDivideIntoRooms}>חלק/י לחדרים</button>
                </div>
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
export interface Room { uid: string, room: number, roomNumber?: number, topic?: Statement, statementId?: string }

function divideIntoTopics(participants: RoomAskToJoin[], maxPerRoom: number = 7): { rooms: Array<Room>, topicsParticipants: any }  {
    try {

        const topicsParticipants: any = {};
        //build topicsParticipantsObject
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

        //divide participents according to topics and rooms
        // let rooms: Array<Room> = [];
        for (const topic in topicsParticipants) {

            const patricipantsInTopic = topicsParticipants[topic].participants;
            topicsParticipants[topic].rooms = divideIntoRoomsRandomly(patricipantsInTopic, maxPerRoom);


        }

        const rooms = divideIntoGeneralRooms(topicsParticipants);

        return { rooms, topicsParticipants };

    } catch (error) {
        console.error(error);
        return { rooms:[], topicsParticipants:undefined}
    }
}




function divideIntoRoomsRandomly(participants: RoomAskToJoin[], maxPerRoom: number): Array<Room> {
    try {
      
        const rooms: Array<Room> = [];
        const numberOfParticipants = participants.length;
        //randomize participants
        participants.sort(() => Math.random() - 0.5);

        let roomNumber = 0;
        let participantIndex = 0;
       

       
        while (numberOfParticipants > rooms.length) {
    

            roomNumber++;
            const room: Room = { uid: participants[participantIndex].participant.uid, room: roomNumber };
         
            rooms.push(room);
            if (roomNumber >= maxPerRoom) {
                roomNumber = 0;
            }
            participantIndex++;
        }

        return rooms;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function divideIntoGeneralRooms(topics: any): Array<Room> {
    try {
        let roomNumber = 1;
        const rooms: Array<Room> = [];
        for (const topic in topics) {
            const topicRooms = topics[topic].rooms;
     
            topicRooms.forEach((participant: Room) => {
                rooms.push({ ...participant, topic: topics[topic].statement, roomNumber })

            })
            roomNumber++;
        }
        return rooms;
    } catch (error) {
        console.error(error);
        return [];
    }
}