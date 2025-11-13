const express = require('express');
const app = express();
const port = 3000;

const fortunes = [
  "A container a day keeps the deployment issues away.",
  "Your code will compile on the first try... in a parallel universe.",
  "A great opportunity awaits you in the cloud.",
  "You will soon discover a bug that has been there all along.",
  "Your next pull request will be approved without comments.",
  "Docker is not just a tool, it's a lifestyle.",
  "The answer you seek is in the logs.",
  "A volume will save your data from certain doom.",
];

const wisdoms = [
  "Always mount your volumes, young padawan.",
  "With great immutability comes great predictability.",
  "The container that runs on your machine will also run on production.",
  "Cache your layers wisely, for rebuilds are costly.",
  "A bound mount is worth a thousand rebuilds.",
];

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Docker Fortune Teller</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .container {
            text-align: center;
            max-width: 600px;
          }
          h1 { font-size: 3em; margin-bottom: 10px; }
          .subtitle { font-size: 1.2em; margin-bottom: 30px; opacity: 0.9; }
          .links { margin-top: 40px; }
          a {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 15px 30px;
            margin: 10px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: transform 0.2s;
          }
          a:hover { transform: scale(1.1); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔮 Docker Fortune Teller 🔮</h1>
          <div class="subtitle">Mystical wisdom from the container realm</div>
          <div class="links">
            <a href="/fortune">Get Your Fortune</a>
            <a href="/wisdom">Seek Wisdom</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/fortune', (req, res) => {
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.send(`
    <html>
      <head>
        <title>Your Fortune</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .fortune-box {
            background: rgba(255, 255, 255, 0.1);
            border: 3px solid white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            text-align: center;
          }
          .fortune { font-size: 1.5em; line-height: 1.6; margin: 20px 0; }
          a {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 10px 25px;
            margin-top: 20px;
            text-decoration: none;
            border-radius: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="fortune-box">
          <h1>🥠 Your Fortune 🥠</h1>
          <div class="fortune">"${fortune}"</div>
          <a href="/">← Back to Home</a>
        </div>
      </body>
    </html>
  `);
});

app.get('/wisdom', (req, res) => {
  const wisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];
  res.send(`
    <html>
      <head>
        <title>Docker Wisdom</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
          }
          .wisdom-box {
            background: rgba(255, 255, 255, 0.1);
            border: 3px solid white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            text-align: center;
          }
          .wisdom { font-size: 1.5em; line-height: 1.6; margin: 20px 0; font-style: italic; }
          a {
            display: inline-block;
            background: white;
            color: #764ba2;
            padding: 10px 25px;
            margin-top: 20px;
            text-decoration: none;
            border-radius: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="wisdom-box">
          <h1>📜 Docker Wisdom 📜</h1>
          <div class="wisdom">"${wisdom}"</div>
          <a href="/">← Back to Home</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Fortune teller listening at http://localhost:${port}`);
});
