import createShip from "./Ship";
import {
  renderCell,
  announceShipHit,
  announceShipMiss,
  DomClicks,
  placeDomShip,
} from "./DOM";

export default function createGameboard() {
  // gameboard setup
  let boardSize = 10;
  let isAllPlaced = false;

  function getIsAllPlaced() {
    return isAllPlaced;
  }
  function setIsAllPlaced(bool) {
    if (typeof bool !== "boolean") {
      throw new TypeError("Input type is not boolean");
    }
    isAllPlaced = bool;
  }

  const Player = [
    { id: "user", ships: [], playerBoard: [] },
    { id: "com", ships: [], playerBoard: [] },
  ];

  Player.forEach((player) => {
    player.ships.push(createShip(["carrier", 5]));
    player.ships.push(createShip(["battleship", 4]));
    player.ships.push(createShip(["cruiser", 3]));
    player.ships.push(createShip(["submarine", 3]));
    player.ships.push(createShip(["destroyer", 2]));
  });

  Player.forEach((player) => {
    for (let i = 0; i < boardSize; i++) {
      player.playerBoard[i] = [];
      for (let j = 0; j < boardSize; j++) {
        player.playerBoard[i][j] = { shipHere: null, isAttacked: false };
      }
    }
  });

  function randomPlace(id) {
    const player = Player.find((p) => p.id === id);
    player.ships.forEach((ship) => {
      while (!ship.getIsPlaced()) {
        ship.placeShip(placeDomShip, "random", player, boardSize);
      }
    });
  }

  function manualPlace(ship, player, coord, dir) {
    ship.placeShip(placeDomShip, "manual", player, boardSize, coord, dir);
  }

  let [curPlayer, nextPlayer] = Player;
  let roundPlayers = { curPlayer, nextPlayer };

  // game events

  function nextRound() {
    let roundSwitcher = roundPlayers.curPlayer;
    roundPlayers.curPlayer = roundPlayers.nextPlayer;
    roundPlayers.nextPlayer = roundSwitcher;
  }

  function comRandomAttack() {
    let isAttackValid = false;
    while (!isAttackValid) {
      let coord = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
      let [x, y] = coord;
      if (roundPlayers.nextPlayer.playerBoard[x][y].isAttacked === false) {
        isAttackValid = true;
        receiveAttack("defenseBoard", coord);
      }
    }
  }

  function DomClickAttack() {
    DomClicks.attack.clicked = false;
    let target = DomClicks.attack.target;
    let coord = DomClicks.attack.coord;
    receiveAttack(target, coord);
  }

  function receiveAttack(target, coord) {
    if (coord === null) {
      throw new Error("Attack Click Error");
    }
    let [x, y] = coord;
    if (roundPlayers.nextPlayer.playerBoard[x][y].shipHere === null) {
      missedAttack(target, coord);
    } else {
      hitAttack(target, coord);
    }
    roundPlayers.nextPlayer.playerBoard[x][y].isAttacked = true;
  }

  function missedAttack(target, coord) {
    renderCell(target, "white", coord);
    announceShipMiss(coord);
  }

  function hitAttack(target, coord) {
    let [x, y] = coord;
    let shipName = roundPlayers.nextPlayer.playerBoard[x][y].shipHere;
    roundPlayers.nextPlayer.ships
      .find((ship) => ship.getName() === shipName)
      .hit();
    renderCell(target, "red", coord);
    announceShipHit(shipName, coord);
  }

  function isAllSunk() {
    return roundPlayers.curPlayer.ships.every((ship) => ship.isSunk());
  }

  return {
    roundPlayers,
    getIsAllPlaced,
    setIsAllPlaced,
    randomPlace,
    manualPlace,
    nextRound,
    comRandomAttack,
    DomClickAttack,
    receiveAttack,
    isAllSunk,
  };
}
