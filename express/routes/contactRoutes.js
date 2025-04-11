const express = require("express");
const {
    getContacts,
    getContact,
    updateContact,
    createContact,
    deleteContact
}= require("../controllers/contactController");
const router = express.Router();
router.route("/").get(getContacts);

router.route("/:watchname").get(getContact);

router.route("/").post(createContact);

router.route("/:watchname").put(updateContact);

router.route("/:watchname").delete(deleteContact);

module.exports = router;
