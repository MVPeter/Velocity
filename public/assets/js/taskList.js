const express = require('express');
const app = express();
const port = 8080;

const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    layoutsDir: `${__dirname}/views/layouts`
}));

app.use(expres.static('public'));

app.get('/tasks',(req, res) => {
res.render('main', {layout: 'tasklist'});
});

app.listen(port,() =>{
console.log(`app listening to port ${port}`);
});