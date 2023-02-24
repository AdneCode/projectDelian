import { Room, Box, BombSlot } from '../../globalUtility/types';

export const roomHasNoBombs = (room: Room): boolean => {
    const { boxes } = room;
    let bombsFound = false;
    boxes.map((box: Box) => {
        const activeBombSlots = box.bombSlots.filter(
            (bombSlot: BombSlot, index) => {
                if (index < box.lives) return true;
                return false;
            },
        );
        activeBombSlots.map((bombSlot: BombSlot) => {
            if (bombSlot.bombCount > 0) {
                bombsFound = true;
            }
        });
    });
    return !bombsFound;
};
