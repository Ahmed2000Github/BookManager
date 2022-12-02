import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const baseUrl = "http://localhost:8081/livre/";

function Update(props) {
  const { id } = useParams();
  const titre = useRef();
  const quantite = useRef();
  const description = useRef();
  const dateEdition = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const prix = useRef();
  const couverture = useRef();
  const genre = useRef();
  const navigate = useNavigate();
  useEffect(() => {}, []);

  useEffect(() => {
    if (
      localStorage.getItem("login") === "false" ||
      localStorage.getItem("token") === "undefined"
    ) {
      navigate("/login");
    }
    console.log(id);

    axios.get(baseUrl + id).then((response) => {
      const livre = response.data[0];
      titre.current.value = livre.titre;
      quantite.current.value = livre.quantite;
      description.current.value = livre.description;
      prix.current.value = livre.prix;
      genre.current.value = livre.genre;
      dateEdition.current.value = livre.dateEdition;
    });
  }, []);

  const UpdateLivre = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", titre.current.value);
    formData.append("quantite", quantite.current.value);
    formData.append("description", description.current.value);
    formData.append("dateEdition", dateEdition.current.value);
    formData.append("prix", prix.current.value);
    formData.append("genre", genre.current.value);
    formData.append("couverture", couverture.current.files[0]);
    axios
      .put(baseUrl + id, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        setError(false);
        navigate("/livres");
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
          <h1>Modifier un livre</h1>
          <br />
          <h5 className='text-danger'>{error ? errorMessage : ""}</h5>
          <br />
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type='text'
              placeholder='titre ... '
              required
              ref={titre}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' rows={3} ref={description} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type='number'
              placeholder='prix ... '
              required
              ref={prix}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Quantite</Form.Label>
            <Form.Control
              type='number'
              placeholder='quantite ... '
              required
              ref={quantite}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Genre</Form.Label>
            <Form.Control type='text' placeholder='genre ... ' ref={genre} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Edition</Form.Label>
            <Form.Control
              type='date'
              placeholder='genre ... '
              ref={dateEdition}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Couverture</Form.Label>
            <Form.Control
              type='file'
              placeholder='couverture ... '
              ref={couverture}
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            onClick={(e) => UpdateLivre(e)}
          >
            Modifier
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Update;
