import { useState, useContext, useEffect } from 'react';
import {
    GameProp,
    Data,
    Settings as SettingsType,
} from '../../../../globalUtility/types';
import { SocketContext } from '../../socket/socket';

const globalSettings = {
    minBombsPerPlayer: 1,
    maxBombsPerPlayer: 100,
    minBoxCount: 2,
    maxBoxCount: 25,
    minBoxLives: 1,
    maxBoxLives: 100,
};

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
                <div className="py-4">
                    <h1>Bombs per player {`${game.bombsPerPlayer}`}</h1>
                </div>
                <div className="py-4">
                    <h1>Amount of boxes {`${game.boxCount}`}</h1>
                </div>
                <div className="py-4">
                    <h1>Lives per box {`${game.livesPerBox}`}</h1>
                </div>
            </>
        );
    }
    return (
        <div className="settingsWindow py-4" id="settingsWindowId">
            <div className="settingsWindowField py-4">
                <label className="settingsText">
                    Bombs per player ({globalSettings.minBombsPerPlayer}-
                    {globalSettings.maxBombsPerPlayer})
                </label>
                <input
                    type="number"
                    className="text-black mx-4"
                    id="bombCountInputId"
                    name="age"
                    min={globalSettings.minBombsPerPlayer}
                    max={globalSettings.maxBombsPerPlayer}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            bombsPerPlayer: +e.target.value,
                        })
                    }
                    value={settings.bombsPerPlayer}
                />
            </div>
            <div className="py-4">
                <label className="settingsText">
                    Amount of boxes ({globalSettings.minBoxCount}-
                    {globalSettings.maxBoxCount})
                </label>
                <input
                    type="number"
                    className="text-black mx-4"
                    id="boxCountInputId"
                    name="age"
                    min={globalSettings.minBoxCount}
                    max={globalSettings.maxBoxCount}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            boxCount: +e.target.value,
                        })
                    }
                    value={settings.boxCount}
                />
            </div>
            <div className="settingsWindowField py-4">
                <label className="settingsText">
                    Lives per box({globalSettings.minBoxLives}-
                    {globalSettings.maxBoxLives})
                </label>
                <input
                    type="number"
                    className="text-black mx-4"
                    id="boxLivesInputId"
                    name="age"
                    min={globalSettings.minBoxLives}
                    max={globalSettings.maxBoxLives}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            livesPerBox: +e.target.value,
                        })
                    }
                    value={settings.livesPerBox}
                />
            </div>
            <button
                onClick={() => emitSettings(settings)}
                className="border py-4 px-4 border-slate-50 bg-slate-600 hover:bg-slate-500"
            >
                Change settings
            </button>
        </div>
    );
};
