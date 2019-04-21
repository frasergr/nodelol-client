import React, { useEffect } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/authActions";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'

const AppContainer = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    });
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
