import { matrix, floor, multiply, pow, inv } from 'mathjs';

let x = matrix([[1, 0], [1, 1]]);
let r = matrix([[0, 1], [1, 1]]);

var myArgs = process.argv.slice(2);

let a = parseInt(myArgs[0]);
let b = parseInt(myArgs[1]);

if (a > b) {
    [a, b] = [b, a];
}


function getSteps(a, b) {
    var steps = [];
    var R, Q;
    while ((a % b) > 0) {
        R = a % b;
        a = b;
        b = R;
        Q = floor(a / b);
        steps.push(Q);
    }
    console.log(steps);
    return steps;
}

function getMatrix(steps) {
    var m;
    var imax = steps.length -1;
    var T = matrix([[1, 0], [0, 1]]);
    for (var i = imax; i >= 0; i--) {
        if (i == imax) {
             steps[i] = steps[i] -1;
        }
        m = multiply(pow(x, steps[i] - 1), r);
        T = multiply(m, T);
    }
    return T;
}

var steps = getSteps(a, b);
var T = getMatrix(steps);
var Tinv = inv(T);

console.log([T['_data']]);
console.log(Tinv['_data']);