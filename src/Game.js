import createGameboard from "./Gameboard";
import { DomClicks, showWinModal, removeSetupMsg } from "./DOM";

const comMoveTime = 1.5; // in second
const shipPlacement = "random";
export default async function Game() {
  // init
  const gameBoard = createGameboard();

  await waitForShipPlace(gameBoard, shipPlacement);
  removeSetupMsg();

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

async function waitForShipPlace(gameBoard, place) {
  if (place === "random") {
    gameBoard.randomPlaceAll();
    // wip dom auto placement
  }
  // wip manual placement
  while (!gameBoard.getIsAllPlaced()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function waitForDomClick() {
  while (!DomClicks.attack.clicked) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
