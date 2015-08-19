#!/usr/bin/env node

var rget = require('rget-jsftp');
var inquirer = require('inquirer');
var questions = [
  {type: 'input', name: 'host', message: 'host', default: 'localhost' },
  {type: 'input', name: 'port', message: 'port', default: 21 },
  {type: 'input', name: 'username', message: 'username' },
  {type: 'input', name: 'password', message: 'password' },
  {type: 'input', name: 'path', message: 'path', default: '/' }
];

inquirer.prompt(questions, main);

function main (answers) {
  var rgetClient = rget.RGet({
      'host': answers.host,
      'port': answers.port,
      'username': answers.username,
      'password': answers.password
  });

  var ctx = rgetClient.generateDownloadContext(answers.path, './');

  rgetClient.download(ctx);

  ctx.on('finished', finishedDownload);

  function finishedDownload() {
    console.log('finished Download');
  }
}
