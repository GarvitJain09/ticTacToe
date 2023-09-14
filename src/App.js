import { useCallback, useEffect, useMemo, useState } from "react";
import "./styles.css";
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const App = () => {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(""));
  const [winningPlayer, setWinningPlayer] = useState("");
  const [isX, setisX] = useState(true);
  const NextPlayer = useMemo(() =>
    gameBoard.every((entry) => !!entry) ? null : (
      <div className="instruction">Next player: {isX ? "X" : "O"}</div>
    )
  );

  const WinningPlayer = useMemo(() => (
    <div className="instruction">Winner: {winningPlayer}</div>
  ));

  const Reset = useMemo(() => (
    <button
      className="button"
      onClick={() => {
        setGameBoard(Array(9).fill(""));
        setisX(true);
        setWinningPlayer("");
      }}
    >
      Reset
    </button>
  ));
  const onClick = useCallback(
    (id) => {
      const newArray = [...gameBoard];
      if (winninerCombo() || newArray[id]) {
        return;
      }
      newArray[id] = isX ? "X" : "O";
      setGameBoard(() => newArray);
      setisX(!isX);
    },
    [isX]
  );

  const boardGame = () => {
    return gameBoard.map((board, id) => {
      return (
        <div className="square" key={id} onClick={() => onClick(id)}>
          {gameBoard[id]}
        </div>
      );
    });
  };
  const winninerCombo = useCallback(() => {
    return winningCombos.some((combo) => {
      const [idx1, idx2, idx3] = combo;
      const marks = [gameBoard[idx1], gameBoard[idx2], gameBoard[idx3]];
      const [firstMark] = marks;
      const isWinningCombo =
        !!firstMark && marks.every((mark) => mark === firstMark);
      if (isWinningCombo) {
        setWinningPlayer(firstMark);
        return true;
      }
      return null;
    });
  }, [isX]);
  useEffect(() => {
    winninerCombo();
  }, [isX]);
  console.log(gameBoard.every((entry) => !!entry));

  return (
    <div className="game">
      <div className="game-board">
        <div className="container">
          {winningPlayer ? WinningPlayer : NextPlayer}
          {Reset}
          <div className="board">{boardGame()}</div>
        </div>
      </div>
    </div>
  );
};
export default App;
