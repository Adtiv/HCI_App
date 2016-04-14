/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var database = new Firebase('https://campusbuyersclub.firebaseio.com/');
var users = database.child("users");
var textbooks;
var tickets;
var housingParking;
var furniture;
var transportation;
var email;
var dbUniversity;
var userUniversity;
var currentUser;
var pictureSource;
var destinationType;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function initialize(){
    database.once("value", function(snapshot) {
        userUniversity=localStorage.getItem('userUniversity');  
        console.log(userUniversity);
        var posts = snapshot.child(userUniversity);
        var x = posts.child('textbooks');
        x.forEach(function(childSnapshot) {
            var title =childSnapshot.child("title").val();
            var price = childSnapshot.child("price").val();
            
            var list = document.getElementById('textBookList');
            var entry = document.createElement('li');
            var link = document.createElement('a');
            var div = document.createElement('div');
            var img =document.createElement('img');
            var p =document.createElement('p');
            link.href="#buyPage";
            img.src="img/book.jpg";
            img.style.width="100px";
            img.style.height="100px";
            div.style.textAlign ="center";
            div.innerHTML=title;
            p.innerHTML=price;
            list.appendChild(entry);
            entry.appendChild(link);
            link.appendChild(img);
            link.appendChild(div);
            div.appendChild(p);
      });
    });
    $('#textBookList').listview('refresh');
}
function sellCategory(){
    if($("#sellCategories input[type='radio']:checked").val()=='textbooks'){
        document.getElementById("sellNext").href="#sellTextbooks";
    }
    else if($("#sellCategories input[type='radio']:checked").val()=='tickets'){
        document.getElementById("sellNext").href="#sellTickets";
    }
    else if($("#sellCategories input[type='radio']:checked").val()=='housing'){
        document.getElementById("sellNext").href="#sellHousing";
    }
    else if($("#sellCategories input[type='radio']:checked").val()=='furniture'){
        document.getElementById("sellNext").href="#sellFurniture";
    }
    else{
        document.getElementById("sellNext").href="#sellTransportation";        
    }
};
var optionsOpenTextbooks=false;
var optionsOpenTickets=false;
var optionsOpenHousing=false;
var optionsOpenFurniture=false;
var optionsOpenTransportation=false;
function openOptions(filterOptionsid){
    var optionDiv = document.getElementById(filterOptionsid);
    if(optionDiv.id=='filterOptionsTextbooks'){
        var arrow = document.getElementById('arrowDtextbooks');     
        if(optionsOpenTextbooks==false){
            arrow.style.visibility='invisible'
            arrow.style.display='none';
            optionDiv.style.visibility='visible';
            optionDiv.style.display='inline';
            optionsOpenTextbooks=true;
        }
        else{
            optionsOpenTextbooks=false;
            arrow.style.visibility='visible';
            arrow.style.display='inline';
            optionDiv.style.visibility='invisible';
            optionDiv.style.display='none';
        }   
    }
    else if(optionDiv.id=='filterOptionsTickets'){
        var arrow = document.getElementById('arrowDtickets');   
        if(optionsOpenTickets==false){
            arrow.style.visibility='invisible'
            arrow.style.display='none';
            optionDiv.style.visibility='visible';
            optionDiv.style.display='inline';
            optionsOpenTickets=true;
        }
        else{
            optionsOpenTickets=false;
            arrow.style.visibility='visible';
            arrow.style.display='inline';
            optionDiv.style.visibility='invisible';
            optionDiv.style.display='none';
        } 
    }
    else if(optionDiv.id=='filterOptionsHousing'){
        var arrow = document.getElementById('arrowDhousing');        
        if(optionsOpenHousing==false){
            arrow.style.visibility='invisible'
            arrow.style.display='none';
            optionDiv.style.visibility='visible';
            optionDiv.style.display='inline';
            optionsOpenHousing=true;
        }
        else{
            optionsOpenHousing=false;
            arrow.style.visibility='visible';
            arrow.style.display='inline';
            optionDiv.style.visibility='invisible';
            optionDiv.style.display='none';
        }    
    }
    else if(optionDiv.id=='filterOptionsFurniture'){
        var arrow = document.getElementById('arrowDfurniture');        
        if(optionsOpenFurniture==false){
            arrow.style.visibility='invisible'
            arrow.style.display='none';
            optionDiv.style.visibility='visible';
            optionDiv.style.display='inline';
            optionsOpenFurniture=true;
        }
        else{
            optionsOpenFurniture=false;
            arrow.style.visibility='visible';
            arrow.style.display='inline';
            optionDiv.style.visibility='invisible';
            optionDiv.style.display='none';
        }    
    }
    else if(optionDiv.id=='filterOptionsTransportation'){
        var arrow = document.getElementById('arrowDtransportation');        
        if(optionsOpenTransportation==false){
            arrow.style.visibility='invisible'
            arrow.style.display='none';
            optionDiv.style.visibility='visible';
            optionDiv.style.display='inline';
            optionsOpenTransportation=true;
        }
        else{
            optionsOpenTransportation=false;
            arrow.style.visibility='visible';
            arrow.style.display='inline';
            optionDiv.style.visibility='invisible';
            optionDiv.style.display='none';
        } 
    }
}
function createUser(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    email = document.getElementById('email').value;
    var emailCharArray=email.split('');
    var userID=createUserIDfromEmail(emailCharArray);
    currentUser=userID;
    var university = document.getElementById('university').value;
    database.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
    users.child(userID).set({
      username: username,
      university: university,
      email: email
    });
    
    retrieveUserInfo(userID);

}
function createUserIDfromEmail(emailArray){
    var emailID=[];
    var i=0;
    while(emailArray[i]!='@'){
        emailID.push(emailArray[i]);
        i++;
    }
    var str = emailID.join("");
    return str;
}
function login(){
    email = document.getElementById('emailLogin').value;
    var emailCharArray=email.split('');
    var userID=createUserIDfromEmail(emailCharArray);
    currentUser=userID;
    var password = document.getElementById('passwordLogin').value;
    database.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $.mobile.changePage( "#mainPage", { transition: "fade"} );
        retrieveUserInfo(userID);
      }
    });
    initialize();
}
function retrieveUserInfo(userID){
    var getUser = userID+"/username";
    var getUniversity= userID+"/university"; 
    users.child(getUser).on("value", function(snapshot) {
        document.getElementById('accountUser').innerHTML = "Hello " + snapshot.val();
    });
    users.child(getUniversity).on("value", function(snapshot) {
        userUniversity=snapshot.val();
        localStorage.setItem('userUniversity',userUniversity);
    });
}
function postItem(item){
    var title,description,price, textbookImage;
    dbUniversity = database.child(userUniversity);
    if(item=='textbook'){
        textbooks=dbUniversity.child("textbooks");
        title=document.getElementById('textBookTitle').value;
        description = document.getElementById('textBookDescription').value;
        price = document.getElementById('textBookPrice').value;
        textbookImage = document.getElementById('smallImage').src;
        var min=0;
        var max=10000000;
        var x = Math.floor(Math.random() * (max - min)) + min;
        textbookId=currentUser+"_"+x.toString();
        textbooks.child(textbookId).set({
          title: title,
          description: description,
          price: price,
          textbookImage: textbookImage
        });
        var list = document.getElementById('textBookList');
        var entry = document.createElement('li');
        var link = document.createElement('a');
        var div = document.createElement('div');
        var img =document.createElement('img');
        var p =document.createElement('p');
        link.href="#buyPage";
        img.src="img/book.jpg";
        img.style.width="100px";
        img.style.height="100px";
        div.style.textAlign ="center";
        div.innerHTML=title;
        p.innerHTML=price;
        list.appendChild(entry);
        entry.appendChild(link);
        link.appendChild(img);
        link.appendChild(div);
        div.appendChild(p);
        $('#textBookList').listview('refresh');
        textbooks.on("child_added", function(snapshot, prevChildKey) {
          var newPost = snapshot.val();
          console.log("Author: " + newPost.title);
          console.log("Title: " + newPost.description);
          console.log("Previous Post ID: " + prevChildKey);
          
        });
        $.mobile.changePage( "#mainPage", { transition: "fade"} );
    }
    /*
    if(item=='tickets'){
        title=document.getElementById('textBookTitle').value;
        description = document.getElementById('textBookDescription').value;
        price = document.getElementById('textBookPrice').value;
        textbooksRef.child(currentUser).set({
          title: title,
          description: description,
          price: price
        });
        ticketsRef.on("child_added", function(snapshot, prevChildKey) {
          var newPost = snapshot.val();
          console.log("Author: " + newPost.title);
          console.log("Title: " + newPost.description);
          console.log("Previous Post ID: " + prevChildKey);
        });
    }
    */
}
var pictureSource;
var destinationType;

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = "data: image/jpeg;base64," + imageData;
}
function onProfilePhotoDataSuccess(imageData) {
    var profImage = document.getElementById('profImage');
    profImage.style.display = 'block';
    profImage.src = "data: image/jpeg;base64," + imageData;
}
function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
}
function capturePhoto() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50,
        destinationType: destinationType.DATA_URL
    });
    //alert('capturePhoto was called');
}
function captureProfilePhoto() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onProfilePhotoDataSuccess, onFail, {quality: 50,
        destinationType: destinationType.DATA_URL
    });
    //alert('capturePhoto was called');
}

function getPhoto(source) {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
    alert('getPicture was called');
}
function onFail(message) {
    alert('Failed because: ' + message);
}
