import Livres from "./components/Livres";
import Commandes from "./components/Commande";
import AddCommande from "./components/AddCommande";
import Ajouter from "./components/Ajouter";
import Update from "./components/Update";
import Search from "./components/Search";
import Login from "./components/AdminLogin";
import ClientLivres from "./components/ClientLivres";
import FeedBack from "./components/FeedBack";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

function App() {
  const [isloggedIn, setIsloggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<NavMenu login={isloggedIn} setLogin={setIsloggedIn} />}
          >
            <Route index element={<ClientLivres />} />
            <Route path='/search' element={<Search />} />
            <Route path='/ajouter' element={<Ajouter />} />
            <Route path='/commandes' element={<Commandes />} />
            <Route path='/miseajour/:id' element={<Update />} />
            <Route path='/addcommade/:id/:nomLivre' element={<AddCommande />} />
            <Route path='/feedback/:id' element={<FeedBack />} />
            <Route path='/livres' element={<Livres />} />
          </Route>
          <Route path='/login' element={<Login setState={setIsloggedIn} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const NavMenu = (props) => {
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.setItem("login", false);
    localStorage.setItem("token", undefined);
    props.setLogin(false);
    navigate("/");
  };
  return (
    <>
      <Navbar bg='light' variant='light' className='fw-bold'>
        <Container className='col-md-8'>
          <Navbar.Collapse id='responsive-navbar-nav'>
            {localStorage.getItem("login") === "true" ? (
              <>
                <Nav className='me-auto mx-5'>
                  <Nav.Link href='/livres'>Livres</Nav.Link>
                  <Nav.Link href='/commandes'>Commandes</Nav.Link>
                </Nav>
                <Nav>
                  <Button
                    variant='outline-danger fw-bold'
                    onClick={(e) => logout(e)}
                  >
                    Logout
                  </Button>
                </Nav>
              </>
            ) : (
              <>
                <Nav className='me-auto mx-5'>
                  <Nav.Link href='/'>Livres </Nav.Link>
                  <Nav.Link href='/search'>Search</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href='/login'>
                    <Button variant='outline-primary fw-bold'>
                      Admin space
                    </Button>
                  </Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <div className='d-flex justify-content-center bg-primary'>
        <Nav className='justify-content-between  w-50' activeKey='/home'>
          {localStorage.getItem("login") === "true" ? (
            <>
              <Nav.Item>
                <Nav.Link href='/livres'>
                  Livres
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='fs-3 text-white' href='/commandes'>
                  Commandes
                </Nav.Link>
              </Nav.Item>
              <Button className='text-danger' onClick={(e) => logout(e)}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link className='fs-4 text-white' href='/'>
                  Livres disponiles
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='btn fs-4 text-white' href='/login'>
                  Admin space
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </div> */}
      <br />
      <Outlet />
    </>
  );
};
export default App;
