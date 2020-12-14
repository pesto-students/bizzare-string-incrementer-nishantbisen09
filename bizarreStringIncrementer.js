const ERROR_MESSAGE = "Invalid input!";

const bizarreStringIncrementer = (bizarreString) => {
  if (typeof bizarreString !== "string") throw ERROR_MESSAGE;
  const splittedInput = bizarreString.split("");
  const trailingNumber = getTrailingNumber(splittedInput);
  const preceedingString = bizarreString.replace(trailingNumber, "");
  return preceedingString + getIncrementedNumber(trailingNumber);
};

const getTrailingNumber = (splittedInput) => {
  let trailingNumbersArray = [];
  splittedInput.forEach((character) => {
    if (isAlphabet(character) && trailingNumbersArray.length > 0)
      trailingNumbersArray = [];
    if (isNumber(character)) trailingNumbersArray.push(character);
  });
  return trailingNumbersArray.join("");
};

const getIncrementedNumber = (numberString) => {
  if (hasPreceedingZeros(numberString)) {
    let noOfZeros = getNoOfZeros(numberString);
    const numberToBeIncremented = parseInt(numberString, 10);
    const incrementedNumber = numberToBeIncremented + 1;
    shouldRemoveExtraZero(
      incrementedNumber,
      numberToBeIncremented,
      noOfZeros
    ) && noOfZeros--;
    return padZeros(incrementedNumber, noOfZeros);
  } else {
    return numberString ? parseInt(numberString, 10) + 1 : 1;
  }
};

const shouldRemoveExtraZero = (
  incrementedNumber,
  numberToBeIncremented,
  noOfZeros
) =>
  incrementedNumber.toString().length >
    numberToBeIncremented.toString().length && noOfZeros;

const getNoOfZeros = (numberString) => {
  let noOfZeros = 0;
  numberString.split("").forEach((item) => item === "0" && noOfZeros++);
  return noOfZeros;
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

module.exports = { bizarreStringIncrementer };
