var restify = require('restify');
var builder = require('botbuilder');
var credentials = require('./credentials.js')
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8888, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: credentials.userId,
    appPassword: credentials.userPassword
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
	function (session) {
 		builder.Prompts.text(session, "Hello! What's your name?");
	},
	function (session, results) {
		session.send('Hello %s!', results.response);
	}
]);