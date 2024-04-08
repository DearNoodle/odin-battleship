import createShip from "./Ship";
import { changeCellColor, announceShipHit, announceShipMiss } from "./DOM";

export default function createGameboard() {
  // gameboard setup

  let boardSize = 10;

  const Player = [
    { id: "p1", playerType: "user", ships: [], playerBoard: [] },
    { id: "p2", playerType: "com", ships: [], playerBoard: [] },
  ];

  Player.forEach((player) => {
    player.ships.push(createShip(["Carrier", 5]));
    player.ships.push(createShip(["Battleship", 4]));
    player.ships.push(createShip(["Cruiser", 3]));
    player.ships.push(createShip(["Submarine", 3]));
    player.ships.push(createShip(["Destroyer", 2]));
  });

  Player.forEach((player) => {
    for (let i = 0; i < boardSize; i++) {
      player.playerBoard[i] = [];
      for (let j = 0; j < boardSize; j++) {
        player.playerBoard[i][j] = null;
      }
    }
  });

  function randomPlaceAllShip() {
    Player.forEach((player) => {
      player.ships.forEach((ship) => {
        let i = 0;
        while (!ship.getIsPlaced() && i < 1000) {
          i++;
          ship.placeShip("random", boardSize, player.playerBoard);
        }
      });
    });
  }

  let [curPlayer, nextPlayer] = Player;

  // game events

  function nextRound() {
    curPlayer = nextPlayer;
    if (curPlayer === Player[0]) {
      nextPlayer = Player[1];
    } else {
      nextPlayer = Player[0];
    }
  }

  function receiveAttack(target, coord) {
    if (coord === null) {
      throw new Error("Attack Click Error");
    }
    let [x, y] = coord;
    if (nextPlayer.playerBoard[x][y] === null) {
      missedAttack(target);
    } else {
      hitAttack(target, coord);
    }
  }

  function missedAttack(target) {
    changeCellColor(target, "white");
    announceShipMiss();
  }

  function hitAttack(target, coord) {
    let [x, y] = coord;
    let shipName = nextPlayer.playerBoard[x][y];
    nextPlayer.ships.find((ship) => ship.getName() === shipName).hit();
    changeCellColor(target, "red");
    announceShipHit(shipName);
  }

  function isAllSunk() {
    return curPlayer.ships.every((ship) => ship.isSunk());
  }

  return {
    Player,
    curPlayer,
    randomPlaceAllShip,
    nextRound,
    receiveAttack,
    isAllSunk,
  };
}
