import express from 'express';
import moment from 'moment';
import Customer from '../models/customerDetails.js';

const router = express.Router();

router.get('/db-search', async (req, res) => {
    const startTime = Date.now();
    const lowerBound = moment().subtract(25, 'years').toDate();
    const upperBound = moment().subtract(10, 'years').toDate();

    try {
        const customers = await Customer.find({
            dob: { $gte: lowerBound, $lte: upperBound },
        }).select('customer_name');

        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;

        const customerNames = customers.map(customer => customer.customer_name);
        res.status(200).json({ customer_names: customerNames, time_taken: timeTaken });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
