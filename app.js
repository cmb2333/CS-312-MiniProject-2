const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

//https://medium.com/@mottammal1993/building-a-simple-web-app-with-ejs-axios-and-express-js-263ade0467c7

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { joke: null });
});

app.post('/results', (req, res) => {
    const word = req.body.word;

    axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${word}`)
        .then(response => {

            // I hate Javascript bugs
            console.log(response.data);

            const joke = response.data.type === 'single'
                ? response.data.joke
                : `${response.data.setup} - ${response.data.delivery}`;
            res.render('results', { joke });
        })
        .catch(error => {
            console.error('Error fetching joke:', error.message);
            res.render('results', { joke: 'Could not fetch a joke.' });
        });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

