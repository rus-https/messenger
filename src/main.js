const express = require('express')
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const app = express();
const add = require('./back/add')
const list = require('./back/list')
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

const PORT = process.env.PORT || config.port;

try {
  const privateKey = fs.readFileSync(path.join(__dirname, config.ssl.privateKeyPath), 'utf8');
  const certificate = fs.readFileSync(path.join(__dirname, config.ssl.certificatePath), 'utf8');

  const credentials = {
      key: privateKey,
      cert: certificate,
  };
  
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(PORT, () => {
         console.log(`HTTPS Server started on port ${PORT}`);
    })
} catch (err) {
    console.error(`Failed to load SSL keys, starting HTTP server only: ${err}`);
    const httpServer = http.createServer(app)
      httpServer.listen(PORT, () => {
          console.log(`HTTP Server started on port ${PORT}`);
    });
}

app.get('/web/*', (req, res) => {
    const filePath = __dirname + req.path
  
    if(filePath.endsWith('.js')){
      res.setHeader('Content-Type', 'application/javascript')
    }
     if(filePath.endsWith('.css')){
      res.setHeader('Content-Type', 'text/css')
    }
    if(filePath.endsWith('.json')){
      res.setHeader('Content-Type', 'application/json')
    }
    res.sendFile(filePath);
  });


  app.get('*', (req, res) => {
    const html = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8" />
              <title>Чат</title>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
              <script src="/web/auth.js" type="module"></script>
              <script>
                 document.addEventListener('DOMContentLoaded', () => import('/web/auth.js').then(module => module.auth()))
              </script>
          </head>
          <body>
          </body>
          </html>
      `;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
app.post('/list', async (req,res) =>{
  await list(req,res)
})

app.post('/add', async (req,res) =>{
    await add(req,res)
  })


