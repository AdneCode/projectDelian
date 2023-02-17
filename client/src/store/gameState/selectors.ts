import { RawState } from '../../../../globalUtility/types';
export const selectState = () => (state: RawState) => state;
export const selectGame = () => (state: RawState) => state.gameState;
export const selectMessages = () => (state: RawState) => {
    if (!state.gameState.messages) return null;
    return state.gameState.messages;
};
