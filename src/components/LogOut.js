import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import { logout } from '../actions/authActions';

const LogOut = ({ logout }) => <NavLink href={'#'} onClick={logout}>Logout</NavLink>

LogOut.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(LogOut);
