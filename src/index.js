import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'

const AppContainer = () => {
    return (
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    )
};

render(
    <AppContainer/>,
    document.getElementById("app")
);
