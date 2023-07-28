const express = require('express');
const router=express.Router();
const etudiantController = require('../controllers/etudiantController');

//create , find ,update ,delete
router.get('/',etudiantController.view);
router.post('/',etudiantController.find);
router.get('/addetudiant',etudiantController.form); 
router.post('/addetudiant',etudiantController.create);
router.get('/editetudiant/:id_etu',etudiantController.edit);
router.post('/editetudiant/:id_etu',etudiantController.update);
router.get('/:id_etu',etudiantController.delete);

module.exports = router;