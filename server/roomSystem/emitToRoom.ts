import { Data, Room, Rooms } from '../../globalUtility/types';
const emitToRoom = (
    rooms: Rooms,
    roomId: string,
    data: Data | null,
    io,
    endpoint: string,
) => {
    rooms.map((i: Room) => {
        if (i.id === roomId) {
            i.players.map((i) => {
                if (data === null) {
                    io.to(i.id).emit(endpoint);
                    return;
                }
                io.to(i.id).emit(endpoint, data);
            });
        }
        return;
    });
};

export { emitToRoom };
