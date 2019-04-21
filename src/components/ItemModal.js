import React, { Fragment, useState } from 'react';
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
    Input
} from 'reactstrap';
import { addItem } from '../actions/itemActions';

const ItemModal = ({ addItem, isAuthenticated }) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ itemName, setItemName ] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        addItem({ name: itemName });
        setModalIsOpen(false);
    };

    const onChange = event => {
        setItemName(event.target.value);
    };
    return (
        <Fragment>
            {isAuthenticated ?
                <Button
                    color={'dark'}
                    style={{ marginBottom: '2rem' }}
                    onClick={() => setModalIsOpen(!modalIsOpen)}
                >
                    Add Item
                </Button> : <h4 className={'mb-3'}>Login to manage items</h4>
            }
            <Modal
                isOpen={modalIsOpen}
                toggle={() => setModalIsOpen(!modalIsOpen)}
            >
                <ModalHeader toggle={() => setModalIsOpen(!modalIsOpen)}>Add to Item List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(event) => onSubmit(event)}>
                        <FormGroup>
                            <Label for={'item'}>Item</Label>
                            <Input
                                type={'text'}
                                name={'name'}
                                id={'item'}
                                placeholder={'Item name'}
                                onChange={(event) => onChange(event)}
                            />
                            <Button
                                color={'dark'}
                                style={{marginTop: '2rem'}}
                                block
                            >
                                Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </Fragment>
    )
};

ItemModal.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
