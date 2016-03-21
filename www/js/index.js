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
var usersRef = database.child("users");
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
    var user = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
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
    usersRef.child(user).set({
      username: user,
      university: university,
      email: email
    });
}
function login(){
    var email = document.getElementById('emailLogin').value;
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
        retrieveUserInfo();
      }
    });
}
function retrieveUserInfo(){
    /*
    usersRef.child("users/Adtiv/username").on("value", function(snapshot) {
      alert(snapshot.val());  // Alerts "San Francisco"
      document.getElementById('accountUser').innerHTML = snapshot.val();
    });
*/

}