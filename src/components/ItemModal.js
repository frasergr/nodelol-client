import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
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

const ItemModal = ({ addItem }) => {
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
      <Button
        color={'dark'}
        style={{ marginBottom: '2rem' }}
        onClick={() => setModalIsOpen(!modalIsOpen)}
      >
        Add Item
      </Button>
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

export default connect(null, { addItem })(ItemModal);