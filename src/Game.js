import createGameboard from "./Gameboard";
import { DomClicks, showWinModal } from "./DOM";

const comMoveTime = 1.5; // in second

export default async function Game() {
  // init
  const gameBoard = createGameboard();
  gameBoard.randomPlaceAllShip();

  // run game
  while (!gameBoard.isAllSunk()) {
    if (gameBoard.roundPlayers.curPlayer.id === "user") {
      await waitForDomClick();
      gameBoard.DomClickAttack();
    } else if (gameBoard.roundPlayers.curPlayer.id === "com") {
      await new Promise((resolve) => setTimeout(resolve, comMoveTime * 1000));
      gameBoard.comRandomAttack();
    } else {
      throw new Error("Invalid Player");
    }
    gameBoard.nextRound();
  }

  // end game
  const winner = gameBoard.roundPlayers.nextPlayer.id;
  showWinModal(winner);
}

async function waitForDomClick() {
  while (!DomClicks.attack.clicked) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
