const myMagicNumber = 42;

function add(a, b) {
  return a + b;
}

console.log('Änderung in utils.js');

// module.exports = { myMagicNumber, add };
export { myMagicNumber, add };
