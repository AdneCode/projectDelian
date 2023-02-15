////Client & server shared types////
//Gamestates
export type GamePhase =
    | 'PreGame'
    | 'Preparing'
    | 'InGame'
    | 'BombFound'
    | 'Result'
    | string;

//Players
type PlayerId = number | null;
export type Player = {
    name: string;
    id: string;
    bombs: number | null;
    playerId: PlayerId;
    isSpectator: boolean;
};
type Players = Player[];

//Game and room related
export type Game = {
    id: string;
    hostId: string;
    players: Players;
    phase: GamePhase;
    bombsPerPlayer: number;
    boxCount: number;
    messages?: string[];
    //boxCount === amount of boxes
    livesPerBox: number;
    boxes: Box[] | null;
    currentTurn: string | null;
    turnTable: string[] | null;
};

export type Settings = {
    bombsPerPlayer: number;
    boxCount: number;
    livesPerBox: number;
};

export type Room = Game;

type BombSlot = {
    id: number;
    bombCount: number;
    placedBy: BombResult[] | [];
};
type BombResult = {
    bombCount: number;
    name: string;
};
export type Box = {
    id: number;
    lives: number;
    bombSlots: BombSlot[] | [];
};

interface ServerToClientEvents {
    error: (error: string) => void;
    receiveIx: (ix: number) => void;
    game: (game: Game) => void;
}

interface ClientToServerEvents {
    register: (gameId: string) => void;
    start: (gameId: string) => void;
    roll: (gameId: string) => void;
    makeBid: (gameId: string) => void;
}

//socketData
export type Data = {
    newRoom?: Room;
    boxId?: number;
    slotId?: number;
    boxCount?: number;
    bombCount?: number;
    playerName?: string;
    message?: string;
    roomId?: string;
    room?: Game;
    settings?: Settings;
};

////End Client & server shared types////

////Client related types////
export type State = {
    connected: boolean;
    error: string | null;
    playerIx: number | null;
    game: Game | null;
};
export type RawState = {
    gameState: {
        connected: boolean;
        error: string | null;
        playerIx: number | null;
        game: Game | null;
    };
};

//Actions
export type Action =
    | { type: 'SET_CONNECTED' }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'IX_RECEIVED'; ix: number }
    | { type: 'GAME_RECEIVED'; game: Game }
    | { type: 'PHASE_CHANGE'; phase: GamePhase }
    | { type: 'ARENA_RECEIVED'; arena: Game | any };

//Props
export type GameProp = {
    game: Game;
    className?: string;
};
////End client related types////

//Server related types////
export type Rooms = Game[] | [];
interface SocketData {
    playerIx: number;
}
////End Server related types////
