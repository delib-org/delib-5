import { FC, useState } from 'react'
import RoomParticpantBadge from '../RoomParticpantBadge'
import { useAppSelector } from '../../../../../../functions/hooks/reduxHooks'
import { RoomAskToJoin, RoomDivied, Statement } from 'delib-npm'
import { participantsSelector } from '../../../../../../model/statements/statementsSlice'
import { approveToJoinRoomDB } from '../../../../../../functions/db/rooms/setRooms'


interface Props {
    statement: Statement
}

interface RoomsAdmin {
    [statementId: string]: {
        participants: Array<RoomAskToJoin>,
        roomNumber: number,
        statement: Statement
    }
}


const AdminSeeAllGroups: FC<Props> = ({ statement }) => {

    const participants = useAppSelector(participantsSelector(statement.statementId));
    const [setRooms, setSetRooms] = useState<boolean>(true);
    const [roomsAdmin, setRoomsAdmin] = useState<RoomsAdmin>({} as RoomsAdmin);

    function handleDivideIntoRooms() {
        try {
            const { rooms, topicsParticipants } = divideIntoTopics(participants, 2);
            console.log(topicsParticipants)
            console.log(rooms)
            const roomsAdmin: RoomsAdmin = {};
            rooms.forEach((room) => {
                room.room.forEach((participant: RoomAskToJoin) => {
                    approveToJoinRoomDB(participant.participant.uid, room.statement, room.roomNumber, setRooms);

                    if (!(room.statement.statementId in roomsAdmin)) roomsAdmin[room.statement.statementId] = { participants: [], roomNumber: room.roomNumber, statement: room.statement };
                    roomsAdmin[room.statement.statementId].participants.push(participant)
                })
            })
            setRoomsAdmin(roomsAdmin)
            setSetRooms(state => !state);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div>
            <h1>חלק לחדרים בלחיצה</h1>
            <div className="wrapper">
                <h3>משתתפים</h3>
                <div className="btns">
                    {setRooms ? <button onClick={handleDivideIntoRooms}>חלק/י לחדרים</button> : <button className='btn--cancel' onClick={handleDivideIntoRooms}>ביטול חלוקה</button>}

                </div>
                <div>
                    {participants.map((request) => (
                        <RoomParticpantBadge key={request.participant.uid} participant={request.participant} />
                    ))}
                </div>
                <h3>חלוקה לחדרים</h3>
                {Object.keys(roomsAdmin).map((statementId) => {
                    const room = roomsAdmin[statementId];
                    return (
                        <div key={room.roomNumber}>
                            <h4>חדר {room.roomNumber}</h4>
                            <div>
                                {room.participants.map((participant) => (
                                    <RoomParticpantBadge key={participant.participant.uid} participant={participant.participant} />
                                ))}
                            </div>
                        </div>
                    )
                })}            
            </div>
        </div>
    )
}

export default AdminSeeAllGroups
export interface ParticipantInRoom { uid: string, room: number, roomNumber?: number, topic?: Statement, statementId?: string }

function divideIntoTopics(participants: RoomAskToJoin[], maxPerRoom: number = 7): { rooms: Array<RoomDivied>, topicsParticipants: any } {
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
        // let rooms: Array<ParticipantInRoom> = [];
        for (const topic in topicsParticipants) {

            const patricipantsInTopic = topicsParticipants[topic].participants;
            topicsParticipants[topic].rooms = divideParticipantsIntoRoomsRandomly(patricipantsInTopic, maxPerRoom);


        }

        const rooms = divideIntoGeneralRooms(topicsParticipants);

        return { rooms, topicsParticipants };

    } catch (error) {
        console.error(error);
        return { rooms: [], topicsParticipants: undefined }
    }
}




function divideParticipantsIntoRoomsRandomly(participants: RoomAskToJoin[], maxPerRoom: number): Array<Array<RoomAskToJoin>> {
    try {

        const numberOfRooms = Math.ceil(participants.length / maxPerRoom);

        //randomize participants
        participants.sort(() => Math.random() - 0.5);

        let roomNumber = 0;


        const rooms: Array<Array<RoomAskToJoin>> = [[]]
        participants.forEach((participant: RoomAskToJoin) => {

            if (!rooms[roomNumber]) rooms[roomNumber] = [];
            rooms[roomNumber].push(participant)
            if (roomNumber < numberOfRooms - 1) roomNumber++;
            else roomNumber = 0;
        });




        return rooms;
    } catch (error) {
        console.error(error);
        return [];
    }
}



function divideIntoGeneralRooms(topics: any): Array<RoomDivied> {
    try {

        let roomNumber = 1;
        let rooms: Array<RoomDivied> = [];
        for (const topic in topics) {
            const topicRooms = topics[topic].rooms;
            topicRooms.forEach((room: Array<RoomAskToJoin>) => {

                rooms.push({ room, roomNumber, statement: topics[topic].statement });
                roomNumber++;
            })

        }

        return rooms;
    } catch (error) {
        console.error(error);
        return [];
    }
}
