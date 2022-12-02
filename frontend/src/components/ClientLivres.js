import { useEffect, useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
const baseUrl = "http://localhost:8081/livres";

function ClientLivres() {
  const [livreList, setLivreList] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setLivreList(response.data);
    });
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center'></div>
      <div className='d-flex flex-wrap gap-3 justify-content-center'>
        {livreList.map((livre, index) => {
          return <Item key={index} livre={livre} />;
        })}
      </div>
    </>
  );
}

function Item(props) {
  return (
    <>
      <br />
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant='top'
          src={"http://localhost:8081" + props.livre.couverture}
          style={{ maxHeight: "150px" }}
        />
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            <span>{props.livre.titre}</span>
            <Link
              className='btn'
              to={"/feedback/" + props.livre.id}
              variant='primary'
              size='sm'
              //   onClick={() => handleAdd(props.livre)}
            >
              {props.livre.feedbacks.length} feedbacks
            </Link>
          </Card.Title>
          <Card.Text>{props.livre.description}</Card.Text>

          <Card.Text>{"prix : " + props.livre.prix + " $"}</Card.Text>

          <Card.Text>{"Edition : " + props.livre.dateEdition}</Card.Text>
          <Card.Text>{"genre : " + props.livre.genre}</Card.Text>
          <div className='d-flex justify-content-between'>
            <Link
              to={"/addcommade/" + props.livre.id + "/" + props.livre.titre}
              size='sm'
            >
              <Button variant='primary ' size='sm'>
                Commander
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ClientLivres;
