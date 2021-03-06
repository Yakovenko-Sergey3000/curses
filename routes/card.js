const {Router} = require('express');
const Cours = require('../models/model.cours');
const Card = require('../models/Card');

const router = Router();


router.post('/add', async (req, res) => {
   
    const cours = await Cours.getById(req.body.id);
    await Card.add(cours);


    res.redirect('/card')

})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card);
})


router.get('/', async (req, res) => {
    const card = await Card.fetch();
    
    res.render('card', {
        title: 'Card', 
        isCard: true,
        card
    })
})


module.exports = router;



