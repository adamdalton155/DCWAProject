
const mySql = require('promise-mysql')
var pool

function listModules(){
    return new Promise((resolve, rejected)=>{
        pool.query('select * from module;')
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            rejected(error)
        })

    })

}

function updateModules(mid){
    return new Promise((resolve, rejected)=>{
        var myQuery = {
            sql: ' update module set name = ?, credits = ? where mid=?;',
            values: [mid]
        }
        pool.query(myQuery)
            .then((data)=>{
                resolve(data)
            })
            .catch((error)=>{
                rejected(error)
            })
        })
}

function studentsModule(mid){
    return new Promise((resolve, rejected)=>{
        var myQuery = {
            sql: 'select s.sid, s.name, s.gpa from student s left join student_module m on s.sid = m.sid where m.mid = ?;',
            values:[mid]
        }
        pool.query(myQuery)
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            rejected(error)
        })
    })
}

function listStudents(){
    return new Promise((resolve, rejected)=>{
        pool.query('select * from student;')
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            rejected(error)
        })

    })

}

function deleteStudent(sid){
    return new Promise((resolve, rejected)=>{
        var myQuery = {
            sql: 'delete from student where sid = ?',
            values:[sid]
        }
        pool.query(myQuery)
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            rejected(error)
        })
    })
}

 var addStudent = function(sid, name, gpa){
    return new Promise((resolve, rejected)=>{
        var myQuery = {
            sql: 'insert into student values ?, ?, ?;',
            values:[sid, name, gpa]
        }

        pool.query(myQuery)
        .then((data)=>{
            resolve(data)
        })
        .catch((error)=>{
            rejected(error)
        })
    })
}


mySql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collegeDB'
})
    .then(p => {
        pool = p
    })
    .catch(e => {
        console.log("pool error:" + e)
    })

module.exports = {listModules, updateModules, studentsModule, listStudents, deleteStudent, addStudent}