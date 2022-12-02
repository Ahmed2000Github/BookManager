import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://localhost:8081/commande/addCommande";

function AddCommande(props) {
  const { id, nomLivre } = useParams();
  const quantite = useRef();
  const nom = useRef();
  const prenom = useRef();
  const adresse = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("login") === false ||
      localStorage.getItem("token") === undefined
    ) {
      navigate("/login");
    }
  }, []);

  const UpdateLivre = (e) => {
    e.preventDefault();
    const formData = {
      nom: nom.current.value,
      prenom: prenom.current.value,
      adresse: adresse.current.value,
      quantite: quantite.current.value,
      livreId: id,
    };
    axios
      .post(baseUrl, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        setError(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setError(true);
      });
  };

  return (
    <div className='container d-flex justify-content-center'>
      <div className='col-md-6'>
        <Form>
          <h1>Ajouter une nouvelle demande</h1>
          <br />
          <h5 className='text-danger'>{error ? errorMessage : ""}</h5>
          <br />
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type='text'
              placeholder='nom ... '
              required
              ref={nom}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Prenom</Form.Label>
            <Form.Control
              type='text'
              placeholder='prenom ... '
              required
              ref={prenom}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type='text'
              placeholder='adresse ... '
              required
              ref={adresse}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Quantite </Form.Label>
            <Form.Control
              type='number'
              placeholder='quantite ... '
              max={10}
              min={1}
              required
              ref={quantite}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Nom de livre</Form.Label>
            <Form.Control type='text' placeholder={nomLivre} disabled />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            onClick={(e) => UpdateLivre(e)}
          >
            Ajouter
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddCommande;
