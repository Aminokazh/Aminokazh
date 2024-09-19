const express = require("express")
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Web',
    password: 'a546792zh',
    port: 5467,
  });


app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) =>{
    res.render("register.ejs")
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body; 

try {
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );
    res.send('Registration was successful!');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Error while registering user.' });
  };
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
