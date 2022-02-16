const latinSquare = [
  [4, 3, 1, 5, 2, 0],
  [1, 0, 4, 2, 5, 3],
  [3, 2, 0, 4, 1, 5],
  [0, 5, 3, 1, 4, 2],
  [5, 4, 2, 0, 3, 1],
  [2, 1, 5, 3, 0, 4],
];
let currentIndex = 0;

const shuffleAsLatinSquare = (array, newShuffle) => {
  if (array.length !== latinSquare.length)
    throw new Error("array length must be equal to latinSquare length (= 6)");
  const shuffled = [],
    order = latinSquare[currentIndex];
  if (newShuffle)
    currentIndex =
      currentIndex === latinSquare.length - 1 ? 0 : currentIndex + 1; // increment index
  for (let i = 0; i < array.length; i++) {
    shuffled.push(array[order[i]]);
  }
  return shuffled;
};

export default shuffleAsLatinSquare;
