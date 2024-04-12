export const DomClicks = { attack: { clicked: false } };

const attackBoardCells = document.querySelectorAll(".attack-board .cell");
const defenseBoardCells = document.querySelectorAll(".defense-board .cell");
const gameSetupMsg = document.querySelector(".game-setup");
const attackSuccessMsg = document.querySelector(".attack-success");
const attackFailMsg = document.querySelector(".attack-fail");

for (let i = 0; i < attackBoardCells.length; i++) {
  const cell = attackBoardCells[i];
  cell.addEventListener("click", () => {
    DomClicks.attack.clicked = true;
    DomClicks.attack.target = cell;
    DomClicks.attack.coord = [Math.floor(i / 10), i % 10];
  });
}

export function renderCell(target, color, coord) {
  let targetCell;
  if (target !== "defenseBoard") {
    targetCell = target;
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

export function announceShipHit(shipName) {
  attackFailMsg.classList.add("hidden");
  attackSuccessMsg.classList.remove("hidden");
}

export function announceShipMiss() {
  attackSuccessMsg.classList.add("hidden");
  attackFailMsg.classList.remove("hidden");
}
