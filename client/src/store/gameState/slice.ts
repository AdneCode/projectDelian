import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Action } from '../../../../globalUtility/types';

const initialState: State = {
    connected: false,
    error: null,
    playerIx: null,
    game: null,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        gameReducer: (state: State, action: PayloadAction<Action>) => {
            const { type } = action.payload;
            switch (type) {
                case 'SET_CONNECTED':
                    state.connected = true;
                    break;
                case 'SET_ERROR':
                    state.error = action.payload.error;
                    break;
                case 'GAME_RECEIVED':
                    state.game = action.payload.game;
                    break;
                case 'PHASE_CHANGE':
                    if (!state.game) break;
                    state.game.phase = action.payload.phase;
                    break;
                case 'ARENA_RECEIVED':
                    if (!state.game) break;
                    break;
                case 'IX_RECEIVED':
                    state.playerIx = action.payload.ix;
                    break;
                default:
                    return;
            }
        },
    },
});

export const { gameReducer } = gameSlice.actions;

export default gameSlice.reducer;
