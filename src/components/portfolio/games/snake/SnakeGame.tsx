"use client";

import React, { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import {
  useSnakeGame,
  type Position,
  type Direction,
} from "@/hooks/use-snake-game";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const BOARD_SIZE = 20;

const getSegmentClasses = (
  snake: Position[],
  index: number,
  direction: Direction
): string => {
  const current = snake[index];
  const next = snake[index - 1]; // Segmento hacia la cabeza
  const prev = snake[index + 1]; // Segmento hacia la cola

  // 1. Cabeza (index === 0): Semi-redondeada en la dirección de movimiento.
  if (index === 0) {
    // Usamos 'xl' para un redondeo notable en la dirección de avance
    if (direction === "RIGHT") return "rounded-r-xl";
    if (direction === "LEFT") return "rounded-l-xl";
    if (direction === "UP") return "rounded-t-xl";
    if (direction === "DOWN") return "rounded-b-xl";
    return "";
  }

  // 2. Cola (sin segmento posterior): Semi-redondeada opuesta a la dirección del segmento anterior.
  if (!prev) {
    // Usamos 'xl' para un redondeo notable en la dirección opuesta al cuerpo
    if (current.x < next.x) return "rounded-l-xl"; // Cuerpo viene de la derecha (next.x > current.x)
    if (current.x > next.x) return "rounded-r-xl"; // Cuerpo viene de la izquierda (next.x < current.x)
    if (current.y < next.y) return "rounded-t-xl"; // Cuerpo viene de abajo (next.y > current.y)
    if (current.y > next.y) return "rounded-b-xl"; // Cuerpo viene de arriba (next.y < current.y)
    return "";
  }

  // 3. Esquinas (Cuerpo que no es ni cabeza ni cola y está girando)
  const prevToCurrentX = current.x - prev.x;
  const prevToCurrentY = current.y - prev.y;
  const currentToNextX = next.x - current.x;
  const currentToNextY = next.y - current.y;

  // Si las direcciones cambian, es una esquina (giro)
  if (prevToCurrentX !== currentToNextX || prevToCurrentY !== currentToNextY) {
    // De UP(-Y) a RIGHT(+X) ó de LEFT(-X) a DOWN(+Y) -> Redondeo inferior-derecha (TL)
    if (
      (prevToCurrentY === -1 && currentToNextX === 1) ||
      (prevToCurrentX === -1 && currentToNextY === 1)
    ) {
      return "rounded-tl-full";
    }

    // De DOWN(+Y) a RIGHT(+X) ó de LEFT(-X) a UP(-Y) -> Redondeo superior-derecha (TR)
    else if (
      (prevToCurrentY === 1 && currentToNextX === 1) ||
      (prevToCurrentX === -1 && currentToNextY === -1)
    ) {
      return "rounded-bl-full";
    }

    // De UP(-Y) a LEFT(-X) ó de RIGHT(+X) a DOWN(+Y) -> Redondeo inferior-izquierda (TR)
    else if (
      (prevToCurrentY === -1 && currentToNextX === -1) ||
      (prevToCurrentX === 1 && currentToNextY === 1)
    ) {
      return "rounded-tr-full";
    }

    // De DOWN(+Y) a LEFT(-X) ó de RIGHT(+X) a UP(-Y) -> Redondeo superior-izquierda (BR)
    else if (
      (prevToCurrentY === 1 && currentToNextX === -1) ||
      (prevToCurrentX === 1 && currentToNextY === -1)
    ) {
      return "rounded-br-full";
    }
  }

  // 4. Cuerpo Recto (index > 0 y no es cola ni esquina)
  return "";
};

// -----------------------------------------------------------------------------
// Componente principal del juego de la serpiente
// -----------------------------------------------------------------------------
export function SnakeGame({ onBack }: { onBack: () => void }) {
  const { gameState, score, gameStatus, startGame, handleDirectionChange } =
    useSnakeGame(BOARD_SIZE);

  const boardRef = React.useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = React.useState(0);

  // Efecto para calcular el tamaño del tablero y recalcular al redimensionar
  React.useEffect(() => {
    if (boardRef.current) {
      setBoardWidth(boardRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (boardRef.current) {
        setBoardWidth(boardRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cellSize = boardWidth / BOARD_SIZE;

  // Lógica para detección de gestos táctiles (Swipe)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const MIN_SWIPE_DISTANCE = 30;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameStatus !== "playing") return;
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current || gameStatus !== "playing") return;

    const touchEndPos = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
    const dx = touchEndPos.x - touchStartPos.current.x;
    const dy = touchEndPos.y - touchStartPos.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > MIN_SWIPE_DISTANCE) {
        handleDirectionChange(dx > 0 ? "RIGHT" : "LEFT");
      }
    } else {
      if (Math.abs(dy) > MIN_SWIPE_DISTANCE) {
        handleDirectionChange(dy > 0 ? "DOWN" : "UP");
      }
    }
    touchStartPos.current = null;
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 text-gray-800 font-mono">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b-2 border-gray-300">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-black/10"
          aria-label="Back"
        >
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold font-display">SNAKE</h1>
          <p className="text-lg">Score: {score}</p>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Game Board */}
      <div
        className="flex-grow flex items-center justify-center p-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={boardRef}
          className="relative bg-gray-200 shadow-xl border-4 border-gray-800"
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            maxWidth: "400px",
          }}
        >
          {/* Overlays */}
          {gameStatus !== "playing" && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 text-white">
              {gameStatus === "idle" && (
                <>
                  <h2 className="text-3xl font-display text-green-400 font-bold">
                    SNAKE
                  </h2>
                  <button
                    onClick={startGame}
                    className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-gray-800 font-extrabold text-lg rounded-xl shadow-lg transition-colors"
                  >
                    START GAME
                  </button>
                </>
              )}
              {gameStatus === "gameOver" && (
                <>
                  <h2 className="text-3xl font-display text-red-500 font-bold">
                    GAME OVER
                  </h2>
                  <p className="text-xl mt-1">Final Score: {score}</p>
                  <button
                    onClick={startGame}
                    className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-gray-800 font-extrabold text-lg rounded-xl shadow-lg transition-colors"
                  >
                    RESTART
                  </button>
                </>
              )}
            </div>
          )}

          {/* Renderizado de la Serpiente */}
          {gameState.snake.map((segment, index) => (
            <motion.div
              key={index}
              className={cn(
                "absolute transition-colors duration-100",
                index === 0 ? "bg-green-700 shadow-md" : "bg-green-500",
                getSegmentClasses(gameState.snake, index)
              )}
              initial={false}
              animate={{
                x: segment.x * cellSize,
                y: segment.y * cellSize,
              }}
              style={{
                width: cellSize,
                height: cellSize,
              }}
              transition={{
                duration: 0.05,
                ease: "linear",
              }}
            />
          ))}

          {/* Renderizado de la Comida (Manzana) */}
          <motion.div
            className="absolute"
            initial={false}
            animate={{
              x: gameState.food.x * cellSize,
              y: gameState.food.y * cellSize,
            }}
            style={{
              width: cellSize,
              height: cellSize,
            }}
            transition={{ duration: 0.05, ease: "linear" }}
          >
            <div className="w-full h-full flex items-center justify-center p-[10%]">
              <div className="w-full h-full bg-red-600 rounded-full relative shadow-inner">
                {/* Tallo */}
                <span
                  className="absolute bg-yellow-900 rounded-t-full"
                  style={{
                    width: "15%",
                    height: "25%",
                    top: "-10%",
                    left: "43%",
                    zIndex: 1,
                  }}
                />
                {/* Hoja */}
                <span
                  className="absolute bg-green-800"
                  style={{
                    width: "30%",
                    height: "30%",
                    top: "-15%",
                    left: "50%",
                    transform: "rotate(45deg)",
                    borderRadius: "50% 0 50% 0",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="p-4 text-center text-xs text-gray-500">
        <p>Use arrow keys or swipe to control the snake</p>
      </div>
    </div>
  );
}
