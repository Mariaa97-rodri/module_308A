//Part 1: regular recursion
// let counter = 0; //global counter variable
// function countUp(n) {
//     counter++; //increment global counter
//     // if (n === 0) return "Done!";

//     return countUp(n + 1); //recursive call
// }
// try { //try catch
//     countUp(0);
// } catch (e) {
//     console.log("Stack Overflow", e.message);
//     console.log("call stack size:", counter);
// }
//Part 2: Trampoline 
// recursive flatten function 
// function flattenArray(arr, result = []) {
//     if (arr.length === 0) {
//         return result;
//     }
//     const [first,...rest] = arr;
//     if(Array.isArray(first)) {
//         //return a thunk instead of recursing directly
//         return () => flattenArray(first.concat(rest),result);
//     } else {
//         result.push(first);
//         return () => flattenArray(rest, result);
//     }
// }

//trampoline
// function trampoline (fn) {
//     let result = fn();
//     while (typeof result === 'function') {
//         result = result ();
//     }
//     return result;
// }

// //run the trampoline function
// const nestedArray = [1,[2,[3,[4,[5]]]],6];

// const flattened = trampoline(() => flattenArray(nestedArray));
// console.log(flattened);

//Part 3: Deferred Execution
//check if a number is prime
const output = document.getElementById("output");

function isPrime(num) {
    if(num < 2) return false;

    for (let i = 2; i <=Math.sqrt(num); i++) {
        if(num % i === 0) return false;
    }
    return true;
}

//the problem "no deferred execution"
function listPrimes(n) {
    for (let i = 1; i <=n; i++) {
        if(isPrime(i)) {
            output.innerHTML += i + "<br>";
        }
    }
    alert("Calculation finished!");
}
listPrimes(10000);
// What happens here:
// JS runs entire loop first
// Brower cannot render during execution
// alet () blocks rendering
// When alert closes --> all numbers appear at once

// Deferred execution with recursion
// calculates one number at a time
// yields control back to the brower
// lets each number render
// alerts only when finished

function listPrimesDeferred (n, current = 1){
    if (current > n) {
        alert("calculation finsihed!");
        return;
    }
    if (isPrime(current)) {
        output.innerHTML += current + "<br>";
    }
    //defer the next step
    setTimeout(() => {
        listPrimesDeferred(n, current + 1);
    }, 0);
}

listPrimesDeferred(10000);