import { useEffect, useState } from "react";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:8081/commande/commandes";

function Commandes() {
  const [commandeList, setCommandeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("login") === "false" ||
      localStorage.getItem("token") === "undefined"
    ) {
      navigate("/login");
    }
    axios
      .get(baseUrl)
      .then((response) => {
        setCommandeList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='d-flex flex-wrap gap-3 justify-content-center'>
        <h1>Liste des commandes</h1>
        <div className='container'>
          <Table className='text-center' hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Adresse</th>
                <th>Livre ID</th>
                <th>Quantite</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandeList.map((commande) => {
                return (
                  <tr key={commande.id}>
                    <td>{commande.id}</td>
                    <td>{commande.client.nom}</td>
                    <td>{commande.client.prenom}</td>
                    <td>{commande.client.adresse}</td>
                    <td>{commande.livreId}</td>
                    <td>{commande.quantite}</td>
                    <td>
                      <Button className='bg-danger'>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Commandes;
