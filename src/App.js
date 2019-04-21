import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap'
import './App.css';
import AppNavbar from './components/AppNavbar';
import ItemList from './components/ItemList';
import ItemModal from "./components/ItemModal";
import { loadUser } from './actions/authActions';

const App = ({ loadUser }) => {
    useEffect(() => {
        loadUser();
    });
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

App.propTypes = {
    loadUser: PropTypes.func.isRequired
};

export default connect(null, { loadUser })(App);
