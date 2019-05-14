import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';

import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import LogOut from './LogOut';

const AppNavbar = ({ isAuthenticated, user }) => {
    const [ isOpen, toggleIsOpen ] = useState(false);
    const authLinks = (
        <Fragment>
            <NavItem>
                <span className={'navbar-text mr-3'}>
                    <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
                </span>
            </NavItem>
            <NavItem>
                <LogOut/>
            </NavItem>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModal/>
            </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>
        </Fragment>
    );
    return (
        <Navbar color={'dark'} dark expand={'sm'} className={'mb-5 sticky-top'}>
            <Container>
                <NavbarBrand href={'/'}>node.lol</NavbarBrand>
                <NavbarToggler onClick={() => toggleIsOpen(!isOpen)}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className={'ml-auto'} navbar>
                        { isAuthenticated ? authLinks : guestLinks }
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
};

AppNavbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, null)(AppNavbar);
