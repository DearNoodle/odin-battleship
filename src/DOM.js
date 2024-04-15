export const DomClicks = { attack: { clicked: false } };

const attackBoardCells = document.querySelectorAll(".attack-board .cell");
const defenseBoardCells = document.querySelectorAll(".defense-board .cell");
const gameSetupMsg = document.querySelector(".game-setup");
const ships = document.querySelectorAll(".ship");
const shipDrags = document.querySelectorAll(".ship span");
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

export function removeSetupMsg() {
  gameSetupMsg.classList.add("hidden");
}

// drag & drop ships

shipDrags.forEach((shipDrag) => {
  dragElement(shipDrag);
});

function dragElement(elmnt) {
  let parentNode = elmnt.parentNode;
  elmnt.onmousedown = (e) => {
    e = e || window.event;
    e.preventDefault();

    // Calculate initial offset relative to the document body
    let parentRect = parentNode.getBoundingClientRect();
    let initialParentOffsetX = parentRect.left + 25;
    let initialParentOffsetY = parentRect.top + 25;

    // Store original position before dragging starts
    let originalX = parentNode.offsetLeft;
    let originalY = parentNode.offsetTop;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      let deltaX = e.clientX - initialParentOffsetX;
      let deltaY = e.clientY - initialParentOffsetY;

      parentNode.style.left = `${deltaX}px`;
      parentNode.style.top = `${deltaY}px`;
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;

      // Return the ship to its original position

      for (const cell of defenseBoardCells) {
        if (isColliding(elmnt, cell)) {
          cell.appendChild(parentNode);
          parentNode.style.left = `-2px`;
          parentNode.style.top = `-2px`;
          return;
        }
      }
      parentNode.style.left = `${originalX}px`;
      parentNode.style.top = `${originalY}px`;
    }

    function isColliding(element1, element2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();

      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }
  };
}
