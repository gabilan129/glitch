import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routers/view.router.js"
import { Server } from "socket.io"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")


app.use(express.static(__dirname+"/public"))



const httpServer = app.listen(PORT,()=>{console.log("server run en puerto  "+ PORT)})

app.use("/",viewsRouter)


//instanciamos socket

const socketServer = new Server(httpServer)

let mensajesArray = []

//abrimos el canal de comunicacion
//esto es el codigo pabre del cliente
socketServer.on("connection",socket =>{
    socket.on("mensaje",data =>{
        mensajesArray.push(data)
        

        // socket.emit("mensajeLogs",mensajesArray) // esto no es funcional
        
        // socket.broadcast.emit("mensajeLogs",mensajesArray)
        socketServer.emit("mensajeLogs",mensajesArray)

    })

    socket.on("userConnected",data=>{
        socket.broadcast.emit("userConnected",data)
    })
    
    //socket.disconect
    socket.on("closeChat",data =>{
        if(data.close==="close")
        socket.disconnect()
    })
})

