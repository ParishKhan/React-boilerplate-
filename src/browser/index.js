import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import App from '../app/App';

const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../app/App', () => { render(App) })
}