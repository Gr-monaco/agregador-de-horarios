const express = require('express');

const router = express.Router();

router.get('/', async(req, res) => {
  res.status(200).send({response: 'Teste'})
})

module.exports = router;