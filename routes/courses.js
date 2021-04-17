const {Router} = require('express');
const Cours = require('../models/model.cours');

const router = Router();

router.get('/', async (req, res) => {
     const courses = await Cours.getAll();
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
});

router.get('/:id/edit', async(req, res) => {

    if(!req.query.allow) {
        return res.redirect('/');
    } 

    const courses = await Cours.getById(req.params.id)

    res.render('cours-edit', {
        title: 'Редактирование курса',
        courses
    }) 
})


router.post('/edit', async (req, res) => {
    if((req.body.delete)) {
        await Cours.delete(req.body);
    }
    await Cours.update(req.body);

    res.redirect('/courses');
})


router.get('/:id', async (req, res) => {
    const courses = await Cours.getById(req.params.id);
    res.render('cours', {
        layout: 'empty',
        title: `Курс ${courses.title}`,
        courses
    })
})


module.exports = router;