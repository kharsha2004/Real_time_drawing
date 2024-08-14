const express = require("express");//getting the accesses
const socket = require("socket.io");
const app=express();//initializing the server ready app is like the reference and doing above initializes the server and makes it ready
app.use(express.static("public"));
//let port=7000;
let port = process.env.PORT || 3000;
//how socket.io works is firstly we connect the servers to devices and then socket is already initialized in server whatever the data is recieved from connected devices this socket will catch the data and then transfers it to all the connected devices
let server=app.listen(port,()=>{
    console.log("Listening to port"+port);
})
//here what happens is that our application first starts listening to that port and then when we enter the url of the webpage then the connection gets established and then the express will go into the public folder and renders the index.html
//on running node app.js server starts listening and then through the cdn we conect the frontend to socket

//the moment we type our webpage url then the connection with socket will happen as the server already started lisstening to the port from the moment we run node app.js


//BETTER SEE IN CHATGPT IF NOT UNDERSTAND

//just to show as a prototype for multiple computers connected what we can do is to open the same localhost:5000 in multiple newtabs

//assume there is a server to which multiple computers including ours are connected now the way socket works is we will send our data to socket in server{socket is already initialized in server} and the socket in the server will pass this data to all its connected components incuding to our computer 

//to connect with server we accomplish it thrugh frontend 
//copy the script tag from socket.io cdn into frontend i.e index.html
//io is the instance of socket.io at the server side that manages the websockets
let io=socket(server);
io.on("connection", (socket) => {
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})

//this is an event listener that lets us know when ever we connect through frontend we will know it here

//now we have to transfer data to and fro the connection part is in notion

//now what our aim is that suppose if we are drawing on one device that is here one tab then the data should reach server and then the socket which is already initialized inserver should send the same data to all its connected devices


//socket.emit in mousedown will send the begin path data to the server,, now to recieve this data we will have to add a event listener in app.js now the callback linked with this will be triggered and now what happens inside this callback is that this data will be sent to all the connected devices through the socket 

//now here the present tab will also recieve the data sent by server {sends to all connected devices even to the one from which recieves} so now we have to add a listener in canvas.js in which the data represents the data recieved from server
//now we will again call the beginpath in our canvas js with the data recieved from server
//now the same will be done for undo redo and draw stroke