'use strict';

const express = require('express');
const controller = require('./chat.controller');

const router = express.Router();

router.get('/', controller.all);
router.post('/', controller.save);

module.exports = router;
