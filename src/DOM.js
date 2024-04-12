export const DomClicks = { attack: { clicked: false } };

const attackBoardCells = document.querySelectorAll(".attack-board .cell");
const defenseBoardCells = document.querySelectorAll(".defense-board .cell");
const gameSetupMsg = document.querySelector(".game-setup");
const attackSuccessMsg = document.querySelector(".attack-success");
const attackSuccessShipName = document.querySelector(
  ".attack-success-ship-name",
);
const attackSuccessCoord = document.querySelector(".attack-success-coord");
const attackFailMsg = document.querySelector(".attack-fail");
const attackFailCoord = document.querySelector(".attack-fail-coord");
const gameEndModal = document.querySelector(".game-end-modal");
const closeModalBtns = document.querySelectorAll(".game-end-modal button");
const winText = document.querySelector("span.win-text");

for (let i = 0; i < attackBoardCells.length; i++) {
  const cell = attackBoardCells[i];
  cell.addEventListener("click", () => {
    DomClicks.attack.clicked = true;
    DomClicks.attack.target = cell;
    DomClicks.attack.coord = [Math.floor(i / 10), i % 10];
  });
}

closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    gameEndModal.classList.add("hidden");
  });
});

export function renderCell(target, color, coord) {
  let targetCell;
  if (target !== "defenseBoard") {
    targetCell = target;
    targetCell.classList.add("pointer-events-none");
    targetCell.classList.remove("bg-gray-400");
  } else {
    let [x, y] = coord;
    targetCell = defenseBoardCells[x * 10 + y];
    targetCell.classList.add("z-20");
  }

  if (color === "red") {
    targetCell.classList.add("bg-red-500");
  } else if (color === "white") {
    targetCell.classList.add("bg-gray-200");
  } else {
    throw new Error("Cell color error");
  }
}

export function announceShipHit(shipName, coord) {
  let [x, y] = coord;
  attackFailMsg.classList.add("hidden");
  attackSuccessMsg.classList.remove("hidden");
  attackSuccessShipName.textContent = shipName;
  attackSuccessCoord.textContent = `${String.fromCharCode(65 + y)}${x + 1}`;
}

export function announceShipMiss(coord) {
  let [x, y] = coord;
  attackSuccessMsg.classList.add("hidden");
  attackFailMsg.classList.remove("hidden");
  attackFailCoord.textContent = `${String.fromCharCode(65 + y)}${x + 1}`;
}

export function showWinModal(winner) {
  if (winner === "user") {
    winText.textContent = "You";
  } else if (winner === "com") {
    winText.textContent = "Com";
  } else {
    throw new Error("Invalid Winner");
  }
  gameEndModal.classList.remove("hidden");
  gameEndModal.classList.add("flex");
}
