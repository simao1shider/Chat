﻿var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("send").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt").replace(/>/g, "&gt;");
    var encodedMsg = user + ": " + msg;
    var li = document.createElement("li");
    li.className = "alert alert-primary";
    li.textContent = encodedMsg;
    var nomeU = document.getElementById("nomeU").value;
    document.getElementById("mensagensLista").append(li); 
});

connection.start().then(function () {
    document.getElementById("send").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("send").addEventListener("click", function (event) {
    var user = document.getElementById("user").value;
    var message = document.getElementById("msg").value;
    
    nomeU.textContent = user;
    document.getElementById("user").disabled = true;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});