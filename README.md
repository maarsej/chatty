# Chatty APP 
## By: Jacob Maarse

Real time web chat application built primarily through the use of react and websockets! The final product was built upon mostly premade html and css. This original layout was converted to work in combination with react in order to live render new messages. Multiple users are supported with a basic websocket server that tracks how many connections there are (displayed in the top right) as well as assigns each connection 1 of 4 colors. The messages themselves consist of user inputted text or images (valid jpg, gif, or png files) as well as system messages that let users know when someone has changed their name. 

### Prerequisites

All prerequisite software except Node.js is included in the two package.json's provided. Simply 'npm install' on both the server and the app before attempting to run the program.

### Getting Started

Upon cloning this respository simply change your directory to the project folder 'chatty' and run chattyApp/server.js and chatty_server/server.js in node. Then navigate to http://localhost:3000/ in your browser.

### Final Product

A brief look at the page:
#### The Chat
!["Screenshot of the chat view"](https://github.com/maarsej/chatty/blob/master/docs/Screen%20Shot%202018-04-17%20at%202.18.18%20PM.png?raw=true)

