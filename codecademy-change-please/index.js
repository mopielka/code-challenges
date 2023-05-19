const changeOptions = (input, coins) => {
  [input, coins[0], ...coins].map(validatePositiveInteger)
  coins = coins.filter((v, i, arr) => arr.indexOf(v) === i).sort()

  const combinations = coinCombinations(input, coins).map(combination => combination.sort().join('+')).filter((value, index, array) => index === array.indexOf(value))

  console.log(combinations)

  return combinations.length
}

const coinCombinationsCache = {};

const coinCombinations = (input, sortedCoins) => {
  const key = [input, ...sortedCoins].join('+')
  if (!coinCombinationsCache[key]) {
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
    coinCombinationsCache[key] = result
  }

  return coinCombinationsCache[key]
}

const validatePositiveInteger = input => {
  if (typeof input !== "number" || input !== Math.round(input) || input <= 0) {
    throw new Error("invalid input")
  }
}

const result = changeOptions(JSON.parse(process.argv[2]), JSON.parse(process.argv[3]));

console.log('Result is: ' + result);
