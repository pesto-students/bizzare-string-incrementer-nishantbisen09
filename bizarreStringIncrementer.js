const bizarreStringIncrementer = (bizarreString) => {
  if (typeof bizarreString !== "string") throw "Invalid input!";
  const splittedInput = bizarreString.split("");
  let trailingNumbersArray = [];
  splittedInput.forEach((character) => {
    if (isAlphabet(character) && trailingNumbersArray.length > 0)
      trailingNumbersArray = [];
    if (isNumber(character)) trailingNumbersArray.push(character);
  });
  let trailingNumber = trailingNumbersArray.join("");
  const preceedingString = bizarreString.replace(trailingNumber, "");
  const result = preceedingString + getIncrementedNumber(trailingNumber);
  return result;
};

const getIncrementedNumber = (numberString) => {
  if (hasPreceedingZeros(numberString)) {
    let noOfZeros = 0;
    numberString.split("").forEach((item) => item === "0" && noOfZeros++);
    const numberToBeIncremented = parseInt(numberString, 10);
    const incrementedNumber = numberToBeIncremented + 1;
    if (
      incrementedNumber.toString().length >
        numberToBeIncremented.toString().length &&
      noOfZeros
    )
      noOfZeros--;
    return padZeros(incrementedNumber, noOfZeros);
  } else {
    return numberString ? parseInt(numberString, 10) + 1 : 1;
  }
};

const padZeros = (numberString, noOfZeros) => {
  let paddedString = numberString;
  while (noOfZeros) {
    paddedString = "0" + paddedString;
    noOfZeros--;
  }
  return paddedString;
};

const isNumber = (character) => /[0-9]+/g.test(character);
const isAlphabet = (character) => /[A-Za-z]+/g.test(character);
const hasPreceedingZeros = (text) => /^(0)+([1-9]*)$/g.test(text);

try {
  bizarreStringIncrementer("foo123");
} catch (error) {
  console.log(error);
}

module.exports = { bizarreStringIncrementer };
