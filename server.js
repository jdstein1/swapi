/* server.js */

const express = require('express')
const path = require('path')
const app = express()

console.log('__dirname: ', __dirname)

// app.use(express.static('src'))
app.use(express.static(__dirname + '/src'))
// app.use('/public', express.static(__dirname + 'src'))
// app.use('/', express.static(path.join(__dirname, 'src')))

app.listen(1138, function () {
  console.log('ready port 1138!')
})
