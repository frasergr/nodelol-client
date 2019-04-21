import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const LoginModal = ({ login, isAuthenticated, error, clearErrors }) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ userData, setUserData ] = useState({ email: '', password: '', msg: null });
    const prevErrorRef = useRef();

    useEffect(() => {
        prevErrorRef.current = error;
    });
    const prevError = prevErrorRef.current;

    useEffect(() => {
        if (error !== prevError) {
            if (error.id === 'LOGIN_FAIL') {
                setUserData({ ...userData, msg: error.msg.msg });
            } else {
                setUserData({ ...userData, msg: null });
            }
        }

        if (modalIsOpen) {
            if (isAuthenticated) {
                toggleModal();
            }
        }
    });

    const onSubmit = event => {
        event.preventDefault();
        const { email, password } = userData;
        const user = { email, password };
        login(user);
    };

    const onChange = event => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const toggleModal = () => {
        clearErrors();
        setModalIsOpen(!modalIsOpen);
    };
    return (
        <Fragment>
            <NavLink
                onClick={toggleModal}
                href={'#'}
            >
                Login
            </NavLink>
            <Modal
                isOpen={modalIsOpen}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    { userData.msg ? <Alert color={'danger'}>{userData.msg}</Alert> : null }
                    <Form onSubmit={(event) => onSubmit(event)}>
                        <FormGroup>
                            <Label for={'email'}>Email</Label>
                            <Input
                                type={'email'}
                                name={'email'}
                                id={'email'}
                                placeholder={'Email'}
                                className={'mb-3'}
                                onChange={(event) => onChange(event)}
                            />

                            <Label for={'password'}>Password</Label>
                            <Input
                                type={'password'}
                                name={'password'}
                                id={'password'}
                                placeholder={'Password'}
                                className={'mb-3'}
                                onChange={(event) => onChange(event)}
                            />
                            <Button
                                color={'dark'}
                                style={{marginTop: '2rem'}}
                                block
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </Fragment>
    )
};

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
