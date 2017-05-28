// YOUR CODE HERE:

window.godObject = [];

var app = {

  friendList: {},

//this should have all of the rooms from the godObject
  roomData: [],

  defaultRoom: [],

  currentRoom: [],

  server: "http://parse.sfm8.hackreactor.com/chatterbox/classes/messages",

  init: function() {
    return true;
  },

  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        // var result = data.results;
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(data) {
    $.ajax({
      url: this.server,
      type: 'GET',
      // data: undefined,
      contentType: 'application/json',

      success: function (data) {
        var result = data.results;
        window.godObject.push(result);
        result.forEach(function(obj) {
          // console.log(obj.roomname);
             // app.defaultRoom.push(obj);
          app.renderRoom(obj.roomname);
          app.renderMessage(obj);
        });
        
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').children().remove();
  },
  
  renderMessage: function(message) {
    var messageToRender = '<div class="username">username<span class="test">' + message.username + '</span><p>text-' + message.text + '</p></div>';
    $('#chats').append(messageToRender);

    // $('.username').on('click', function() {
    //   app.handleUsernameClick.call(this);
    //   // alert("clicked");
    // });
    

  //   $('#chats').append(messageToRender)
  //.on('click', function() {
  // // var friend = $(this).find('span').text();
  // // app.friendList[friend] = friend;
  //     app.handleUsernameClick.call(this);
  //   });

  },
  
//   renderRoomOptions: function(string) {
// // this function go through every object from the server and show the roomname.
    
//   },

  createNewRoom: function(newRoom) {
    app.roomData.push(newRoom);
    // app.currentRoom = newRoom;
    var room = '<option class="room">' + newRoom + '</option>';

    $('#roomSelect').append(room);
    $('select').change(function() {
      app.jumpToRoom();
    });

  },

  renderRoom: function(chosenRoom) {
    window.godObject.forEach(function(obj) {
      if (obj.roomname === chosenRoom) {
        app.currentRoom.push(obj);
      }
    });

    app.currentRoom.forEach(function(room) {
      // app.renderMessage(room);
    });

//once we have all the data ^
//loop through the data
//create a new html element for every obj in the data (appendTO whatever);
    
  },

  handleUsernameClick: function(user) {
    // console.log("the this context", this);
    // var friend = $(this).find('span').text();
    // console.log("this should be the html node", friend);
    app.friendList[user] = user;
    console.log(app.friendList);
    
    // for (var friend in app.friendList) {
    $('#friends-list').append('<span>' + user + '</span>');
    // }
    // console.log("the updated friendslist", app.friendList);
  },

  jumpToRoom: function() {
    app.clearMessages();
    
    //TBD
    //$('select').change(function () {
     // var optionSelected = $(this).find("option:selected");
     // var valueSelected  = optionSelected.val();
     // var textSelected   = optionSelected.text();
    //});
  }
  
};

// A $( document ).ready() block.
$(document).ready(function() {
  var newRoom;
  app.fetch();

  $('.addroom').on('click', function() {
    newRoom = prompt('Enter your new room name');
    app.createNewRoom.call(this, newRoom);
  });

  $('.sendmsg').on('click', function() {
    var username = newRoom;
    var messageValue = $('.messagebox').val();
    var roomname = 'bestroomever';
    sendMsg(username, messageValue, roomname);
  });

  $('#chats').click('.username', function(event) {
    console.log('event', event.target.innerHTML);

    // var friend = $(this).find('span').text();
    // app.friendList[friend] = friend;
    app.handleUsernameClick(event.target.innerHTML);
    
  });

  // $('.room').onchange(function() {
  //   app.jumpToRoom();
  // });

  var sendMsg = function(username, text, roomname) {
    var obj = {};
    obj.username = username;
    obj.text = text;
    obj.roomname = roomname; 
    app.send(obj);
    // app.fetch();
  };
});



   




