const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const { urlencoded } = require('express')
const upload = multer() // for parsing multipart/form-data

var users = []


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**En esta funcion se muestran los datos almacenados dentro de la lista de usuarios */
app.get('/', (req, res) => {
  res.send(users)
})

//Request por parametros
/**En esta funcion se espera recibir la posicion en la lista del usuario que se desea obtener la informacion */
app.get('/show-user/:id', (req, res) => {
  console.log("Su nombre es:" + users[req.params.id].name)
  console.log("Su edad es:" + users[req.params.id].age)
  console.log("Su genero es:"+ users[req.params.id].gender)
  res.send(users[req.params.id])
})

//Request por query string
/**En esta funcion se espera recibir la posicion en la lista del usuario a eliminar  */
app.get('/delete-user', (req, res) => {
  let name = users[req.query.id].name
  users.splice(req.query.id,1)
  res.send("Usuario "+ name +" en la posicion "+req.query.id+" eliminado con exito")
})

//Request por body
/** En esta funcion se espera recibir toda la informacion del usuario a agregar, se espera como minimo el nombre, la edad y el genero */
app.post('/create-user', upload.array(), function (req, res, next) {
  users.push(req.body)
  console.log(req.body)
  res.json(req.body)
})

app.get('/', (req, res) => {
  res.send('Hola mundo!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})