const http = require("http")

const server = http.createServer(function (req,res) {
    if(req.url == '/contact'){
        res.setHeader("Content-type", "multipart/form")
        res.write("<h2>This is Contact Page !!</h2>")
    }

    if(req.url == '/about'){
        res.write("<h1>This is my about page !</h1>")
    }
    res.end()
})

server.listen(3000,"localhost", ()=>{
    console.log(`Server is running...`);
}) 