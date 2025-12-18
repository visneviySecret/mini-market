export const getFormatNumber = (value: number) => {
  if (typeof value !== "number") {
    return "0";
  }
  const numberString = value.toString();
  const length = numberString.length;
  if (length <= 3) return numberString;

  const splitString = numberString.split("");
  const reverseArray = splitString.reverse();

  const result = reverseArray.map((char, index) => {
    return index / 3 === 1 ? `${char} ` : char;
  });

  return result.reverse().join("");
};
