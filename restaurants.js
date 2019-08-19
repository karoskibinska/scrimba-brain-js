var brain = require("brain.js");

const restaurants = {
    "Brilliant Yellow Corral": "Monday",
    "Penny’s": "Tuesday",
    "Right Coast Wings": "Wednesday",
    "The Delusion Last Railway Car": "Thursday",
    "Fun Day Inn": "Friday",
    "JHOP": "Saturday",
    "Owls": "Sunday"
};

//input: { Mon, Tue ...}
//output: { restaurant1, 2, 3 }

const trainingData = [];

for (let restaurantName in restaurants) {
    const dayOfWeek = restaurants[restaurantName];
    trainingData.push({
        input: { [dayOfWeek]: 1 },
        output: { [restaurantName]: 1}
    });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);
console.log(stats);

// console.log(net.run({ 'Monday': 1}));

function restaurantForDay(dayOfWeek) {
    const result = net.run({ [dayOfWeek]: 1});
    let highestValue = 0;
    let highestRestaurantName = '';
    for (let restaurantName in result) {
        if (result[restaurantName] > highestValue) {
            highestValue = result[restaurantName];
            highestRestaurantName = restaurantName;
        }
    }

    return highestRestaurantName;
}

console.log(restaurantForDay('Friday'));

////////////////////////////////////////////////////////////////////////////////////

const invertedTrainingData = [];

for (let restaurantName in restaurants) {
    const dayOfWeek = restaurants[restaurantName];
    invertedTrainingData.push({
        input: { [restaurantName]: 1},
        output: { [dayOfWeek]: 1 },
    });
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

invertedNet.train(invertedTrainingData);

console.log(invertedNet.run({ 'JHOP': 1}));
