import React, { Fragment, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

const AppNavbar = ({ ...props }) => {
  const [ isOpen, toggleIsOpen ] = useState(false);
  return (
    <Fragment>
      <Navbar color={'dark'} dark expand={'sm'} className={'mb-5 sticky-top'}>
        <Container>
        <NavbarBrand href={'/'}>node.lol</NavbarBrand>
        <NavbarToggler onClick={() => toggleIsOpen(!isOpen)}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className={'ml-auto'} navbar>
            <NavItem>
              <NavLink href={'/'}>GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  )
};

export default AppNavbar;