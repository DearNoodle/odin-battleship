/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initGame: () => (/* binding */ initGame),
/* harmony export */   runGame: () => (/* binding */ runGame)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");


function initGame() {
  const gameBoard = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  gameBoard.randomPlaceAllShip();
  // unit test gameBoard.player.gameBoard
}

function runGame() {
  /* while (!gameBoard.isAllSunk()) {
    let coord = "wip"; // DOM Event that get coord
    gameBoard.receiveAttack(coord);
    gameBoard.nextRound();
  } */
}


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");


function createGameboard() {
  // gameboard setup

  let boardSize = 10;

  const Player = [
    { id: "p1", playerType: "user", ships: [], shipNum: 5, playerBoard: [] },
    { id: "p2", playerType: "com", ships: [], shipNum: 5, playerBoard: [] },
  ];

  Player.forEach((player) => {
    player.ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(["Carrier", 5]));
    player.ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(["Battleship", 4]));
    player.ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(["Cruiser", 3]));
    player.ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(["Submarine", 3]));
    player.ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(["Destroyer", 2]));
  });

  Player.forEach((player) => {
    for (let i = 0; i < boardSize; i++) {
      player.playerBoard[i] = [];
      for (let j = 0; j < boardSize; j++) {
        player.playerBoard[i][j] = null;
      }
    }
  });

  function randomPlaceAllShip() {
    Player.forEach((player) => {
      player.ships.forEach((ship) => {
        let i = 0;
        while (!ship.getIsPlaced() && i < 1000) {
          i++;
          ship.placeShip("random", boardSize, player.playerBoard);
        }
      });
    });
  }

  let [curPlayer, nextPlayer] = Player;

  let isGameEnd = false;

  // game events

  function nextRound() {
    curPlayer = nextPlayer;
    if (curPlayer === Player[0]) {
      nextPlayer = Player[1];
    } else {
      nextPlayer = Player[0];
    }
  }

  function receiveAttack(coord) {
    // hit or not boolean
    if (true) {
      // receiver.ships[?].hit() logic
      // DOM operation
      isAllSunk();
    } else {}
  }

  function missedAttack() {
    // DOM operation
  }

  function isAllSunk() {
    Player.forEach((player) => {
      if (player.ships.every((ship) => ship.isSunk)) {
        isGameEnd = true;
      }
    });
    return isGameEnd;
  }

  return {
    Player,
    isGameEnd,
    randomPlaceAllShip,
    nextRound,
    receiveAttack,
    isAllSunk,
  };
}


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createShip)
/* harmony export */ });
function createShip(info = [null, null]) {
  let [name, length] = info;
  let hitNum = 0;
  let isPlaced = false;
  let coordinate = null;
  let direction = null;

  function getName() {
    return name;
  }

  function getLength() {
    return length;
  }

  function getcoord() {
    return coordinate;
  }

  function setCoordinate(coord, playerBoard) {
    if (coord != null) {
      let [x, y] = coord;
      if (!Number.isInteger(x) || !Number.isInteger(y))
        throw new TypeError("Coord must be null or array of integers");
      if (x < 0 || x > playerBoard.length || y < 0 || y > playerBoard.length)
        throw new Error("Coord x or y out of boardSize");
    }
    coordinate = coord;
  }

  function getDirection() {
    return direction;
  }

  function setDirection(dir) {
    if (dir !== "vertical" && dir !== "horizontal" && dir !== null)
      throw new Error("Invalid direction");
    direction = dir;
  }

  function getIsPlaced() {
    return isPlaced;
  }

  function setIsPlaced(bool) {
    if (!(bool === !!bool)) throw new TypeError("Input type is not boolean");
    isPlaced = bool;
  }

  function placeShip(placement, boardSize, playerBoard) {
    if (placement === "random") {
      let i = 0;
      while (!getIsPlaced() && i < 1000) {
        i++;
        setCoordinate(
          [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize),
          ],
          playerBoard,
        );
        setDirection(["vertical", "horizontal"][Math.floor(Math.random() * 2)]);
        checkPlace(playerBoard);
      }
      return;
    }
    let [coord, dir] = placement;
    setCoordinate(coord, playerBoard);
    setDirection(dir);
    checkPlace(playerBoard);
  }

  function checkPlace(playerBoard) {
    let [coordx, coordy] = getcoord();
    for (let i = 0; i < getLength(); i++) {
      // if (getDirection() === "vertical") {
      //   if (playerBoard[coordx] === undefined) {
      //     failPlace();
      //     return;
      //   }
      //   if (playerBoard[coordx][coordy + i] !== null) {
      //     failPlace();
      //     return;
      //   }
      // } else if (getDirection() === "horizontal") {
      //   if (playerBoard[coordx + i] === undefined) {
      //     failPlace();
      //     return;
      //   }
      //   if (playerBoard[coordx + i][coordy] !== null) {
      //     failPlace();
      //     return;
      //   }
      // }
      function isValidPlacement() {
        const isPlacable = (x, y) =>
          x >= 0 &&
          y >= 0 &&
          playerBoard[x] !== undefined &&
          playerBoard[x][y] === null;

        if (getDirection() === "vertical") {
          return isPlacable(coordx, coordy + i);
        }
        if (getDirection() === "horizontal") {
          return isPlacable(coordx + i, coordy);
        }
        throw new Error("Invalid direction");
      }
      if (isValidPlacement()) {
        // valid placement logic
      } else {
        failPlace();
        return;
      }
    }

    for (let i = 0; i < getLength(); i++) {
      if (getDirection() === "vertical") {
        playerBoard[coordx][coordy + i] = getName();
        setCoordinate([coordx, coordy + i], playerBoard);
      } else if (getDirection() === "horizontal") {
        playerBoard[coordx + i][coordy] = getName();
        setCoordinate([coordx + i, coordy], playerBoard);
      }
    }
    setIsPlaced(true);
  }

  function failPlace() {
    setCoordinate(null);
    setDirection(null);
    setIsPlaced(false);
  }

  function hit() {
    if (hitNum < getLength()) {
      hitNum += 1;
    }
  }

  function isSunk() {
    if (hitNum === getLength()) {
      return true;
    }
    return false;
  }

  return {
    getName,
    getLength,
    getcoord,
    getDirection,
    getIsPlaced,
    placeShip,
    hit,
    isSunk,
  };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.js");


(0,_Game__WEBPACK_IMPORTED_MODULE_0__.initGame)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2VzIjpbIndlYnBhY2s6Ly90ZW1wbGF0ZS8uL3NyYy9HYW1lLmpzIiwid2VicGFjazovL3RlbXBsYXRlLy4vc3JjL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS8uL3NyYy9TaGlwLmpzIiwid2VicGFjazovL3RlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUdhbWVib2FyZCBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRHYW1lKCkge1xuICBjb25zdCBnYW1lQm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgZ2FtZUJvYXJkLnJhbmRvbVBsYWNlQWxsU2hpcCgpO1xuICAvLyB1bml0IHRlc3QgZ2FtZUJvYXJkLnBsYXllci5nYW1lQm9hcmRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gIC8qIHdoaWxlICghZ2FtZUJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgbGV0IGNvb3JkID0gXCJ3aXBcIjsgLy8gRE9NIEV2ZW50IHRoYXQgZ2V0IGNvb3JkXG4gICAgZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICAgIGdhbWVCb2FyZC5uZXh0Um91bmQoKTtcbiAgfSAqL1xufVxuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSBcIi4vU2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVHYW1lYm9hcmQoKSB7XG4gIC8vIGdhbWVib2FyZCBzZXR1cFxuXG4gIGxldCBib2FyZFNpemUgPSAxMDtcblxuICBjb25zdCBQbGF5ZXIgPSBbXG4gICAgeyBpZDogXCJwMVwiLCBwbGF5ZXJUeXBlOiBcInVzZXJcIiwgc2hpcHM6IFtdLCBzaGlwTnVtOiA1LCBwbGF5ZXJCb2FyZDogW10gfSxcbiAgICB7IGlkOiBcInAyXCIsIHBsYXllclR5cGU6IFwiY29tXCIsIHNoaXBzOiBbXSwgc2hpcE51bTogNSwgcGxheWVyQm9hcmQ6IFtdIH0sXG4gIF07XG5cbiAgUGxheWVyLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgIHBsYXllci5zaGlwcy5wdXNoKGNyZWF0ZVNoaXAoW1wiQ2FycmllclwiLCA1XSkpO1xuICAgIHBsYXllci5zaGlwcy5wdXNoKGNyZWF0ZVNoaXAoW1wiQmF0dGxlc2hpcFwiLCA0XSkpO1xuICAgIHBsYXllci5zaGlwcy5wdXNoKGNyZWF0ZVNoaXAoW1wiQ3J1aXNlclwiLCAzXSkpO1xuICAgIHBsYXllci5zaGlwcy5wdXNoKGNyZWF0ZVNoaXAoW1wiU3VibWFyaW5lXCIsIDNdKSk7XG4gICAgcGxheWVyLnNoaXBzLnB1c2goY3JlYXRlU2hpcChbXCJEZXN0cm95ZXJcIiwgMl0pKTtcbiAgfSk7XG5cbiAgUGxheWVyLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRTaXplOyBpKyspIHtcbiAgICAgIHBsYXllci5wbGF5ZXJCb2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFNpemU7IGorKykge1xuICAgICAgICBwbGF5ZXIucGxheWVyQm9hcmRbaV1bal0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmFuZG9tUGxhY2VBbGxTaGlwKCkge1xuICAgIFBsYXllci5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICAgIHBsYXllci5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKCFzaGlwLmdldElzUGxhY2VkKCkgJiYgaSA8IDEwMDApIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgc2hpcC5wbGFjZVNoaXAoXCJyYW5kb21cIiwgYm9hcmRTaXplLCBwbGF5ZXIucGxheWVyQm9hcmQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBbY3VyUGxheWVyLCBuZXh0UGxheWVyXSA9IFBsYXllcjtcblxuICBsZXQgaXNHYW1lRW5kID0gZmFsc2U7XG5cbiAgLy8gZ2FtZSBldmVudHNcblxuICBmdW5jdGlvbiBuZXh0Um91bmQoKSB7XG4gICAgY3VyUGxheWVyID0gbmV4dFBsYXllcjtcbiAgICBpZiAoY3VyUGxheWVyID09PSBQbGF5ZXJbMF0pIHtcbiAgICAgIG5leHRQbGF5ZXIgPSBQbGF5ZXJbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRQbGF5ZXIgPSBQbGF5ZXJbMF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIC8vIGhpdCBvciBub3QgYm9vbGVhblxuICAgIGlmIChcIndpcFwiKSB7XG4gICAgICAvLyByZWNlaXZlci5zaGlwc1s/XS5oaXQoKSBsb2dpY1xuICAgICAgLy8gRE9NIG9wZXJhdGlvblxuICAgICAgaXNBbGxTdW5rKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1pc3NlZEF0dGFjaygpIHtcbiAgICAvLyBET00gb3BlcmF0aW9uXG4gIH1cblxuICBmdW5jdGlvbiBpc0FsbFN1bmsoKSB7XG4gICAgUGxheWVyLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgICAgaWYgKHBsYXllci5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmspKSB7XG4gICAgICAgIGlzR2FtZUVuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGlzR2FtZUVuZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgUGxheWVyLFxuICAgIGlzR2FtZUVuZCxcbiAgICByYW5kb21QbGFjZUFsbFNoaXAsXG4gICAgbmV4dFJvdW5kLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNBbGxTdW5rLFxuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU2hpcChpbmZvID0gW251bGwsIG51bGxdKSB7XG4gIGxldCBbbmFtZSwgbGVuZ3RoXSA9IGluZm87XG4gIGxldCBoaXROdW0gPSAwO1xuICBsZXQgaXNQbGFjZWQgPSBmYWxzZTtcbiAgbGV0IGNvb3JkaW5hdGUgPSBudWxsO1xuICBsZXQgZGlyZWN0aW9uID0gbnVsbDtcblxuICBmdW5jdGlvbiBnZXROYW1lKCkge1xuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRjb29yZCgpIHtcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENvb3JkaW5hdGUoY29vcmQsIHBsYXllckJvYXJkKSB7XG4gICAgaWYgKGNvb3JkICE9IG51bGwpIHtcbiAgICAgIGxldCBbeCwgeV0gPSBjb29yZDtcbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcih4KSB8fCAhTnVtYmVyLmlzSW50ZWdlcih5KSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNvb3JkIG11c3QgYmUgbnVsbCBvciBhcnJheSBvZiBpbnRlZ2Vyc1wiKTtcbiAgICAgIGlmICh4IDwgMCB8fCB4ID4gcGxheWVyQm9hcmQubGVuZ3RoIHx8IHkgPCAwIHx8IHkgPiBwbGF5ZXJCb2FyZC5sZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkIHggb3IgeSBvdXQgb2YgYm9hcmRTaXplXCIpO1xuICAgIH1cbiAgICBjb29yZGluYXRlID0gY29vcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldERpcmVjdGlvbihkaXIpIHtcbiAgICBpZiAoZGlyICE9PSBcInZlcnRpY2FsXCIgJiYgZGlyICE9PSBcImhvcml6b250YWxcIiAmJiBkaXIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRpcmVjdGlvblwiKTtcbiAgICBkaXJlY3Rpb24gPSBkaXI7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJc1BsYWNlZCgpIHtcbiAgICByZXR1cm4gaXNQbGFjZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJc1BsYWNlZChib29sKSB7XG4gICAgaWYgKCEoYm9vbCA9PT0gISFib29sKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIklucHV0IHR5cGUgaXMgbm90IGJvb2xlYW5cIik7XG4gICAgaXNQbGFjZWQgPSBib29sO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHBsYWNlbWVudCwgYm9hcmRTaXplLCBwbGF5ZXJCb2FyZCkge1xuICAgIGlmIChwbGFjZW1lbnQgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIHdoaWxlICghZ2V0SXNQbGFjZWQoKSAmJiBpIDwgMTAwMCkge1xuICAgICAgICBpKys7XG4gICAgICAgIHNldENvb3JkaW5hdGUoXG4gICAgICAgICAgW1xuICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmRTaXplKSxcbiAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvYXJkU2l6ZSksXG4gICAgICAgICAgXSxcbiAgICAgICAgICBwbGF5ZXJCb2FyZCxcbiAgICAgICAgKTtcbiAgICAgICAgc2V0RGlyZWN0aW9uKFtcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV0pO1xuICAgICAgICBjaGVja1BsYWNlKHBsYXllckJvYXJkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IFtjb29yZCwgZGlyXSA9IHBsYWNlbWVudDtcbiAgICBzZXRDb29yZGluYXRlKGNvb3JkLCBwbGF5ZXJCb2FyZCk7XG4gICAgc2V0RGlyZWN0aW9uKGRpcik7XG4gICAgY2hlY2tQbGFjZShwbGF5ZXJCb2FyZCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1BsYWNlKHBsYXllckJvYXJkKSB7XG4gICAgbGV0IFtjb29yZHgsIGNvb3JkeV0gPSBnZXRjb29yZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgLy8gaWYgKGdldERpcmVjdGlvbigpID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIC8vICAgaWYgKHBsYXllckJvYXJkW2Nvb3JkeF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gICAgIGZhaWxQbGFjZSgpO1xuICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBpZiAocGxheWVyQm9hcmRbY29vcmR4XVtjb29yZHkgKyBpXSAhPT0gbnVsbCkge1xuICAgICAgLy8gICAgIGZhaWxQbGFjZSgpO1xuICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSBlbHNlIGlmIChnZXREaXJlY3Rpb24oKSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIC8vICAgaWYgKHBsYXllckJvYXJkW2Nvb3JkeCArIGldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vICAgICBmYWlsUGxhY2UoKTtcbiAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgaWYgKHBsYXllckJvYXJkW2Nvb3JkeCArIGldW2Nvb3JkeV0gIT09IG51bGwpIHtcbiAgICAgIC8vICAgICBmYWlsUGxhY2UoKTtcbiAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cbiAgICAgIGZ1bmN0aW9uIGlzVmFsaWRQbGFjZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGlzUGxhY2FibGUgPSAoeCwgeSkgPT5cbiAgICAgICAgICB4ID49IDAgJiZcbiAgICAgICAgICB5ID49IDAgJiZcbiAgICAgICAgICBwbGF5ZXJCb2FyZFt4XSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgcGxheWVyQm9hcmRbeF1beV0gPT09IG51bGw7XG5cbiAgICAgICAgaWYgKGdldERpcmVjdGlvbigpID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICByZXR1cm4gaXNQbGFjYWJsZShjb29yZHgsIGNvb3JkeSArIGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXREaXJlY3Rpb24oKSA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICByZXR1cm4gaXNQbGFjYWJsZShjb29yZHggKyBpLCBjb29yZHkpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGlyZWN0aW9uXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWRQbGFjZW1lbnQoKSkge1xuICAgICAgICAvLyB2YWxpZCBwbGFjZW1lbnQgbG9naWNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhaWxQbGFjZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICBpZiAoZ2V0RGlyZWN0aW9uKCkgPT09IFwidmVydGljYWxcIikge1xuICAgICAgICBwbGF5ZXJCb2FyZFtjb29yZHhdW2Nvb3JkeSArIGldID0gZ2V0TmFtZSgpO1xuICAgICAgICBzZXRDb29yZGluYXRlKFtjb29yZHgsIGNvb3JkeSArIGldLCBwbGF5ZXJCb2FyZCk7XG4gICAgICB9IGVsc2UgaWYgKGdldERpcmVjdGlvbigpID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBwbGF5ZXJCb2FyZFtjb29yZHggKyBpXVtjb29yZHldID0gZ2V0TmFtZSgpO1xuICAgICAgICBzZXRDb29yZGluYXRlKFtjb29yZHggKyBpLCBjb29yZHldLCBwbGF5ZXJCb2FyZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNldElzUGxhY2VkKHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmFpbFBsYWNlKCkge1xuICAgIHNldENvb3JkaW5hdGUobnVsbCk7XG4gICAgc2V0RGlyZWN0aW9uKG51bGwpO1xuICAgIHNldElzUGxhY2VkKGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICBpZiAoaGl0TnVtIDwgZ2V0TGVuZ3RoKCkpIHtcbiAgICAgIGhpdE51bSArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICBpZiAoaGl0TnVtID09PSBnZXRMZW5ndGgoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0TmFtZSxcbiAgICBnZXRMZW5ndGgsXG4gICAgZ2V0Y29vcmQsXG4gICAgZ2V0RGlyZWN0aW9uLFxuICAgIGdldElzUGxhY2VkLFxuICAgIHBsYWNlU2hpcCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0R2FtZSB9IGZyb20gXCIuL0dhbWVcIjtcblxuaW5pdEdhbWUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==