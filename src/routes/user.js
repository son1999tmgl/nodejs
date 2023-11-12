import express from 'express';
import * as controllers from '../controllers'

const router = express.Router();
router.get('/', controllers.getUser)

module.exports = router;