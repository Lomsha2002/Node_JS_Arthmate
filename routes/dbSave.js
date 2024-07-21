import express from 'express';
import moment from 'moment';
import Customer from '../models/customerDetails.js';

const router = express.Router();

const lastRequestTimes = new Map();

router.post('/db-save', async (req, res) => {
    const { customer_name, dob, monthly_income } = req.body;

    if (!customer_name || !dob || !monthly_income) {
        return res.status(400).json({ message: 'All parameters are required' });
    }

    const age = moment().diff(moment(dob), 'years');
    if (age <= 15) {
        return res.status(400).json({ message: 'Age must be above 15' });
    }

    const now = Date.now();
    const lastRequestTime = lastRequestTimes.get(customer_name);

    if (lastRequestTime) {
        const timeDiff = now - lastRequestTime;
        if (timeDiff < 120000) {
            return res.status(429).json({ message: 'Maximum limit exceeded' });
        } else if (timeDiff < 300000 && lastRequestTimes.size >= 2) {
            return res.status(429).json({ message: 'Maximum limit exceeded' });
        }
    }

    try {
        const customer = new Customer({ customer_name, dob, monthly_income });
        await customer.save();

        lastRequestTimes.set(customer_name, now);

        res.status(201).json({ message: 'Customer saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
