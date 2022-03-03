const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const {sendMessages, createSession} = require('./server/bot2');


const app = express();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
/** Point static path to dist */
app.use(express.static(path.join(__dirname, 'dist/Vhatsapp')));
app.use(cors());

app.post('/api/sendMessages', sendMessages);
app.get('/api/createSession', createSession);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/Vhatsapp/index.html'));
});

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`API running on localhost:${port}`));


