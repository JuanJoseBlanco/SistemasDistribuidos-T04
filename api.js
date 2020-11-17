const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const books = [
    {name: "The mistery of Miss Tree and Mr E", pages: 250, id: 1},
    {name: "Una muchacha llamada Lil", pages: 115, id: 2},
    {name: "El general en su laberinto", pages: 120, id: 3},
    {name: "Así hablaba Zaratustra", pages: 100, id: 4},
    {name: "Cartas de una monja enamorada", pages: 456, id: 5},
]

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
    res.send("Utiliza los comandos /books, ... para entrar en alguna lista")
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})