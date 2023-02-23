import './App.css';
import { NoUserSection, Game } from './components';
import { useSelector } from 'react-redux';
import { selectState } from './store';
import { Messages } from './components';

function App() {
    const rawState = useSelector(selectState());
    const { game } = rawState.gameState;
    if (!game) {
        return (
            <div className="App text-white">
                <NoUserSection />
            </div>
        );
    }
    return (
        <div className="App text-white">
            <Game game={game} />
        </div>
    );
}

export default App;
