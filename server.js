const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
  
app.get('/', (req, res) => {
  res.render('index');
});  

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'dark' });
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/404.png', (req, res) => {
  res.sendFile(path.join(__dirname, '/404.png'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/style.css'));
});

app.get('/dark.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/dark.css'));
});

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message, file } = req.body;

  if(author && sender && title && message && file) {
    res.render('contact', { isSent: true, });
  }
  else {
    res.render('contact', { isError: true })
  }

});

app.use('/user', (req, res, next) => {
  res.send('You should be logged in!');
  next();
})

app.use((req, res) => {
  res.status(404).render('404.hbs');
})

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});