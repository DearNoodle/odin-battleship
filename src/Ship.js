export default function createShip(info = [null, null, null, null]) {
  let [name, length, coord, direction] = info;
  let hitNum = 0;

  function getName() {
    return name;
  }

  function getLength() {
    return length;
  }

  function getcoord() {
    return coord;
  }

  function getDirection() {
    return direction;
  }

  // add setter function later

  function hit() {
    if (hitNum < length) {
      hitNum += 1;
    }
  }

  function isSunk() {
    if (hitNum === length) {
      return true;
    }
    return false;
  }

  return {
    getName,
    getLength,
    getcoord,
    getDirection,
    hit,
    isSunk,
  };
}
