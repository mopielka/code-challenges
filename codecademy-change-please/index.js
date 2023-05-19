const changeOptions = (input, coins) => {
  [input, coins[0], ...coins].map(validatePositiveInteger)
  coins = coins.filter(unique).sort(byValue)

  const combinations = coinCombinations(input, coins).map(combination => combination.sort(byValue).join('+')).filter(unique)

  console.log(combinations)

  return combinations.length
}

const coinCombinationsCache = {};

const coinCombinations = (input, sortedCoins) => {
  const key = [input, ...sortedCoins].join('+')
  if (!coinCombinationsCache[key]) {
    // console.log(input);
    const result = []
    for (const coin of sortedCoins) {
      if (coin > input) {
        break
      }

      if (coin === input) {
        result.push([coin])
        continue
      }

      coinCombinations(input - coin, sortedCoins)
        .map(combination => [coin, ...combination])
        .forEach(combination => result.push(combination))
    }
    coinCombinationsCache[key] = result.map(combination => JSON.stringify(combination.sort(byValue))).filter(unique).map(v => JSON.parse(v))
  }

  return coinCombinationsCache[key]
}

const validatePositiveInteger = input => {
  if (typeof input !== "number" || input !== Math.round(input) || input <= 0) {
    throw new Error("invalid input")
  }
}

const unique = (value, index, array) => index === array.indexOf(value);
const byValue = (a, b) => a - b;

const result = changeOptions(JSON.parse(process.argv[2]), JSON.parse(process.argv[3]));
// const result = changeOptions(10, [1,2,3,5,10]);

console.log('Result is: ' + result);
