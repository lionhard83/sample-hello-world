var express = require('express');
var app = express();
var credit = 100;
var extract = function(){
  return parseInt(Math.random()*37)
}

app.get('/evenOdd/:myChoice/:myNumber', function (req, res) {
  var computerNumber = parseInt(Math.random()*6);
  var isEven = (computerNumber + parseInt(req.params.myNumber))%2 ===0;
  if ((isEven && req.params.myChoice === 'even') || (!isEven && req.params.myChoice === 'odd')) {
      return res.json({
        computerNumber: computerNumber,
        message:'you win'
      });
  }
  return res.json({
    computerNumber: computerNumber,
    message:'you lose'
  });
});

app.get('/paperScissRock/:myChoice', function (req, res) {
    var random = Math.random();
    var computerChoice;
    if (random < 0.3333) {
      computerChoice = "paper";
    } else if (random < 0.6666) {
      computerChoice = "rock";
    } else {
      computerChoice = "sciss";
    }
    if (req.params.myChoice === computerChoice) {
      return res.json({
        computerChoice: computerChoice,
        result: 0
      });
    } else if (
      (req.params.myChoice === "rock" && computerChoice === "sciss")
      || (req.params.myChoice === "sciss" && computerChoice === "paper")
      || (req.params.myChoice === "paper" && computerChoice === "rock")
    ) {
      return res.json({
        computerChoice: computerChoice,
        result: 1
      });
    } else {
      return res.json({
        computerChoice: computerChoice,
        result: -1
      });
    }
});

app.get('/roulette', function (req, res) {
  var extractNumber = extract();
  if (req.query.numbers) {
    var numbers = req.query.numbers.split(',');
    for(i in numbers) {
      numbers[i] = parseInt(numbers[i]);
    }
    if (numbers.includes(extractNumber)){
      credit += 36 - (numbers.length - 1);
      return res.json({
        extractNumber: extractNumber,
        credit: credit
      });
    }
    credit -= numbers.length;

  }
  return res.json({
    extractNumber: extractNumber,
    credit: credit
  });
});

app.listen(3001);
module.exports = app;
