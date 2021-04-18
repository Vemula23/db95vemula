var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var medicine_controller = require('../controllers/medicine');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// medicine ROUTES ///
// POST request for creating a medicine.
router.post('/medicine', medicine_controller.medicine_create_post);
// DELETE request to delete medicine.
router.delete('/medicine/:id', medicine_controller.medicine_delete);
// PUT request to update medicine.
router.put('/medicine/:id', medicine_controller.medicine_update_put);
// GET request for one medicine.
router.get('/medicine/:id', medicine_controller.medicine_detail);
// GET request for list of all medicine items.
router.get('/medicine', medicine_controller.medicine_list);
module.exports = router;