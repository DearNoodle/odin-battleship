import createGameboard from "./Gameboard";

export default function startGame() {
  const gameBoard = createGameboard();
  while (!gameBoard.isAllSunk()) {
    let coord = "wip"; // DOM Event that get coord
    gameBoard.receiveAttack(coord);
    gameBoard.nextRound();
  }
}
