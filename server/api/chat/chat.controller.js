'use strict';

const Chat = require('./chat.model');

exports.all = function(req, res) {
  Chat.find(function(err, codes) {
    if (err) {
      res.send(err);
    }
    res.json(codes);
  });
};

exports.save = function(req, res) {
  console.log(req.body);
  const chat = new Chat(req.body);

  chat.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json('Created new ChatMessage');
  });
};
