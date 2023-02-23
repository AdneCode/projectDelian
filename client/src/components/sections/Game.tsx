import { GameProp } from '../../../../globalUtility/types';
import { Lobby, InGame, Preparing, Messages } from '.';

export function Game(p: GameProp) {
    const { game } = p;
    console.log(game.phase);
    if (game.phase === 'PreGame') {
        return (
            <div>
                <Lobby game={game} />
            </div>
        );
    }
    if (game.phase === 'InGame') {
        return (
            <div>
                <InGame game={game} />
            </div>
        );
    }
    if (game.phase === 'Preparing') {
        return (
            <div>
                <Preparing game={game} />
            </div>
        );
    }

    return <></>;
}
