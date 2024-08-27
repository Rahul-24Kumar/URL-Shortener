import { Url } from '../models/urlModel.js';
import shortid from 'shortid';

export const createShortUrl = async (req, res) => {
    try {

        const { longUrl } = req.body;

        if (!longUrl) {
            return res.status(400).json({ message: 'Long URL is required' });
        }

        const shortCode = shortid.generate();

        const shortUrl = `http://localhost:3000/${shortCode}`;


        const newUrl = new Url({ shortCode, longUrl });
        await newUrl.save();

        return res.status(201).json({
            message: 'URL short generated successfully',
            shortUrl
        });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const getShortUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).send('URL not found');
        }

        res.redirect(url.longUrl);
    } catch (error) {
        console.error('Error redirecting to long URL:', error);
        res.status(500).send('Server error');
    }
};

