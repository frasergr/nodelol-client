import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems, deleteItem } from "../actions/itemActions";
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';

const ItemList = ({ item: { items }, getItems, deleteItem }) => {
  useEffect(() => { getItems() }, []);
  return (
    <Fragment>
      <ListGroup>
        <TransitionGroup className={'item-list'}>
          {items.map(({ _id, name, }) => (
            <CSSTransition key={_id} timeout={500} classNames={'fade'}>
              <ListGroupItem>
                <Button
                  className={'remove-btn'}
                  color={'danger'}
                  size={'sm'}
                  onClick={() => deleteItem(_id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Fragment>
  )
};

ItemList.propTypes = {
  item: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    item: state.item
  }
};

export default connect(mapStateToProps, { getItems, deleteItem })(ItemList);