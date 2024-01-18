const express = require('express')
const router = express.Router();
const {getContacts, getSingleContact, createContact, updateContact, deleteContact} = require('../controllers/contactController')

router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getSingleContact).put(updateContact).delete(deleteContact);




module.exports = router;