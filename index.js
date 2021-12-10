const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs')
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const { body, validationResult, check } = require('express-validator')

var moduleDatabase = require('./database')
var mongoDB = require('./mongoDb')

//Homepage. Gives user the option to either List Students, Modules or lecturers
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/linkToPages.html")
})

//Lists all of the modules for the college
app.get('/listModules', (req, res) => [
  moduleDatabase.listModules()
    .then((data) => {
      res.render('listModules', { module: data })
    })
    .catch((error) => {
      res.send(error)
    })
])

//List all of the students in a course grouped by Module
app.get('/moduleStudents/:mid', (req, res) => {
  moduleDatabase.studentsModule(req.params.mid)
    .then((data) => {
      res.render('listModuleStudents', { studentModule: data })
    })
    .catch((error) => {
      res.send(error)
    })
})

//List of all of the students
app.get('/listStudents/', (req, res) => {
  moduleDatabase.listStudents()
    .then((data) => {
      res.render('listStudents', { studentList: data })
    })
    .catch((error) => {
      res.send(error)
    })
})

//Delete a student from students list
app.get('/listStudents/delete/:sid', (req, res) => {
  moduleDatabase.deleteStudent(req.params.sid)
    .then((data) => {
      res.send(req.params.sid + ' deleted successfully')
    })
    .catch((error) => {
      if (error.code = 1451) {
        res.send("<h1>ERROR</h1><br>" + req.params.sid + ' has associated modules he/she cannot be deleted')
      } else {
        res.send(error)
      }
    })

})

//Displays GUI for adding a student to the students list
app.get('/addStudent', (req, res) => {
  res.render('addStudent', { errors: undefined, sid: "", name: "", gpa: "" })
})

//Add a student to the students table
app.post('/addStudent',(req, res) => {
  moduleDatabase.addStudent(req.body.sid, req.body.name, req.body.gpa)
    .then((data)=>{
      res.redirect('listStudents')
    })
    .catch((error)=>{
      res.send('error')
    })
    
  })
//Gets a list of lecturers
app.get('/listLecturers', (req, res) => {
  mongoDB.getLecturers()
    .then((data) => {
      res.render('listLecturers', { lecturerstList: data })
    })
    .catch(() => {
      res.send('error')
    })
})

//Displayes the GUI for adding a lecturer
app.get('/addLecturer', (req, res) => {
  res.render(__dirname + "/views/addLecturers.ejs")
})

//Function to add a lecturer to the lectuers list
app.post('/addLecturer', (req, res) => {
  mongoDB.addLecturer(req.body._id, req.body.name, req.body.dept)
    .then((data) => {
      res.redirect('/listLecturers')
    })
    .catch((error) => {
      if (error.code == 11000) {
        res.send("ERROR: Employee " + req.body._id + " ALREADY EXISTS")
      } else {
        res.send(error)
      }

    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})