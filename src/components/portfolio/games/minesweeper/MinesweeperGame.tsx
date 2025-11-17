"use client";

import React from "react";
import { useMinesweeper } from "@/hooks/use-minesweeper";
import { useSound } from "@/hooks/use-sound";

function DigitDisplay({ value }: { value: number }) {
  const s = String(Math.max(0, Math.min(999, value))).padStart(3, "0");

  return (
    <div className="flex gap-0 bg-black px-1 py-1 border border-[#400000]">
      {s.split("").map((d, i) => (
        <img
          key={i}
          src={`/minesweeper/digits/${d}.png`}
          width={13}
          height={23}
          draggable={false}
          alt={d}
        />
      ))}
    </div>
  );
}

function FaceButton({
  state,
  onClick,
}: {
  state: "playing" | "won" | "lost";
  onClick: () => void;
}) {
  const map = {
    playing: "/minesweeper/faces/smile.png",
    won: "/minesweeper/faces/win.png",
    lost: "/minesweeper/faces/dead.png",
  };

  return (
    <button
      onClick={onClick}
      className="
        w-[32px] h-[32px]
        flex items-center justify-center
        bg-[#C0C0C0]
        border-[3px] border-[#FFFFFF] border-b-[#808080] border-r-[#808080]
        active:border-t-[#808080] active:border-l-[#808080]
      "
    >
      <img
        src={map[state]}
        width={26}
        height={26}
        draggable={false}
        alt="reset"
      />
    </button>
  );
}

function CellView({
  cell,
  onLeftClick,
  onRightClick,
}: {
  cell: any;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}) {
  const { isRevealed, isFlagged, isMine, adjacentMines } = cell;

  let tile = "/minesweeper/tiles/tile.png";
  let content: React.ReactNode = null;

  if (!isRevealed) {
    if (isFlagged) {
      content = (
        <img
          src="/minesweeper/mines/flag.png"
          width={32}
          height={32}
          alt="flag"
          draggable={false}
        />
      );
    }
  } else {
    tile = "/minesweeper/tiles/tiles.png";

    if (isMine) {
      content = (
        <img
          src="/minesweeper/mines/mine.png"
          width={32}
          height={32}
          alt="mine"
          draggable={false}
        />
      );
    } else if (adjacentMines > 0) {
      content = (
        <img
          src={`/minesweeper/numbers/${adjacentMines}.png`}
          width={32}
          height={32}
          alt={`${adjacentMines}`}
          draggable={false}
        />
      );
    }
  }

  return (
    <button
      onClick={onLeftClick}
      onContextMenu={(e) => onRightClick(e)}
      className="relative w-[26px] h-[26px] p-0 m-0 border-none"
    >
      <img
        src={tile}
        width={26}
        height={26}
        draggable={false}
        alt=""
        className="pointer-events-none"
      />

      {content && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {content}
        </div>
      )}
    </button>
  );
}

/* -----------------------------------------------------
   BUSCAMINAS + BOTÓN DE CERRAR
------------------------------------------------------ */
export function MinesweeperGame({
  rows = 16,
  cols = 16,
  mines = 40,
  onClose,
}: {
  rows?: number;
  cols?: number;
  mines?: number;
  onClose: () => void;
}) {
  const playClick = useSound("/minecraft-click.mp3");
  const playFlag = useSound("/flag.mp3", 0.5, { playbackRate: 1.2 });
  const playWin = useSound("/win.mp3");
  const playLose = useSound("/explosion.mp3", 0.5);

  const {
    board,
    gameState,
    minesLeft,
    timer,
    resetGame,
    handleLeftClick,
    handleRightClick,
  } = useMinesweeper(rows, cols, mines, {
    onCellClick: playClick,
    onFlag: playFlag,
    onWin: playWin,
    onLose: playLose,
  });

  return (
    <div
      className="
        relative
        inline-block p-3
        bg-[#C0C0C0]
        border-[4px] border-[#FFFFFF] border-b-[#808080] border-r-[#808080]
        shadow-[4px_4px_0px_#000]
        select-none
      "
      onClick={(e) => e.stopPropagation()} // evita que el Window pierda foco
    >
      {/* Botón de cerrar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="
          absolute -top-0 -right-0
          w-6 h-6
          flex items-center justify-center
          bg-red-600 text-white text-sm font-bold
           shadow
          hover:bg-red-700
        "
      >
        ✕
      </button>

      {/* PANEL SUPERIOR */}
      <div
        className="
          flex justify-between items-center mb-2
          bg-[#C0C0C0]
          px-3 py-2
          border-2 border-[#808080] border-t-[#FFFFFF] border-l-[#FFFFFF]
        "
      >
        <DigitDisplay value={minesLeft} />
        <FaceButton state={gameState} onClick={resetGame} />
        <DigitDisplay value={timer} />
      </div>

      {/* TABLERO */}
      <div
        className="grid bg-[#C0C0C0] p-[6px] border-[3px] border-[#FFFFFF] border-b-[#808080] border-r-[#808080]"
        style={{
          gridTemplateColumns: `repeat(${cols}, 26px)`,
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <CellView
              key={`${r}-${c}`}
              cell={cell}
              onLeftClick={() => handleLeftClick(r, c)}
              onRightClick={(e) => handleRightClick(e, r, c)}
            />
          ))
        )}
      </div>
    </div>
  );
}
