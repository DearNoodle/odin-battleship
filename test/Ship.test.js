import createShip from "../src/Ship";

test("creates ship with correct name and length", () => {
  const ship = createShip(["cruiser", 3]);
  expect(ship.getName()).toBe("cruiser");
  expect(ship.getLength()).toBe(3);
});

test("ship is not placed initially", () => {
  const ship = createShip();
  expect(ship.getIsPlaced()).toBe(false);
});

test("ship has no coord and dir initially", () => {
  const ship = createShip();
  expect(ship.getCoordinate()).toBe(null);
  expect(ship.getCoordinate()).toBe(null);
});

test("registers hits and sinks correctly", () => {
  const ship = createShip(["submarine", 3]);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("places ship manually at given coordinates and direction", () => {
  const ship = createShip(["battleship", 4]);
  const player = {
    playerBoard: [],
  };
  for (let i = 0; i < 10; i++) {
    player.playerBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      player.playerBoard[i][j] = { shipHere: null, isAttacked: false };
    }
  }
  ship.placeShip(jest.fn(), "manual", player, 10, [2, 3], "horizontal");
  expect(ship.getCoordinate()).toEqual([2, 3]);
  expect(ship.getDirection()).toBe("horizontal");
  expect(ship.getIsPlaced()).toBe(true);
  // Check if ship segments are placed correctly on the board
  expect(player.playerBoard[2][3].shipHere).toBe("battleship");
  expect(player.playerBoard[2][4].shipHere).toBe("battleship");
  expect(player.playerBoard[2][5].shipHere).toBe("battleship");
  expect(player.playerBoard[2][6].shipHere).toBe("battleship");
});

test("places multiple ships", () => {
  const bigship = createShip(["bigship", 4]);
  const smallship = createShip(["smallship", 2]);
  const tinyship = createShip(["tinyship", 1]);
  const player = {
    playerBoard: [],
  };
  for (let i = 0; i < 10; i++) {
    player.playerBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      player.playerBoard[i][j] = { shipHere: null, isAttacked: false };
    }
  }
  bigship.placeShip(jest.fn(), "manual", player, 10, [2, 2], "horizontal");
  smallship.placeShip(jest.fn(), "manual", player, 10, [3, 3], "vertical");
  tinyship.placeShip(jest.fn(), "manual", player, 10, [4, 4], "horizontal");
  expect(bigship.getIsPlaced()).toBe(true);
  expect(smallship.getIsPlaced()).toBe(true);
  expect(tinyship.getIsPlaced()).toBe(true);
});

test("ship not allowed to place outside board", () => {
  const bigship = createShip(["bigship", 4]);
  const player = {
    playerBoard: [],
  };
  for (let i = 0; i < 10; i++) {
    player.playerBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      player.playerBoard[i][j] = { shipHere: null, isAttacked: false };
    }
  }
  bigship.placeShip(jest.fn(), "manual", player, 10, [1, 8], "horizontal");
  expect(bigship.getIsPlaced()).toBe(false);
});

test("ship placement not allowed to overlap", () => {
  const bigship = createShip(["bigship", 4]);
  const smallship = createShip(["smallship", 2]);
  const player = {
    playerBoard: [],
  };
  for (let i = 0; i < 10; i++) {
    player.playerBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      player.playerBoard[i][j] = { shipHere: null, isAttacked: false };
    }
  }
  bigship.placeShip(jest.fn(), "manual", player, 10, [1, 1], "horizontal");
  smallship.placeShip(jest.fn(), "manual", player, 10, [1, 2], "vertical");
  expect(bigship.getIsPlaced()).toBe(true);
  expect(smallship.getIsPlaced()).toBe(false);
});

test("fail placing ship has no coord and dir", () => {
  const bigship = createShip(["bigship", 4]);
  const player = {
    playerBoard: [],
  };
  for (let i = 0; i < 10; i++) {
    player.playerBoard[i] = [];
    for (let j = 0; j < 10; j++) {
      player.playerBoard[i][j] = { shipHere: null, isAttacked: false };
    }
  }
  bigship.placeShip(jest.fn(), "manual", player, 10, [1, 8], "horizontal");
  expect(bigship.getCoordinate()).toBe(null);
  expect(bigship.getDirection()).toBe(null);
});
