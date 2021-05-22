const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs({
    extname: "handlebars",
    defaultLayout: "",
    layoutsDir: "",
}));
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact', {layout: false});
});

app.post('/send', (req, res) => {
  const output = `
    <p>Замовлення журналу KANVA 1 випуск</p>
    <h3>Контактні дані:</h3>
    <ul>  
      <li>Прізвище та ім‘я: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Телефон: ${req.body.phone}</li>
      <li>Загальна ціна: ${req.body.total}</li>
    </ul>
    <h3>Доставка на:</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({

    pool: true,

    service: 'Gmail',
    secure: false,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL, // generated ethereal user
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'sdfgsdfgsdfg sdfgsdfg', // sender address
      to: 'kanvaif2020@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(process.env.PORT, () => console.log('Server started...'));
