export const DomClicks = { attack: { clicked: false } };

const attackBoardCells = document.querySelectorAll(".attack-board .cell");
const defenseBoardCells = document.querySelectorAll(".defense-board .cell");

const gameSetupMsg = document.querySelector(".game-setup");

const shipPanel = document.querySelector(".ships-panel");
const domShips = document.querySelectorAll(".ship");
const shipRotatePivots = document.querySelectorAll(".ship span");

const attackSuccessMsg = document.querySelector(".attack-success");
const attackSuccessShipName = document.querySelector(
  ".attack-success-ship-name",
);
const attackSuccessCoord = document.querySelector(".attack-success-coord");
const attackFailMsg = document.querySelector(".attack-fail");
const attackFailCoord = document.querySelector(".attack-fail-coord");

const gameStartModal = document.querySelector(".game-start-modal");
const randomPlaceBtn = document.querySelector(
  ".game-start-modal .random-place",
);
const manualPlaceBtn = document.querySelector(
  ".game-start-modal .manual-place",
);

const gameEndModal = document.querySelector(".game-end-modal");
const endModalBtns = document.querySelectorAll(".game-end-modal button");
const winText = document.querySelector("span.win-text");

export function InitCellClicks(gameBoard) {
  for (let i = 0; i < attackBoardCells.length; i++) {
    const cell = attackBoardCells[i];
    cell.addEventListener("click", () => {
      if (gameBoard.roundPlayers.curPlayer.id === "user") {
        DomClicks.attack.clicked = true;
        DomClicks.attack.target = cell;
        DomClicks.attack.coord = [Math.floor(i / 10), i % 10];
      }
    });
  }
}

export function renderCell(target, color, coord) {
  let targetCell;
  if (target !== "defenseBoard") {
    targetCell = target;
    targetCell.classList.add("pointer-events-none");
    targetCell.classList.remove("bg-gray-400");
  } else {
    let [x, y] = coord;
    targetCell = defenseBoardCells[x * 10 + y];
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

export function showEndModal(winner) {
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

export function initModalCloseBtns() {
  // Store References to Listener Functions
  const handleEndModalClick = () => {
    gameEndModal.classList.remove("flex");
    gameEndModal.classList.add("hidden");
  };

  const handleStartModalClick = () => {
    gameStartModal.classList.remove("flex");
    gameStartModal.classList.add("hidden");
    // Remove listeners after closing the start modal
    randomPlaceBtn.removeEventListener("click", handleStartModalClick);
    manualPlaceBtn.removeEventListener("click", handleStartModalClick);
  };

  endModalBtns.forEach((btn) => {
    btn.addEventListener("click", handleEndModalClick);
  });

  [randomPlaceBtn, manualPlaceBtn].forEach((btn) => {
    btn.addEventListener("click", handleStartModalClick);
  });
}

export function initPlacementBtns(gameBoard) {
  randomPlaceBtn.addEventListener("click", () => gameBoard.randomPlace("user"));
}

export function removeSetupMsg() {
  gameSetupMsg.classList.add("hidden");
}

// drag & rotate ships
export function initShipDrag(player, gameBoard) {
  domShips.forEach((domShip) => {
    dragShip(domShip, player, gameBoard);
  });
}

function dragShip(domShip, player, gameBoard) {
  domShip.addEventListener("mousedown", (e) => {
    const shipPvt = domShip.querySelector("span");
    e.preventDefault();
    let parentRect = domShip.offsetParent.getBoundingClientRect();
    let initialX = domShip.offsetLeft;
    let initialY = domShip.offsetTop;
    let offsetX = e.clientX - parentRect.left - initialX;
    let offsetY = e.clientY - parentRect.top - initialY;

    const shipDrag = (e) => {
      e.preventDefault();
      domShip.style.left = `${e.clientX - parentRect.left - offsetX}px`;
      domShip.style.top = `${e.clientY - parentRect.top - offsetY}px`;
    };

    const closeDragShip = () => {
      document.removeEventListener("mouseup", closeDragShip);
      document.removeEventListener("mousemove", shipDrag);

      for (let i = 0; i < defenseBoardCells.length; i++) {
        const cell = defenseBoardCells[i];
        if (isColliding(shipPvt, cell)) {
          const ship = player.ships.find((s) =>
            domShip.classList.contains(s.getName()),
          );
          const coord = [Math.floor(i / 10), i % 10];
          const direction =
            domShip.style.transform === "rotate(90deg)"
              ? "vertical"
              : "horizontal";
          gameBoard.manualPlace(ship, player, coord, direction);
        }
      }

      if (domShip.style.transform !== `rotate(90deg)`) {
        setRotateNonOffset(domShip);
      } else {
        setRotate90Offset(domShip);
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

    document.addEventListener("mouseup", closeDragShip);
    document.addEventListener("mousemove", shipDrag);
  });
}

export function initShipRotate() {
  shipRotatePivots.forEach((shipPivot) => {
    rotateShip(shipPivot);
  });
}

function rotateShip(shipPvt) {
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

function setRotateNonOffset(domShip) {
  domShip.style.left = `-2px`;
  domShip.style.top = `-2px`;
}

function setRotate90Offset(domShip) {
  if (domShip.classList.contains("carrier")) {
    domShip.style.left = `-97px`;
    domShip.style.top = `92px`;
  } else if (domShip.classList.contains("battleship")) {
    domShip.style.left = `-73px`;
    domShip.style.top = `69px`;
  } else if (domShip.classList.contains("cruiser")) {
    domShip.style.left = `-49px`;
    domShip.style.top = `45px`;
  } else if (domShip.classList.contains("submarine")) {
    domShip.style.left = `-49px`;
    domShip.style.top = `45px`;
  } else if (domShip.classList.contains("destroyer")) {
    domShip.style.left = `-26px`;
    domShip.style.top = `21px`;
  }
}

export function placeDomShip(name, coord, direction) {
  let [x, y] = coord;
  const domShip = document.querySelector(`.ship.${name}`);
  defenseBoardCells[x * 10 + y].appendChild(domShip.parentNode);
  if (direction === "horizontal") {
    domShip.style.transform = `rotate(0deg)`;
    setRotateNonOffset(domShip);
  } else {
    domShip.style.transform = `rotate(90deg)`;
    setRotate90Offset(domShip);
  }
}

export function isShipPanelEmpty() {
  if (shipPanel.children.length === 0) {
    return true;
  }
  return false;
}
