import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo.png'
const Header = (props) => {
  const { isConnected, logOut, getAccounts, account } = props;

  const onLogBtn = () => {
    if(isConnected){
      logOut();
    }else{
      getAccounts();
    }
  }
  const getAccountShort = (_address) => {
    const first = _address.slice(0, 5);
    const last = _address.slice(-4);
    return `${first}...${last}`;
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <div className="logo-link">
            <img className="logo-img" src={logo} alt="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#">Create</Nav.Link>
            <Nav.Link href="#action2">Existing Contracts</Nav.Link>
          </Nav>
          <Nav>
            <Form className="d-flex">
              <Nav.Link href="#deets" disabled>{isConnected ? getAccountShort(account) : ''}</Nav.Link>
              <Button variant="success" onClick={onLogBtn}>{isConnected ? 'Log Out' : 'Connect Wallet'}</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header