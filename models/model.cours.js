const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');



class Cours {
    constructor(title, price, url) {
        this.title = title,
        this.price = price,
        this.url = url,
        this.id = uuidv4()
    }

    addInDB(content) {
        return 
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            url: this.url,
            id: this.id
        }
    }

   async save() {
       const courses = await Cours.getAll();
         courses.push(this.toJSON());
         new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (arr) =>{
                    if(arr) reject(arr);
                    resolve();
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'), 
                'utf-8', 
                (err, content) => {
                    if (err) reject(err);
                    resolve(JSON.parse(content))
                }
            )
        }
    )}

   static async getById(id) {
        const courses = await Cours.getAll();
        return courses.find(a => a.id === id);
    }

    static async update(cours) {
        const courses = await Cours.getAll();
        const index = courses.findIndex(c => c.id === cours.id);
        courses[index] = cours;
        new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (arr) =>{
                    if(arr) reject(arr);
                    resolve();
                }
            )
        })


    }

    static async delete(cours) {
        const courses = await Cours.getAll();
        const index = courses.findIndex(c => c.id === cours.id);
        const before = courses.slice(0, index);
        const after = courses.slice(index + 1, courses.length);
        const newArr = [...before, ...after];

        new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(newArr),
                (arr) =>{
                    if(arr) reject(arr);
                    resolve();
                }
            )
        })


    }

}




module.exports = Cours;