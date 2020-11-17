const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const { urlencoded } = require('express')
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = [
    {name: "Juan", age: 12, gender: "M"},
    {name: "Felipe", age: 12, gender: "M"},
    {name: "Antonio", age: 22, gender: "M"},
    {name: "Camilo", age: 42, gender: "M"},
    {name: "Andrés", age: 58, gender: "M"}
]

const books = [
    {name: "The mistery of Miss Tree and Mr E", pages: 250, id: 1},
    {name: "Una muchacha llamada Lil", pages: 115, id: 2},
    {name: "El general en su laberinto", pages: 120, id: 3},
    {name: "Así hablaba Zaratustra", pages: 100, id: 4},
    {name: "Cartas de una monja enamorada", pages: 456, id: 5}
]


//Obtener lista de usuarios
app.get('/users', (req, res) => {
  res.send(users)
})

//Muestra un usuario dependiendo su id
app.get('/show-user/:id', (req, res) => {
  console.log("Su nombre es:" + users[req.params.id].name)
  console.log("Su edad es:" + users[req.params.id].age)
  console.log("Su genero es:"+ users[req.params.id].gender)
  res.send(users[req.params.id])
})


//Elimina un usuario
app.get('/delete-user', (req, res) => {
  let name = users[req.query.id].name
  users.splice(req.query.id,1)
  res.send("Usuario "+ name +" en la posicion "+req.query.id+" eliminado con exito")
})

//Añade un usuario a la lista
app.post('/create-user', upload.array(), function (req, res, next) {
  users.push(req.body)
  console.log(req.body)
  res.json(req.body)
})

// Obtener lista de libros

app.get('/books', (req, res) => {
  res.send(books)
})

// Añadir un libro a la lista

app.post('/books/add', (req, res) => {
    const book = req.body
    books.push(book)
    res.send('Libro añadido con éxito');
})

// Eliminar un libro de la lista por su posición del array

app.delete('/books/delete/:id', (req, res) => {
    books.splice(req.params.id, 1)
    res.send("Libro eliminado")
})

// Actualiza un libro de la lista 

app.put('/books/update/:id', (req, res) =>{
    let book = books[req.params.id]
    if(book){
        book = books[req.params.id] = req.body
        res.send("Actualizado");
    }
})

app.get('/', (req, res) => {
    res.send("Utiliza los comandos /books o /users, para entrar en alguna lista")
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})