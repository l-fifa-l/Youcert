import express from 'express';
import { getUser } from '../controllers/user';
import { requireSignin } from '../middleware';

const router = express.Router();

router.get('/user/:id', getUser);

module.exports = router;
