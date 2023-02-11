import { useState, useContext, useEffect } from 'react';
import {
    GameProp,
    Data,
    Settings as SettingsType,
} from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';

export const Settings = (p: GameProp) => {
    const { game } = p;
    const initialSettings: SettingsType = {
        bombsPerPlayer: game.bombsPerPlayer,
        boxCount: game.boxCount,
        livesPerBox: game.livesPerBox,
    };

    const socket = useContext(SocketContext);
    const [settings, setSettings] = useState<SettingsType>(initialSettings);
    const emitSettings = (settings: SettingsType) => {
        const data = { settings, roomId: game.id };
        socket.emit('setSettings', data);
    };
    useEffect(() => {
        socket.on('sendSettings', (data: Data) => {
            const { settings } = data;
            if (!settings) return;
            setSettings(settings);
        });
        return () => {
            socket.off('sendSettings');
        };
    }, []);

    if (!settings) return <></>;
    if (game.hostId !== socket.id) {
        return (
            <>
                <h1>Bombs per player {`${settings.bombsPerPlayer}`}</h1>
                <h1>Amount of boxes {`${settings.boxCount}`}</h1>
                <h1>Lives per box {`${settings.livesPerBox}`}</h1>
            </>
        );
    }
    return (
        <div className="settingsWindow" id="settingsWindowId">
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
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            bombsPerPlayer: +e.target.value,
                        })
                    }
                    value={settings.bombsPerPlayer}
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
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            boxCount: +e.target.value,
                        })
                    }
                    value={settings.boxCount}
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
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            livesPerBox: +e.target.value,
                        })
                    }
                    value={settings.livesPerBox}
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
