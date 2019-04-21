import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
};

render(
    <AppContainer/>,
    document.getElementById("app")
);
