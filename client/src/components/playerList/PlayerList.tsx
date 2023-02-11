import React from 'react';
import { Player as PlayerType } from '../../../../types/types';
import { Player } from './Player';
export function PlayerList(p: { players: PlayerType[]; hostId: string }) {
    const { players, hostId } = p;
    return (
        <>
            <div>
                {players.map((i: PlayerType) => {
                    return i.id === hostId ? (
                        <div key={i.id}>
                            <Player player={i} />
                            'HOST'
                        </div>
                    ) : (
                        <div key={i.id}>
                            <Player player={i} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
