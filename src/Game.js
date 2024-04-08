import createGameboard from "./Gameboard";
import { DomClicks } from "./DOM";

export default async function Game() {
  // init
  const gameBoard = createGameboard();
  gameBoard.randomPlaceAllShip();
  // unit test gameBoard.player.gameBoard

  // run game
  while (!gameBoard.isAllSunk()) {
    await waitForAttack();
    DomClicks.attack.clicked = false;
    let target = DomClicks.attack.target;
    let coord = DomClicks.attack.coord;
    gameBoard.receiveAttack(target, coord);
    gameBoard.nextRound();
  }
  const winner = gameBoard.curPlayer;
  // dom show winner
}

async function waitForAttack() {
  while (!DomClicks.attack.clicked) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Check for click every 100ms
  }
}
