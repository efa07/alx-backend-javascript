const express = require('express');
const app = express();
const port = 7865;

app.use(express.json());


app.get('/available_payments', (req, res) => {
    res.json({
        payment_methods: {
            credit_cards: true,
            paypal: false
        }
    });
});

app.post('/login', (req, res) => {
    const { userName } = req.body;
    if (userName) {
        res.send(`Welcome ${userName}`);
    } else {
        res.status(400).send('Username is required');
    }
});

app.listen(port, () => {
    console.log(`API available on localhost port ${port}`);
});

module.exports = app;
