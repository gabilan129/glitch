//configuracion del sockter del lado del cliente

const socket = io()

socket.emit("mensajeKey","hola desde el cliente")

socket.on("msg_02",data =>{
    console.log(data)
})

socket.on("evento_para_todos_exepto_socket_actual",data =>{console.log(data)})

socket.on("evento_para_todos",data =>{
    console.log(data)
})