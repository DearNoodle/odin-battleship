// export function render() {
//   // wip
// }

export const DomClicks = { attack: { clicked: false } };

const attackBoardCells = document.querySelectorAll(".attack-board .cell");
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

export function changeCellColor(target, color) {
  target.classList.remove("bg-gray-300");
  if (color === "red") {
    target.classList.add("bg-red-500");
  } else if (color === "white") {
    target.classList.add("bg-gray-50");
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
