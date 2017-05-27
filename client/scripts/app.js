// YOUR CODE HERE:




var app = {

  friendList: {},

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
        console.log(data, "- what the data looks like coming back");
        console.log('chatterbox: Message sent');
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
        console.log(data, "- what the data looks like coming back");
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
    var messageToRender = '<div class="username"><span>'+ message.username +'</span><p>' + message.text +'</p></div>';
    $('#chats').append(messageToRender).on('click', function() {
  // var friend = $(this).find('span').text();
  // app.friendList[friend] = friend;
     app.handleUsernameClick.call(this);
     });
  },
  
  renderRoom: function(string) {
    var room = '<div id="room">' + string + '</div>';
    $('#roomSelect').append(room);
  },

  handleUsernameClick: function() {
   
    //  this.click(function(){
    //    alert("yay!");
    //  })
    // //access the user from the message and do something 
    // (message).on('click', 'username', function() {
    //   var user = message.username;
    //   console.log("added click to this user");
    // });
    console.log("the this context", this);
    var friend = $(this).find('span').text();
    console.log("this should be the html node", friend);
    app.friendList[friend] = friend;
    console.log("the updated friendslist", app.friendList);
  }
};

// A $( document ).ready() block.
$(document ).ready(function() {

  $('.username').on('click', function() {
  // var friend = $(this).find('span').text();
  // app.friendList[friend] = friend;
   (console.log(this, "the context inside the ready function on click"))
   app.handleUsernameClick.call(this);
   alert("clicked");
  });
});
   




