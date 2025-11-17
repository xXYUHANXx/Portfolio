"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type Board = Cell[][];

export type GameState = "playing" | "won" | "lost";

export type UseMinesweeperOptions = {
  onCellClick?: () => void;
  onFlag?: () => void;
  onWin?: () => void;
  onLose?: () => void;
};

/* ----------------------------------------------------
   Crear tablero vacío SIN minas (para primera jugada segura)
---------------------------------------------------- */
const createEmptyBoard = (rows: number, cols: number): Board =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

/* ----------------------------------------------------
   Función para colocar minas evitando la celda de 1er click
---------------------------------------------------- */
const placeMines = (
  board: Board,
  rows: number,
  cols: number,
  mines: number,
  safeR: number,
  safeC: number
): Board => {
  // Deep copy
  const newBoard = board.map((row) => row.map((c) => ({ ...c })));

  // Construimos lista de todas las posiciones excepto la segura
  const positions: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) {
        continue; // zona segura
      }
      positions.push({ r, c });
    }
  }

  // Shuffle
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  // Poner minas
  for (let i = 0; i < mines; i++) {
    const { r, c } = positions[i];
    newBoard[r][c].isMine = true;
  }

  // Calcular números
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newBoard[r][c].isMine) continue;

      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            newBoard[nr][nc].isMine
          ) {
            count++;
          }
        }
      }
      newBoard[r][c].adjacentMines = count;
    }
  }

  return newBoard;
};

/* ----------------------------------------------------
   Flood fill (revelado de zonas vacías)
---------------------------------------------------- */
const floodReveal = (board: Board, r: number, c: number): Board => {
  const newBoard = board.map((row) => row.map((c) => ({ ...c })));

  const stack = [{ r, c }];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const { r, c } = stack.pop()!;
    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const cell = newBoard[r][c];
    if (cell.isFlagged || cell.isRevealed) continue;

    cell.isRevealed = true;

    if (cell.adjacentMines === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < newBoard.length &&
            nc >= 0 &&
            nc < newBoard[0].length
          ) {
            stack.push({ r: nr, c: nc });
          }
        }
      }
    }
  }

  return newBoard;
};

/* ----------------------------------------------------
   MAIN HOOK
---------------------------------------------------- */
export const useMinesweeper = (
  rows: number,
  cols: number,
  mines: number,
  options: UseMinesweeperOptions = {}
) => {
  const { onCellClick, onFlag, onWin, onLose } = options;
  const [board, setBoard] = useState<Board>(() => createEmptyBoard(rows, cols));
  const [gameState, setGameState] = useState<GameState>("playing");
  const [minesLeft, setMinesLeft] = useState(mines);
  const [timer, setTimer] = useState(0);

  const firstClick = useRef(true);

  /* Timer -------------------------------------------------- */
  useEffect(() => {
    if (gameState !== "playing" || firstClick.current) return;

    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, firstClick.current]);

  /* Reset -------------------------------------------------- */
  const resetGame = useCallback(() => {
    firstClick.current = true;
    setBoard(createEmptyBoard(rows, cols));
    setGameState("playing");
    setMinesLeft(mines);
    setTimer(0);
  }, [rows, cols, mines]);

  /* ----------------------------------------------------
       HANDLE LEFT CLICK
    ---------------------------------------------------- */
  const handleLeftClick = (r: number, c: number) => {
    if (gameState !== "playing") return;

    onCellClick?.();

    let newBoard = board;

    if (firstClick.current) {
      newBoard = placeMines(newBoard, rows, cols, mines, r, c);
      firstClick.current = false;
    } else {
      newBoard = newBoard.map((row) => row.map((cell) => ({ ...cell })));
    }

    const cell = newBoard[r][c];
    if (cell.isFlagged || cell.isRevealed) return;

    if (cell.isMine) {
      newBoard.forEach((row) =>
        row.forEach((cell) => {
          if (cell.isMine) cell.isRevealed = true;
        })
      );
      setBoard(newBoard);
      setGameState("lost");
      onLose?.();
      return;
    }

    newBoard = floodReveal(newBoard, r, c);
    setBoard(newBoard);

    const revealed = newBoard.flat().filter((c) => c.isRevealed).length;
    if (revealed === rows * cols - mines) {
      setGameState("won");
      onWin?.();
    }
  };

  /* ----------------------------------------------------
       HANDLE RIGHT CLICK (toggle flag)
    ---------------------------------------------------- */
  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState !== "playing" || firstClick.current) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    const cell = newBoard[r][c];
    if (cell.isRevealed) return;

    onFlag?.();

    if (cell.isFlagged) {
      cell.isFlagged = false;
      setMinesLeft((m) => m + 1);
    } else {
      cell.isFlagged = true;
      setMinesLeft((m) => m - 1);
    }

    setBoard(newBoard);
  };

  return {
    board,
    gameState,
    resetGame,
    minesLeft,
    timer,
    handleLeftClick,
    handleRightClick,
  };
};
