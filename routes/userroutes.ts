import express from 'express';
import { loginUser, updateScore, getHighScore } from '../contollers/usercontroller';

const router = express.Router();

router.post('/login', loginUser);
router.post('/update-score', updateScore);
router.get('/high-score/phone', getHighScore);

export default router;
