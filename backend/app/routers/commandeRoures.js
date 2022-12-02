const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

router.get("/commandes", commandeController.getAllcommandes);
// router.get("/commandes", (res, req) => {
//   console.log("#########");
// });
router.get("/clients", commandeController.getAllClients);
router.post("/addCommande", commandeController.addCommande);
router.get("/commande/:id", commandeController.getCommande);
router.delete("/commande/:id", commandeController.deleteCommande);

module.exports = router;
