import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container be-vietnam-pro-medium">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="navbar" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Filmster</Navbar.Brand>
              </LinkContainer>
              <Nav className=" me-auto w-100  justify-content-end">
                {userInfo ? (
                  <>
                    <Link className="nav-link" to="/addpost">
                      Add
                    </Link>
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <NavDropdown.Divider />
                      <LinkContainer to={`/profile`}>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Disconnect
                      </Link>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Link to="/map" className="nav-link">
                      <i className="fas fa-map"></i>
                    </Link>
                    <Link className="nav-link" to="/signin">
                      Log in
                    </Link>
                  </>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center footer">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
