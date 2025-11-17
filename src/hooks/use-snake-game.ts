"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSound } from "./use-sound";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
export type GameStatus = "idle" | "playing" | "gameOver" | "paused";

export type GameState = {
  snake: Position[];
  food: Position;
  direction: Direction;
};

const createInitialState = (boardSize: number): GameState => {
  const head = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
  return {
    snake: [head, { x: head.x - 1, y: head.y }, { x: head.x - 2, y: head.y }],
    food: getRandomPosition(boardSize, [head]),
    direction: "RIGHT",
  };
};

const getRandomPosition = (size: number, snake: Position[] = []): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  } while (
    snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    )
  );
  return position;
};

export const useSnakeGame = (boardSize: number) => {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialState(boardSize)
  );
  const [speed, setSpeed] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const currentDirectionRef = useRef<Direction>("RIGHT");

  const playEatSound = useSound("/Snake-Eat.mp3", 0.5);
  const playGameOverSound = useSound("/Snake-GameOver.mp3");

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setGameState(createInitialState(boardSize));
    currentDirectionRef.current = "RIGHT";
    setSpeed(200);
    setScore(0);
    setGameStatus("playing");
  }, [boardSize]);

  const handleDirectionChange = useCallback((newDirection: Direction) => {
    const currentDirection = currentDirectionRef.current;
    const opposite =
      (currentDirection === "UP" && newDirection === "DOWN") ||
      (currentDirection === "DOWN" && newDirection === "UP") ||
      (currentDirection === "LEFT" && newDirection === "RIGHT") ||
      (currentDirection === "RIGHT" && newDirection === "LEFT");

    if (!opposite) {
      currentDirectionRef.current = newDirection;
    }
  }, []);

  useEffect(() => {
    if (gameStatus !== "playing") {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(() => {
      // Fix: Ensure speed is a number
      setGameState((prevGameState) => {
        const { snake, food } = prevGameState;
        const direction = currentDirectionRef.current;

        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        if (
          head.x < 0 ||
          head.x >= boardSize ||
          head.y < 0 ||
          head.y >= boardSize ||
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setGameStatus("gameOver");
          playGameOverSound();
          return prevGameState;
        }

        newSnake.unshift(head);

        let newFood = food;

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1);
          playEatSound();
          newFood = getRandomPosition(boardSize, newSnake);
          setSpeed((prevSpeed) => Math.max(50, (prevSpeed || 200) - 5));
        } else {
          newSnake.pop();
        }

        return {
          snake: newSnake,
          food: newFood,
          direction: direction,
        };
      });
    }, speed || 200); // Default to 200 if speed is null

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [speed, gameStatus, boardSize, playEatSound, playGameOverSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== "playing") return;
      let newDirection: Direction | null = null;
      switch (e.key) {
        case "ArrowUp":
          newDirection = "UP";
          break;
        case "ArrowDown":
          newDirection = "DOWN";
          break;
        case "ArrowLeft":
          newDirection = "LEFT";
          break;
        case "ArrowRight":
          newDirection = "RIGHT";
          break;
      }
      if (newDirection) {
        e.preventDefault();
        handleDirectionChange(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDirectionChange, gameStatus]);

  return { gameState, score, gameStatus, startGame, handleDirectionChange };
};
