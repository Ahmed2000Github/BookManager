import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
const baseUrl = "http://localhost:8081/livres";

function Livres() {
  const [livreList, setLivreList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("login") === "false" ||
      localStorage.getItem("token") === "undefined"
    ) {
      navigate("/login");
    }
    axios.get(baseUrl).then((response) => {
      setLivreList(response.data);
    });
  }, []);
  const deleteLivre = (id) => {
    axios
      .delete("http://localhost:8081/livre/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        window.location.reload(false);
        // console.log(data);
      });
  };

  return (
    <>
      <div className='d-flex flex-wrap gap-3 justify-content-center'>
        <h1>Listes des livres disponibles</h1>
        <br />
        <Link to={"/ajouter"}>
          <Button variant='primary'>Ajouter</Button>
        </Link>
      </div>
      <br />
      <div className='container px-5'>
        <Table className='text-center' hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Titre</th>
              <th>Edition</th>
              <th>Genre</th>
              <th>Quantite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {livreList.map((livre) => {
              return (
                <tr key={livre.id}>
                  <td>{livre.id}</td>
                  <td>
                    <img
                      src={"http://localhost:8081" + livre.couverture}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                      alt=''
                    />
                  </td>
                  <td>{livre.titre}</td>
                  <td>{livre.dateEdition}</td>
                  <td>{livre.genre}</td>
                  <td>{livre.quantite}</td>
                  <td>
                    <div className='d-flex justify-content-center gap-4 h-100'>
                      <Link
                        className='btn btn-primary'
                        to={"/miseajour/" + livre.id}
                      >
                        Modifier
                      </Link>
                      <Button
                        to={"/miseajour/" + livre.id}
                        variant='danger'
                        onClick={() => deleteLivre(livre.id)}
                      >
                        Suprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* {livreList.map((livre, index) => {
          return <Item key={index} livre={livre} />;
        })} */}
    </>
  );
}

function Item(props) {
  const deleteLivre = (id) => {
    axios.delete("http://localhost:8081/livre/" + id).then((data) => {
      window.location.reload(false);
      // console.log(data);
    });
  };
  return (
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
            to={"/feedback/" + props.livre.id}
            variant='primary'
            size='sm'
            //   onClick={() => handleAdd(props.livre)}
          >
            feedbacks
          </Link>
        </Card.Title>
        <Card.Text>{props.livre.description}</Card.Text>

        <Card.Text>{"prix : " + props.livre.prix + " $"}</Card.Text>

        <Card.Text>{"genre : " + props.livre.genre}</Card.Text>
        <div className='d-flex justify-content-between'>
          <Link
            to={"/miseajour/" + props.livre.id}
            variant='primary'
            size='sm'
            //   onClick={() => handleAdd(props.livre)}
          >
            Modifier
          </Link>
          <Button
            to={"/miseajour/" + props.livre.id}
            variant='primary bg-danger'
            size='sm'
            onClick={() => deleteLivre(props.livre.id)}
          >
            Suprimer
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default Livres;
