const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const env = require('../src/config/env');

// SSLCommerz credentials
const store_id = env.sslcommerzStoreId;
const store_passwd = env.sslcommerzStorePassword;
const is_live = false; // true for live, false for sandbox

const backendUrl = `http://localhost:${env.port}`;

// Initialize payment
router.post('/init', async (req, res) => {
    try {
        const { totalAmount, userId, cartItems } = req.body;
        const transactionId = `T_${Date.now()}`; // Unique transaction ID

        const data = {
            total_amount: totalAmount,
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `${backendUrl}/api/payment/success`,
            fail_url: `${backendUrl}/api/payment/fail`,
            cancel_url: `${backendUrl}/api/payment/cancel`,
            ipn_url: `${backendUrl}/api/payment/ipn`,
            shipping_method: 'NO',
            product_name: 'Travel Gear Items',
            product_category: 'Physical goods',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);
        
        if (apiResponse?.GatewayPageURL) {
            res.json({ url: apiResponse.GatewayPageURL });
        } else {
            throw new Error('Failed to get payment URL');
        }
    } catch (error) {
        console.error('Payment initialization error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Success route
router.post('/success', async (req, res) => {
    res.redirect(`${env.frontendUrl}/payment-success`);
});

// Fail route
router.post('/fail', async (req, res) => {
    res.redirect(`${env.frontendUrl}/payment-failed`);
});

// Cancel route
router.post('/cancel', async (req, res) => {
    res.redirect(`${env.frontendUrl}/cart`);
});

module.exports = router;