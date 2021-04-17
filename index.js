const express = require('express');
const exphbs = require('express-handlebars');
const routHome = require('./routes/home');
const routCourses = require('./routes/courses');
const routAdd = require('./routes/add');
const routCard = require('./routes/card');
const path = require('path')



const app = express();


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views')



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));

app.use('/', routHome);
app.use('/courses', routCourses);
app.use('/add', routAdd);
app.use('/card', routCard)







const PORT  = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
