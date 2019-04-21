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
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const RegisterModal = ({ register, isAuthenticated, error, clearErrors }) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ userData, setUserData ] = useState({ name: '', email: '', password: '', msg: null });
    const prevErrorRef = useRef();

    useEffect(() => {
        prevErrorRef.current = error;
    });
    const prevError = prevErrorRef.current;

    useEffect(() => {
        if (error !== prevError) {
            if (error.id === 'REGISTER_FAIL') {
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
        const { name, email, password } = userData;
        const newUser = {
            name,
            email,
            password
        };
        register(newUser);
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
                Register
            </NavLink>
            <Modal
                isOpen={modalIsOpen}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Register</ModalHeader>
                <ModalBody>
                    { userData.msg ? <Alert color={'danger'}>{userData.msg}</Alert> : null }
                    <Form onSubmit={(event) => onSubmit(event)}>
                        <FormGroup>
                            <Label for={'name'}>Name</Label>
                            <Input
                                type={'text'}
                                name={'name'}
                                id={'name'}
                                placeholder={'Name'}
                                className={'mb-3'}
                                onChange={(event) => onChange(event)}
                            />

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
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </Fragment>
    )
};

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
