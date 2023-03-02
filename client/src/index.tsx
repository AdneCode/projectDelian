import './index.css';

import { SocketContext, socket } from './socket/socket';

import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <SocketContext.Provider value={socket}>
            <App />
        </SocketContext.Provider>
    </Provider>,
    // </React.StrictMode>,
);

reportWebVitals();
