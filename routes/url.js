const express= require('express');
const {handlegenerateNewShortURL,handleAna}= require('../controllers/url')

const router = express.Router();

router.post('/', handlegenerateNewShortURL);
router.get('/analytics/:shortId', handleAna );
module.exports= router;