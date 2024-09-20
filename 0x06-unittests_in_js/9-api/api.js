const express = require('express');
const app = express();
const port = 7865;


app.get('/cart/:id(\\d+)', (req, res) => {
    const cartId = req.params.id;
    res.send(`Payment methods for cart ${cartId}`);
});

app.get('/cart/*', (req, res) => {
    res.status(404).send('Invalid cart ID');
});

app.listen(port, () => {
    console.log(`API available on localhost port ${port}`);
});
