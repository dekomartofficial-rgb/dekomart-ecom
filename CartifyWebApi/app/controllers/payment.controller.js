// routes/payment.js
const express = require("express");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: "rzp_test_01wjQrGrxO45cH",
    key_secret: "bggXbDOSzuBa5ar2Xpe9Xqle",
});


class Payment {
    static PaymentCreateOrder = async (req, res) => {
        const { amount, currency, receipt } = req.body;

        const options = {
            amount: amount * 100, // in paise (e.g., ₹500 = 50000)
            currency: currency || "INR",
            receipt: receipt || "receipt#1",
        };

        try {
            const order = await razorpay.orders.create(options);
            console.log(order)
            res.json(order);
        } catch (err) {
            res.status(500).json({ error: "Order creation failed" });
        }
    }
}

module.exports = Payment;
