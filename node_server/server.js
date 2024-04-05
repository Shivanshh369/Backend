const http = require('http')
// import http from 'http'

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('<h1>Hello Backedn</h1>')
})

server.listen(3000, ()=>{
    console.log(`Server is up and running http://localhost:3000`);
})