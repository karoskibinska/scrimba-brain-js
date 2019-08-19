var brain = require("brain.js");
const rawData = require("./raw-data.json");

// rawData = [{ open: number, high: number, low: number, close: number }]

function scaleDown(step) { //normalize
  return {
    open: step.open / 138,
    high: step.high / 138,
    low: step.low / 138,
    close: step.close / 138
  };
}

// console.log(scaleDown(rawData[0]));

function scaleUp(step) { //denormalize
    return {
        open: step.open * 138,
        high: step.high * 138,
        low: step.low * 138,
        close: step.close * 138
    };
}

// console.log(scaleDown(scaleUp(rawData[0])));

const scaledData = rawData.map(scaleDown);

const trainData = [
    scaledData.slice(0,5),
    scaledData.slice(5,10),
    scaledData.slice(10,15),
];

// console.log(trainData);

const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 4,
    hiddenLayers: [8,8],
    outputSize: 4
});

net.train(trainData, {
    learningRate: 0.005,
    errorThresh: 0.02,
    // log: (stats) => console.log(stats)
});

net.train(trainData);
// console.log(scaleUp(net.run(trainData[0])));

console.log(net.forecast([
    trainData[0][0],
    trainData[0][1],
], 3).map(scaleUp));
