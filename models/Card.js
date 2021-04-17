const path = require('path');
const fs = require('fs');



const p = path.join(
 path.dirname(process.mainModule.filename),
 'data',
 'card.json'

)



class Card  {
   static async add(cours) {
    const courses = await Card.fetch();
    let idx = courses.courses.findIndex(item => item.id === cours.id)

    
    
    
    
    if(idx !== -1) {
        courses.price += +cours.price;
        courses.courses[idx].count  = ++courses.courses[idx].count 
        courses.courses[idx] = courses.courses[idx]
       
        
        
        return await new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(courses),(err) => {
                if(err) {
                    reject(err)
                } 
                resolve();
            })
        })
        
    } else {
        cours.count = 1;
        courses.courses.push(cours);
        courses.price += +cours.price;
        
        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(courses),(err) => {
                if(err) {
                    reject(err)
                } 
                resolve();
            })
        })
       
    }

    }

    static async remove(id) {
        const card = await Card.fetch();
        let idx = card.courses.findIndex(item => item.id === id)
        let cours = card.courses[idx];
        if(cours.count === 1) {
           card.courses =  card.courses.filter(item => item.id !== id)
        } else {
            card.courses[idx].count--;

        }

        card.price -= cours.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card),(err) => {
                if(err) {
                    reject(err)
                } 
                resolve(card);
            })
        })
        
    }


   static async fetch() {

    return new Promise((resolve, reject) => {
     fs.readFile(p, 'utf-8', (arr, content) => {
            if(arr) {
                reject(arr);
            }
           resolve(JSON.parse(content))
        })
    })

    }
}


module.exports = Card;