'use strict';
const TaskMatic = require('./../libs/taskmatic');
const fs = require('fs');
const moment = require('moment');
const config = require('./../config.js');
const nodemailer = require('nodemailer');
const smtpConfig = config.get('smtpConfig');
const mkdirp = require('mkdirp');

const emailTransporter = nodemailer.createTransport(smtpConfig);

const sendEmail = function() {
    const mailOptions = {
        from: 'nvalluri@ominto.com', 
        to: 'nvalluri@ominto.com', 
        subject: 'Hello ', 
        html: '<b>Hello world </b>' 
    };
    emailTransporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    
}

function generateAndSendEmail(data) {
    const transformedData = [];
    data.forEach((item) => {
      item.lastErrorTruc = item.lastError && item.lastError.substring(0, 40);
      item.lastEnd = moment(item.lastEnd).fromNow();
      item.next = moment(item.next).fromNow();
      transformedData.push(item)
    });
    const date = moment().format().split('T')[0];
    const filePath = config.get('path_data') + '/data-'+ date +'.js';
    const dataContent = "var data = " + JSON.stringify(transformedData);
    mkdirp.sync(config.get('path_data'));
    fs.writeFileSync(filePath, dataContent, 'utf-8'); 
    //sendEmail();
    return dataContent;
  
}

module.exports.generate = function * generate(next) {
  const tasker = new TaskMatic({
    dbPath: config.get('task_db_path')
  });

  this.body = yield tasker.report().then(generateAndSendEmail);
}