import {
    Rooms,
    Data,
    Box,
    BombSlot,
    Player,
    Room,
} from '../globalUtility/types';

const { Server } = require('socket.io');

//Server setup
const express = require('express');
const app = express();

// HTTP Server setup
const http = require('http');
const server = http.createServer(app);

const PORT = 4000;

//Functions
import {
    createRoom,
    emitToRoom,
    findRoomById,
    findRoomBySocketId,
    joinRoom,
    startRoom,
    socketIdIsHost,
    generateNewRooms,
    removePlayerFromRoom,
    toggleSpectator,
    setSettings,
    getPlayer,
    getPlayersFromRoom,
    isRoomPrepared,
    cleanBoxEmit,
    onBoxClick,
} from './roomSystem';

//Socket setup
const io = new Server(server);
let rooms: Rooms = [];

//Timer to keep track in all rooms
// const raiseTimer = () => {
//     try {
//         rooms = onTick(rooms);
//         rooms.map((i: Room) => {
//             const sendData: Data = { room: i };
//             emitToRoom(rooms, i.id, sendData, io);
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
// setInterval(raiseTimer, 500);

io.on('connect', (socket: any) => {
    console.log(`User ${socket.id} connected`);
    socket.on('createRoom', (data: Data) => {
        try {
            const { playerName } = data;
            console.log(`User ${playerName} ${socket.id} created a room`);
            const { newRooms, newRoom } = createRoom(
                rooms,
                playerName,
                socket.id,
            );
            rooms = newRooms;
            const sendData: Data = { room: newRoom };
            socket.emit('sendRoom', sendData);
        } catch (error) {
            console.log(error);
        }
    });

    //Handles a player attempting to join a room
    socket.on('joinRoom', (data: Data) => {
        try {
            const { roomId, playerName } = data;
            console.log(
                `User ${playerName} ${socket.id} joined room ${roomId}`,
            );
            const { newRooms, newRoom } = joinRoom(
                rooms,
                roomId,
                playerName,
                socket.id,
            );
            rooms = newRooms;
            const sendData = { room: cleanBoxEmit(newRoom) };
            emitToRoom(rooms, newRoom.id, sendData, io, 'sendRoom');
            emitToRoom(
                rooms,
                newRoom.id,
                { message: `${playerName} joined the room` },
                io,
                'receiveMessage',
            );
        } catch (error) {
            console.log(error);
        }
    });
    //Starts a room
    socket.on('startRoom', (data: Data) => {
        try {
            const { roomId } = data;
            if (!socketIdIsHost(rooms, roomId, socket.id)) return;
            console.log(`User with ID ${socket.id} started room ${roomId}`);
            const { newRooms, startedRoom } = startRoom(rooms, roomId);
            rooms = newRooms;
            const sendData = {
                room: cleanBoxEmit(findRoomById(rooms, roomId)),
            };
            emitToRoom(rooms, startedRoom.id, sendData, io, 'sendRoom');
            emitToRoom(
                rooms,
                startedRoom.id,
                {
                    message: `Room has started. It's the turn of ${getPlayer(
                        startedRoom.currentTurn,
                        startedRoom.players,
                    )}. Good luck and have fun!`,
                },
                io,
                'receiveMessage',
            );
        } catch (error) {
            console.log(error);
        }
    });
    //Toggle spectator
    socket.on('toggleSpectator', () => {
        try {
            const foundRoom = findRoomBySocketId(rooms, socket.id);
            if (!foundRoom) return;
            rooms = generateNewRooms(
                rooms,
                toggleSpectator(foundRoom, socket.id),
            );
            const sendData = {
                room: cleanBoxEmit(findRoomById(rooms, foundRoom.id)),
            };
            emitToRoom(rooms, foundRoom.id, sendData, io, 'sendRoom');
        } catch (error) {
            console.log(error);
        }
    });
    //Handles an host changing settings
    socket.on('setSettings', (data: Data) => {
        try {
            const { roomId, settings } = data;
            console.log(`Host ${socket.id} changed settings ${roomId}`);
            const { newRooms, newRoom } = setSettings(
                rooms,
                socket.id,
                settings,
                roomId,
            );
            rooms = newRooms;
            const sendData = { room: cleanBoxEmit(newRoom) };
            emitToRoom(rooms, newRoom.id, sendData, io, 'sendRoom');
        } catch (error) {
            console.log(error);
        }
    });
    //fills a slot when client desires
    socket.on('fillSlot', (data: Data) => {
        try {
            const { roomId, boxId, slotId, bombCount } = data;
            const foundRoom = findRoomById(rooms, roomId);
            const player = getPlayer(socket.id, foundRoom.players);
            if (
                !foundRoom ||
                !player ||
                player.bombs - bombCount < 0 ||
                bombCount <= 0 ||
                slotId >= foundRoom.livesPerBox ||
                foundRoom.phase !== 'Preparing'
            )
                return;
            //Feedback?
            const foundBox = foundRoom.boxes.find((i: Box) => {
                return i.id === boxId;
            });
            if (!foundBox) return;
            const newBombSlots = foundBox.bombSlots.map((i: BombSlot) => {
                if (i.id === slotId) {
                    const newPlacedBy = [
                        ...i.placedBy,
                        { bombCount: bombCount, name: player.name },
                    ];
                    return {
                        ...i,
                        bombCount: i.bombCount + bombCount,
                        placedBy: newPlacedBy,
                    };
                }
                return i;
            });
            const newBox = { ...foundBox, bombSlots: newBombSlots };
            const newBoxes = foundRoom.boxes.map((i: Box) => {
                if (i.id === boxId) return newBox;
                return i;
            });
            const newBombCount = player.bombs - bombCount;
            const newPlayers = getPlayersFromRoom(foundRoom).map(
                (i: Player) => {
                    if (i.id === socket.id)
                        return { ...i, bombs: newBombCount };
                    return i;
                },
            );
            const newRoom = {
                ...foundRoom,
                boxes: newBoxes,
                players: newPlayers,
            };
            rooms = generateNewRooms(rooms, newRoom);
            const sendData = { bombCount: newBombCount };
            io.to(socket.id).emit('updateBombCount', sendData);
            if (isRoomPrepared(newRoom)) {
                const preparedRoom = { ...newRoom, phase: 'InGame' };
                rooms = generateNewRooms(rooms, preparedRoom);
                emitToRoom(rooms, newRoom.id, null, io, 'endPrepare');
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('testing', () => {
        console.log('Test was activated');
        io.emit(
            'getRoom',
            rooms.map((i: Room) => {
                return cleanBoxEmit(i);
            }),
        );
    });

    socket.on('hitSlot', (data: Data) => {
        const { boxId, roomId } = data;
        if (!boxId || !roomId) return;
        const newRoom = onBoxClick(rooms, roomId, boxId, socket.id, io);
        if (!newRoom) return;
        rooms = generateNewRooms(rooms, newRoom);
        const sendData = { room: cleanBoxEmit(newRoom) };
        emitToRoom(rooms, newRoom.id, sendData, io, 'sendRoom');
    });

    socket.on('disconnect', (reason: string) => {
        try {
            console.log(`User ${socket.id} disconnected (${reason}).`);
            const playerRemoved = removePlayerFromRoom(rooms, socket.id);
            if (!playerRemoved) {
                console.log(`This user was not active in a single room.`);
                return;
            }
            const { newRooms, newRoom } = playerRemoved;
            console.log(
                `This user has been removed from room with ID ${newRoom.id}.`,
            );
            rooms = newRooms;
            if (!newRoom) {
                console.log(
                    `This user was the last user in it's room, the room was removed.`,
                );
                return;
            }
            const sendData = { room: cleanBoxEmit(newRoom) };
            emitToRoom(rooms, newRoom.id, sendData, io, 'sendRoom');
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
