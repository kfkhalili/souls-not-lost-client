const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const url = require('url');

app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));

app.use(express.static('client-app/build'));

app.listen(process.env.PORT)
