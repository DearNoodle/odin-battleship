import createGameboard from "./Gameboard";
import { DomClicks } from "./DOM";

export default async function Game() {
  // init
  const gameBoard = createGameboard();
  gameBoard.randomPlaceAllShip();
  // unit test gameBoard.player.gameBoard

  // run game
  while (!gameBoard.isAllSunk()) {
    if (gameBoard.roundPlayers.curPlayer.id === "user") {
      await waitForDomClick();
      gameBoard.DomClickAttack();
    } else if (gameBoard.roundPlayers.curPlayer.id === "com") {
      gameBoard.comRandomAttack();
    } else {
      throw new Error("Invalid Player");
    }
    gameBoard.nextRound();
  }
  const winner = gameBoard.roundPlayers.nextPlayer.id;
  // dom show winner
}

async function waitForDomClick() {
  while (!DomClicks.attack.clicked) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Check for click every 100ms
  }
}

// function waitForDomClick() {
//   return new Promise((resolve) => {
//     // Add a one-time event listener
//     document.addEventListener("click", resolve, { once: true });
//   });
// }
