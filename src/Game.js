import createGameboard from "./Gameboard";
import {
  DomClicks,
  initPlacementBtns,
  showEndModal,
  removeSetupMsg,
  initModalCloseBtns,
  initShipDrag,
  initShipRotate,
  isShipPanelEmpty,
} from "./DOM";

const comPlayTIme = 1; // in second
const shipPlacement = "random";

export default async function Game() {
  // init
  const gameBoard = createGameboard();
  initPlacementBtns(gameBoard);
  initModalCloseBtns();
  initShipDrag(gameBoard.roundPlayers.curPlayer, gameBoard);
  initShipRotate();

  // run game
  await waitForShipPlace(gameBoard, shipPlacement);
  removeSetupMsg();
  while (!gameBoard.isAllSunk()) {
    if (gameBoard.roundPlayers.curPlayer.id === "user") {
      await waitForDomClick();
      gameBoard.DomClickAttack();
    } else if (gameBoard.roundPlayers.curPlayer.id === "com") {
      await new Promise((resolve) => setTimeout(resolve, comPlayTIme * 1000));
      gameBoard.comRandomAttack();
    } else {
      throw new Error("Invalid Player");
    }
    gameBoard.nextRound();
  }

  // end game
  const winner = gameBoard.roundPlayers.nextPlayer.id;
  showEndModal(winner);

  async function waitForShipPlace(gameBoard) {
    gameBoard.randomPlace("com");
    while (!gameBoard.getIsAllPlaced()) {
      if (isShipPanelEmpty()) {
        gameBoard.setIsAllPlaced(true);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async function waitForDomClick() {
    while (!DomClicks.attack.clicked) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
