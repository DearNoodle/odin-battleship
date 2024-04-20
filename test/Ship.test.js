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

test("throws error for invalid coordinates", () => {
  const ship = createShip();
  expect(() => ship.setCoordinate([-1, 5])).toThrow();
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
    playerBoard: Array(10).fill(
      Array(10).fill({ shipHere: null, isAttacked: false }),
    ),
  };
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
