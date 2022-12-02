import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:8081/auth/signin";

function Login(props) {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl, {
        username: username.current.value,
        password: password.current.value,
      })
      .then((response) => {
        props.setState(true);
        localStorage.setItem("login", true);
        localStorage.setItem("token", response.data.accessToken);
        setError(false);
        navigate("/livres");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setError(true);
      });
  };
  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className='d-flex justify-content-center'>
      <div
        className='col-md-6'
        style={{
          height: "50%",
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <Form className='card p-5'>
          <h1>Se connecter vers espace admin</h1>
          <br />
          <h5 className='text-danger'>{error ? errorMessage : ""}</h5>
          <br />
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Admin login</Form.Label>
            <Form.Control
              type='text'
              placeholder='admin login ... '
              required
              ref={username}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Mot de passe :</Form.Label>
            <Form.Control
              type='text'
              placeholder='mot de passe ... '
              ref={password}
            />
          </Form.Group>
          <br />
          <div className='d-flex justify-content-between'>
            <Button
              variant='primary'
              className='w-25'
              type='submit'
              onClick={(e) => login(e)}
            >
              Login
            </Button>
            <Button
              variant='danger'
              className='w-25'
              type='submit'
              onClick={(e) => back(e)}
            >
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
