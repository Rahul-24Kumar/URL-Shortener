import express from 'express';
import { createShortUrl, getShortUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createShortUrl);

router.get('/:shortCode', getShortUrl);

export default router;
