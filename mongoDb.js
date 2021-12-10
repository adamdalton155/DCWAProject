const MongoClient = require('mongodb').MongoClient

var coll, cursor;

//Connect to the MongoDB server
MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        db = client.db('lecturersDB')
        coll = db.collection('lecturers')
    })
    .catch((error) => {
        console.log(error.message)
    })

//Function to get the lecturers from the Lecturers MongoDB collection 
function getLecturers() {
    return new Promise((resolve, reject) => {
        cursor = coll.find()
        cursor.toArray()
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Function to add a Lecturer to the MongoDB lecturers list
function addLecturer(_id, name, dept) {
    return new Promise((resolve, reject) => {
        coll.insertOne({})
        coll.insertOne({ _id: _id, name: name, dept: dept })
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Export the functions so they can be used on the index
module.exports = { getLecturers, addLecturer }