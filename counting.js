var brain = require("brain.js");

//count 1-5
const trainingData = [
  [1,2,3,4,5],
  [5,4,3,2,1]
];

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData, { log: (status) => console.log(status) });
console.log(net.run([1,2,3,4]));

//count 5-1
console.log(net.run([5,4,3,2]));

//count 5-10
const newTrainingData = [
  [5,6,7,8,9,10]
];

net.train(newTrainingData);
console.log(net.run([5,6,7,8]));
