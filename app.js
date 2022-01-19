const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT||3000;
//yes
app.use(express.static(__dirname+"/views/"))

app.get('/', (request, response)=>{
    response.sendFile(__dirname+"/views/index.html")
})

/*app.get('/highscores', (request, response)=>{
    response.sendFile(__dirname+"/views/highscores.html")
})*/

app.listen(port, ()=>{
    console.log(`Connected to port ${port}`)
})