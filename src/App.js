import React, { Fragment } from 'react';

import { Container } from 'reactstrap'

import './App.css';

import AppNavbar from './components/AppNavbar';
import ItemList from './components/ItemList';
import ItemModal from "./components/ItemModal";

const App = () => {
    return (
        <Fragment>
          <AppNavbar/>
          <Container>
            <ItemModal/>
            <ItemList/>
          </Container>
        </Fragment>
    )
};

export default App;
