var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

/* GET users listing. */
router.post('/contact-brian', function(req, res, next) {

	if(req._body){

		// var mailOptions = {
		// 	from: 'brianlandron@gmail.com',
		// 	to: 'brianlandron@gmail.com',
		// 	subject: 'Someone wrote from VCard!',
		// 	text: req.body.name + 'contacted you with a message:<br>' + req.body.message
		// };

		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				res.status(500);
				res.send('Email could not be sent: ' + error);
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
				res.status(200);
				res.send('Email sent: ' + info.response);
			}
		});
	}
});

module.exports = router;
