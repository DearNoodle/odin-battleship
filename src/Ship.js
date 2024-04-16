import { placeDomShip } from "./DOM";

export default function createShip(info = [null, null]) {
  let [name, length] = info;
  let hitNum = 0;
  let isPlaced = false;
  let coordinate = null;
  let direction = null;

  function getName() {
    return name;
  }

  function getLength() {
    return length;
  }

  function getCoordinate() {
    return coordinate;
  }

  function setCoordinate(coord, playerBoard) {
    if (coord != null) {
      let [x, y] = coord;
      if (!Number.isInteger(x) || !Number.isInteger(y))
        throw new TypeError("Coord must be null or array of integers");
      if (x < 0 || x > playerBoard.length || y < 0 || y > playerBoard.length)
        throw new Error("Coord x or y out of boardSize");
    }
    coordinate = coord;
  }

  function getDirection() {
    return direction;
  }

  function setDirection(dir) {
    if (dir !== "vertical" && dir !== "horizontal" && dir !== null)
      throw new Error("Invalid direction");
    direction = dir;
  }

  function getIsPlaced() {
    return isPlaced;
  }

  function setIsPlaced(bool) {
    if (!(bool === !!bool)) throw new TypeError("Input type is not boolean");
    isPlaced = bool;
  }

  function placeShip(placement, player, boardSize, coord, dir) {
    if (placement === "random") {
      let i = 0;
      while (!getIsPlaced() && i < 1000) {
        i++;
        setCoordinate(
          [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize),
          ],
          player.playerBoard,
        );
        setDirection(["vertical", "horizontal"][Math.floor(Math.random() * 2)]);
        checkPlace(player, boardSize);
      }
    } else if (placement === "manual") {
      setCoordinate(coord, player.playerBoard);
      setDirection(dir);
      checkPlace(player, boardSize);
    }
  }

  function checkPlace(player, boardSize) {
    let [coordx, coordy] = getCoordinate();
    for (let i = 0; i < getLength(); i++) {
      function isValidPlacement() {
        const isPlacable = (x, y) =>
          x >= 0 &&
          x < boardSize &&
          y >= 0 &&
          y < boardSize &&
          player.playerBoard[x] !== undefined &&
          player.playerBoard[x][y].shipHere === null;

        if (getDirection() === "horizontal") {
          return isPlacable(coordx, coordy + i);
        }
        if (getDirection() === "vertical") {
          return isPlacable(coordx + i, coordy);
        }
        throw new Error("Invalid direction");
      }
      if (!isValidPlacement()) {
        failPlace();
        return;
      }
    }
    if (player.id === "user") {
      placeDomShip(getName(), getCoordinate(), getDirection());
      const domShip = document.querySelector(`.ship.${name}`);
      domShip.classList.add("pointer-events-none");
    }
    for (let i = 0; i < getLength(); i++) {
      if (getDirection() === "horizontal") {
        player.playerBoard[coordx][coordy + i].shipHere = getName();
        setCoordinate([coordx, coordy + i], player.playerBoard);
      } else if (getDirection() === "vertical") {
        player.playerBoard[coordx + i][coordy].shipHere = getName();
        setCoordinate([coordx + i, coordy], player.playerBoard);
      }
    }
    setIsPlaced(true);
  }

  function failPlace() {
    setCoordinate(null);
    setDirection(null);
    setIsPlaced(false);
  }

  function hit() {
    if (hitNum < getLength()) {
      hitNum += 1;
    }
  }

  function isSunk() {
    if (hitNum === getLength()) {
      return true;
    }
    return false;
  }

  return {
    getName,
    getLength,
    getCoordinate,
    getDirection,
    getIsPlaced,
    placeShip,
    hit,
    isSunk,
  };
}
