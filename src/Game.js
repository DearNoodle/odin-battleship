import createGameboard from "./Gameboard";

export default function Game() {
  // init
  const gameBoard = createGameboard();
  gameBoard.randomPlaceAllShip();
  // unit test gameBoard.player.gameBoard

  // run game
  while (!gameBoard.isAllSunk()) {
    let coord = "wip"; // DOM Event that get coord
    gameBoard.receiveAttack(coord);
    gameBoard.nextRound();
  }
  const winner = gameBoard.curPlayer;
  // dom show winner
}
