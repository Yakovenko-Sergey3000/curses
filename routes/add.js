const {Router} = require('express');
const Cours = require('../models/model.cours');


const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курсы',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const {title, price, url} = req.body
    const cours = new Cours(title, price, url);
   await cours.save()

    await res.redirect('/courses')
})

module.exports = router;