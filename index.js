const express = require('express');
const https = require('https');
// const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// let key = fs.readFileSync(__dirname + '/certs/server.key');
// let cert = fs.readFileSync(__dirname + '/certs/server.cert');
// let options = {
// 	key: key,
// 	cert: cert
// };

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

// let server = https.createServer(options, app);

// server.listen.....
app.listen(PORT, () => {
	console.log("Server starting on port : " + PORT)
});