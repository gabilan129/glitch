
const socket = io()

let user;

const chatbox = document.getElementById("chatBox")


Swal.fire({

    icon:"info",
    title:"identificate",
    input:"text",
    text:"ingrese el username para identificarse en el chat"
    , inputValidator: (value) => {
        if(!value){
            return "necesitas escribir tu nombre"

        }else{
            socket.emit("userConnected",{user:user})

        }
    },
    allowOutsideClick: false

}).then(result => {
    user = result.value
    
    //cargamos nombre del usuario en el navegador

    const myName = document.getElementById("myName")
    myName.innerHTML = user
})



//guardar mensaje por usuario y mostrarlo en nuestro log


chatbox.addEventListener("keyup",evt =>{
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length > 0){
            socket.emit("mensaje",{user: user,mensaje:chatbox.value})
            chatbox.value =""
        }
    }
})


socket.on("mensajeLogs",data =>{
    let logs;
    data.forEach(log =>{
    const mensajeLogs = document.getElementById("mensajeLogs")
        logs +=`${log.user} dice: ${log.mensaje}<br/>`

})
mensajeLogs.innerHTML=logs
})


socket.on("userConnected",data =>{
let mensaje =`"nuevo usuario conectado ${data}`
Swal.fire({
    icon:"info",
    title:"Nuevo usuario en el chat",
    text:mensaje,
    toast:true
})
})

const closeChatBox = document.getElementById("closeChatBox")
closeChatBox.addEventListener("click",evt =>{
    socket.emit("closeChat",{close:"close"})
    mensajeLogs.innerHTML=""
})