var brain = require("brain.js");

// rawData = ' # ';

function toArray(string) { //normalize
    if(string.length !== 7 * 7) throw new Error('strin in wrong size');
    return string.split('').map(toNumber);

}
function toNumber(character) {
    return character === '#' ? 1 : 0;
}

const zero = toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#     #' +
    '#######'
);
const one = toArray(
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   ' +
    '   #   '
);
const two = toArray(
    '#######' +
    '#     #' +
    '      #' +
    '     # ' +
    '   #   ' +
    ' #     ' +
    '#######'
);
const three = toArray(
    '#######' +
    '      #' +
    '      #' +
    ' ######' +
    '      #' +
    '      #' +
    '#######'
);
const four = toArray(
    '#     #' +
    '#     #' +
    '#     #' +
    '#######' +
    '      #' +
    '      #' +
    '      #'
);
const five = toArray(
    '#######' +
    '#      ' +
    '#      ' +
    '#######' +
    '      #' +
    '      #' +
    '#######'
);
const six = toArray(
    '      #' +
    '    #  ' +
    '  #    ' +
    ' ######' +
    '#     #' +
    '#     #' +
    '#######'
);
const seven = toArray(
    '#######' +
    '     # ' +
    '    #  ' +
    '   #   ' +
    '  #    ' +
    ' #     ' +
    '#      '
);
const eight = toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '#######' +
    '#     #' +
    '#     #' +
    '#######'
);
const nine = toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '###### ' +
    '    #  ' +
    '   #   ' +
    ' #     '
);

const net = new brain.NeuralNetwork();
const trainingData = [
    { input: zero, output: { zero: 1 } },
    { input: one, output: { one: 1 } },
    { input: two, output: { two: 1 } },
    { input: three, output: { three: 1 } },
    { input: four, output: { four: 1 } },
    { input: five, output: { five: 1 } },
    { input: six, output: { six: 1 } },
    { input: seven, output: { seven: 1 } },
    { input: eight, output: { eight: 1 } },
    { input: nine, output: { nine: 1 } }
];

net.train(trainingData);

// const result = net.run(toArray(
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '#######'
// ));
//
// console.log(result); ==>

// { zero: 0.11491519212722778,
//     one: 0.0042550330981612206,
//     two: 0.006628519855439663,
//     three: 0.07159622013568878,
//     four: 0.05207512900233269,
//     five: 0.10139735043048859,
//     six: 0.04914902150630951,
//     seven: 0.011984357610344887,
//     eight: 0.7538371086120605, ---> highest, most likely it's an eight
//     nine: 0.027422893792390823 }

const result = brain.likely(toArray(
    '#######' +
    '#     #' +
    '#     #' +
    '#######' +
    '#     #' +
    '#     #' +
    '#######'
), net);

console.log(result); // ---> eight
