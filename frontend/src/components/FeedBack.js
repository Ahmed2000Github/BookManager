import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
const baseUrl = "http://localhost:8081/livre/";

function FeedBack(props) {
  const { id } = useParams();
  const content = useRef();
  const [livre, setLivre] = useState({
    titre: "",
    dateEdition: "",
    feedbacks: [
      {
        id: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    axios.get(baseUrl + id).then((response) => {
      setLivre(response.data[0]);
    });
  }, []);

  const addFeedback = (e) => {
    e.preventDefault();
    const data = {
      description: content.current.value,
      livreId: id,
    };
    if (data.description !== "") {
      axios.post(baseUrl + "feedback", data).then((response) => {
        content.current.value = "";
        console.log(response.data);
      });
    }
  };

  return (
    <div className='container d-flex justify-content-center'>
      <div className='col-md-6'>
        <h2>
          Liste des feedbacks sur le livre :{" "}
          <span className='text-info'>{livre.titre}</span>
        </h2>
        <br />
        <h4>
          Edition : <span className='text-info'>{livre.dateEdition}</span>
        </h4>
        <hr />

        <br />
        <ul>
          {livre.feedbacks.length !== 0 ? (
            livre.feedbacks.map((feedback) => {
              return (
                <li key={feedback.id}>
                  <h5>{feedback.description}</h5>
                </li>
              );
            })
          ) : (
            <h6>Aucun feedback trouver</h6>
          )}
        </ul>
        <div className='col-md-12'>
          <Form>
            <Form.Group
              className='mb-3 d-flex gap-2'
              controlId='formBasicEmail'
            >
              <Form.Control
                type='text'
                placeholder='Ajouter vos propre feedback ... '
                required
                ref={content}
              />
              <Button
                variant='primary'
                type='submit'
                onClick={(e) => addFeedback(e)}
              >
                Ajouter
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FeedBack;
