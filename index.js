const express = require('express');
const app = express();
const services = require('./config/services');
const { createProxyMiddleware } = require('http-proxy-middleware');

services.forEach(service => {
    app.use(service.url, createProxyMiddleware(service.proxy));
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})