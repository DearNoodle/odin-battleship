import createShip from "./Ship";

export default function createGameboard() {
  // gameboard setup

  let boardSize = 10;

  const Player = [
    { id: "p1", playerType: "user", ships: [], shipNum: 5, playerBoard: [] },
    { id: "p2", playerType: "com", ships: [], shipNum: 5, playerBoard: [] },
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

  let isGameEnd = false;

  // game events

  function nextRound() {
    curPlayer = nextPlayer;
    if (curPlayer === Player[0]) {
      nextPlayer = Player[1];
    } else {
      nextPlayer = Player[0];
    }
  }

  function receiveAttack(coord) {
    // hit or not boolean
    if ("wip") {
      // receiver.ships[?].hit() logic
      // DOM operation
      isAllSunk();
    } else {
      missedAttack();
    }
  }

  function missedAttack() {
    // DOM operation
  }

  function isAllSunk() {
    Player.forEach((player) => {
      if (player.ships.every((ship) => ship.isSunk)) {
        isGameEnd = true;
      }
    });
    return isGameEnd;
  }

  return {
    Player,
    isGameEnd,
    randomPlaceAllShip,
    nextRound,
    receiveAttack,
    isAllSunk,
  };
}
