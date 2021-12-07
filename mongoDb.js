const MongoClient = require('mongodb').MongoClient

var coll, cursor;

MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('lecturersDB')
        coll = db.collection('lecturers')
    })
    .catch((error) => {
        console.log(error.message)
    })


    function getLecturers(){
        return new Promise((resolve, reject)=>{
           cursor = coll.find()
           cursor.toArray()
           .then((data)=>{
                resolve(data)
           })
           .catch((error)=>{
                reject(error)
           })
        })
    }

    function addLecturer(){
        return new Promise((resolve, reject)=>{
            
        })
    }

module.exports = {getLecturers, addLecturer}