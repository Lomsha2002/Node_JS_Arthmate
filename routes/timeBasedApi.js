import express from 'express';
import moment from 'moment';
import Customer from '../models/customerDetails.js';

const router = express.Router();

router.post('/time-based-api', async (req, res) => {
    const { customer_name, dob, monthly_income } = req.body;

    const now = moment();
    const dayOfWeek = now.day();
    const hour = now.hour();
    if (dayOfWeek === 1) {
        return res.status(403).json({ message: "Please don't use this api on Monday" });
    }

    if (hour >= 8 && hour < 15) {
        return res.status(403).json({ message: 'Please try after 3pm' });
    }

    try {
        const customer = new Customer({ customer_name, dob, monthly_income });
        await customer.save();

        res.status(201).json({ message: 'Customer saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
