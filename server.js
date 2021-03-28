const express = require('express');
const app = express();

// Socket.io@2.3.0 써야함.
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true}));
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const { Socket } = require('dgram');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

var db;
MongoClient.connect("?", {useUnifiedTopology: true}, (error, client)=>{
  if(error){
    return console.log(error);
  }
  db = client.db('todoapp');
  console.log('MongoDB 연결됨.')
});

http.listen(8080, ()=>{
  console.log('8080포트로 서버 ON.');
})

app.get('/', (req, res)=>{
  res.render('home.ejs');
})

app.get('/chat', (req, res)=>{
  res.render('chat.ejs')
})

io.on('connection', (socket)=>{
  console.log('Socket.io 연결됨.');

  socket.on('dugo', (data)=>{
    console.log(data);
    io.emit('퍼트리기', data);
  })
});
