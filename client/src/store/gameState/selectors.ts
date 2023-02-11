import { RawState } from '../../../../globalUtility/types';
export const selectState = () => (state: RawState) => state;
export const selectGame = () => (state: RawState) => state.gameState;
