const express = require('express');
const logger = require('morgan');//пакет для логирование который выводит в консоль сообшение куда пошел запрос и какой ответ отправлен
const cors = require('cors');

require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';//если мы запустили в дев режиме то подробное а если продакшн то короткие сообщение 

app.use(logger(formatsLogger));//выводит в подродном режиме 
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error!" } = err;
  res.status(status).json({ message })
});

module.exports = app;


