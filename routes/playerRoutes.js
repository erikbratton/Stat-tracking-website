const express = require('express');
const playerController = require('../controllers/playerController');
const router = express.Router();

router.get('/', playerController.landing);
router.get('/players', playerController.findPlayer);
router.post('/players', playerController.addPlayer);
router.get('/volleyball', playerController.findVolleyPlayer);
router.post('/volleyball', playerController.volleyForm);
router.get('/spikeball', playerController.spikeballPlayer);
router.post('/spikeball', playerController.spikeballForm);
router.get('/basketball', playerController.basketballPlayer);
router.post('/basketball', playerController.basketballForm);


module.exports = router;