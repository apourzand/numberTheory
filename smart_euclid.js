import { matrix, inv, det } from 'mathjs';

var myArgs = process.argv.slice(2);

let a = parseInt(myArgs[0]);
let b = parseInt(myArgs[1]);


if (a > b) {
    [a, b] = [b, a];
}


function gcd(a, b) {
    if ( ! b) {
        return a;
    }
    return gcd(b, a % b);
}

function modInverse(a, b) {
    for (let x = 1; x < b; x++) {
        if (((a % b) * (x % b)) % b == 1) {
            return x;
        }
    }
}

function getMatrix(a, b) {
    let d = gcd(a, b);
    if (d > 1) {
        a = a / d;
        b = b / d;
    }
    let u = modInverse(b, a);
    let v = (b * u - 1) / a;
    return matrix([[u, a - u], [v, b - v]]);
}

let T = getMatrix(a, b);
let Tinv = inv(T);

console.log(T['_data'], det(T));
console.log(Tinv['_data'], det(Tinv));
