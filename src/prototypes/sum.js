//Prototype of a simple funtion to export and test with jest
//For some reason jest didn;t like more modern export/import syntax, so we used this instead.
//will review later.
function sum(a, b) {
    return a + b;
  }
module.exports = sum;