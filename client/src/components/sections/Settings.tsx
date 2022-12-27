import { useState, useContext, useEffect } from 'react';
import { GameProp, Data } from '../../../../types/types';
import { SocketContext } from '../../socket/socket';

export const Settings = (p: GameProp) => {
    const { game } = p;
    const initialSettings = {
        bombsPerPlayer: game.bombsPerPlayer,
        boxCount: game.boxCount,
        livesPerBox: game.livesPerBox,
    };

    const socket = useContext(SocketContext);
    const emitSettings = (type: string, setting: number) => {
        const data = { type, setting, roomId: game.id };
        socket.emit('setSettings', data);
    };
    useEffect(() => {
        socket.on('sendSettings', (data: Data) => {
            const { settings } = data;
            setSettings(settings);
        });
        return () => {
            socket.off('sendSettings');
        };
    }, []);
    const [settings, setSettings] = useState<any>(initialSettings);
    if (!settings) return <></>;
    if (game.hostId !== socket.id) {
        return (
            <>
                <h1>Size {`${settings.size}`}</h1>
                <h1>Max rounds {`${settings.maxRounds}`}</h1>
                <h1>Timer {`${settings.timelineTime}`}</h1>
                <h1>Timelines {`${settings.timelines}`}</h1>
            </>
        );
    }
    return (
        <div className="settingsWindow" id="settingsWindowId">
            <div className="settingsWindowField">
                <label className="settingsText">Players (1-25)</label>
                <input
                    type="number"
                    className="inputBarSettings"
                    id="playerCountInputId"
                    name="age"
                    min="1"
                    max="25"
                    value="{}"
                />
            </div>
            <div className="settingsWindowField">
                <label className="settingsText">
                    Bombs per player (1-1000)
                </label>
                <input
                    type="number"
                    className="inputBarSettings"
                    id="bombCountInputId"
                    name="age"
                    min="1"
                    max="1000"
                    value="3"
                />
            </div>
            <div className="settingsWindowField">
                <label className="settingsText">Amount of boxes (2-9)</label>
                <input
                    type="number"
                    className="inputBarSettings"
                    id="boxCountInputId"
                    name="age"
                    min="1"
                    max="25"
                    value="2"
                />
            </div>
            <div className="settingsWindowField">
                <label className="settingsText">Lives per box(1-1000)</label>
                <input
                    type="number"
                    className="inputBarSettings"
                    id="boxLivesInputId"
                    name="age"
                    min="1"
                    max="1000"
                    value="10"
                />
            </div>
            <div className="settingsWindowField">
                <label className="fullscreenText">Fullscreen</label>
                <input
                    type="checkbox"
                    className="checkbox"
                    id="fullscreenCheckBoxId"
                    name="fullscreen"
                />
            </div>
            <input
                type="button"
                className="bigButton"
                id="backButtonId"
                value="Back"
            />
        </div>
    );
};
