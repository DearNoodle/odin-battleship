export const DomClicks = { attack: { clicked: false } };

const attackBoardCells = document.querySelectorAll(".attack-board .cell");
const defenseBoardCells = document.querySelectorAll(".defense-board .cell");
const gameSetupMsg = document.querySelector(".game-setup");
const ships = document.querySelectorAll(".ship");
const shipRotatePivots = document.querySelectorAll(".ship span");
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

// drag & rotate ships

ships.forEach((ship) => {
  dragElement(ship);
});

function dragElement(element) {
  element.onmousedown = (e) => {
    const shipPvt = element.querySelector("span");
    e = e || window.event;
    e.preventDefault();

    let parentRect = element.offsetParent.getBoundingClientRect();
    let initialX = element.offsetLeft;
    let initialY = element.offsetTop;

    let offsetX = e.clientX - parentRect.left - initialX;
    let offsetY = e.clientY - parentRect.top - initialY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      element.style.left = `${e.clientX - parentRect.left - offsetX}px`;
      element.style.top = `${e.clientY - parentRect.top - offsetY}px`;
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;

      for (const cell of defenseBoardCells) {
        if (isColliding(shipPvt, cell)) {
          cell.appendChild(element.parentNode);
          break;
        }
      }
      if (element.style.transform !== `rotate(90deg)`) {
        setRotateNonOffset(element);
      } else {
        setRotate90Offset(element);
      }
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

shipRotatePivots.forEach((shipPivot) => {
  rotateElement(shipPivot);
});

function rotateElement(shipPvt) {
  let parentNode = shipPvt.parentNode;

  shipPvt.addEventListener("click", () => {
    if (parentNode.style.transform === `rotate(90deg)`) {
      parentNode.style.transform = `rotate(0deg)`;
      setRotateNonOffset(parentNode);
    } else {
      parentNode.style.transform = `rotate(90deg)`;
      setRotate90Offset(parentNode);
    }
  });
}

function setRotateNonOffset(ship) {
  ship.style.left = `-2px`;
  ship.style.top = `-2px`;
}

function setRotate90Offset(ship) {
  if (ship.classList.contains("carrier")) {
    ship.style.left = `-96px`;
    ship.style.top = `93px`;
  } else if (ship.classList.contains("battleship")) {
    ship.style.left = `-73px`;
    ship.style.top = `69px`;
  } else if (ship.classList.contains("cruiser")) {
    ship.style.left = `-49px`;
    ship.style.top = `46px`;
  } else if (ship.classList.contains("submarine")) {
    ship.style.left = `-49px`;
    ship.style.top = `46px`;
  } else if (ship.classList.contains("destroyer")) {
    ship.style.left = `-25px`;
    ship.style.top = `22px`;
  }
}
