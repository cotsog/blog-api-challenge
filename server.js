const express = require('express');
const morgan = require('morgan');
const blogApiRouter = require('./blogApiRouter');
const app = express();
app.use(morgan('common'));
app.use('/blog-posts', blogApiRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = app, runServer, closeServer;