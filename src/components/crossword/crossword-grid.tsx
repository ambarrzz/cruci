"use client";

import * as React from 'react';
import { puzzleData } from '@/lib/puzzle-data';
import { cn } from '@/lib/utils';

type CrosswordGridProps = {
  grid: string[][];
  correctCells: boolean[][];
  activeCells: Map<string, { number: number | null }>;
  onInputChange: (row: number, col: number, value: string) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>;
};

export default function CrosswordGrid({ grid, correctCells, activeCells, onInputChange, inputRefs }: CrosswordGridProps) {
  
  const [focusedCell, setFocusedCell] = React.useState<{row: number, col: number} | null>(null);

  React.useEffect(() => {
    if (inputRefs.current[0][0]) {
      // Find first input cell and focus it.
      for (let row = 0; row < puzzleData.gridSize; row++) {
        for (let col = 0; col < puzzleData.gridSize; col++) {
          if (activeCells.has(`${row}-${col}`)) {
             inputRefs.current[row][col]?.focus();
             return;
          }
        }
      }
    }
  }, [activeCells, inputRefs]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    let nextRow = row, nextCol = col;
    let moved = false;
    const currentOrientation = getWordOrientation(row, col);
    
    switch (e.key) {
      case 'ArrowUp':
        nextRow--;
        moved = true;
        break;
      case 'ArrowDown':
        nextRow++;
        moved = true;
        break;
      case 'ArrowLeft':
        nextCol--;
        moved = true;
        break;
      case 'ArrowRight':
        nextCol++;
        moved = true;
        break;
      case 'Backspace':
        if (!grid[row][col]) {
           if (currentOrientation === 'across') {
             nextCol--;
           } else {
             nextRow--;
           }
           moved = true;
        }
        break;
    }

    if (moved) {
      e.preventDefault();
      while(nextRow >= 0 && nextRow < puzzleData.gridSize && nextCol >= 0 && nextCol < puzzleData.gridSize) {
        if (activeCells.has(`${nextRow}-${nextCol}`)) {
          inputRefs.current[nextRow][nextCol]?.focus();
          break;
        }
        if (e.key === 'ArrowUp') nextRow--;
        else if (e.key === 'ArrowDown') nextRow++;
        else if (e.key === 'ArrowLeft') nextCol--;
        else if (e.key === 'ArrowRight') nextCol++;
        else if (e.key === 'Backspace') {
            if (currentOrientation === 'across') {
              if (activeCells.has(`${row}-${nextCol}`)) {
                  inputRefs.current[row][nextCol]?.focus();
              }
            } else {
              if (activeCells.has(`${nextRow}-${col}`)) {
                  inputRefs.current[nextRow][col]?.focus();
              }
            }
            break;
        }
        else break;
      }
    }
  };

  const getWordOrientation = (row: number, col: number) => {
    const downWord = puzzleData.words.find(w => w.orientation === 'down' && col === w.col && row >= w.row && row < w.row + w.answer.length);
    if(downWord) return 'down';
    return 'across';
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>, row: number, col: number) => {
    const target = e.target as HTMLInputElement;
    let { value } = target;

    value = value.toUpperCase();
    if (value.length > 1) {
      value = value.charAt(value.length-1);
    }
    onInputChange(row, col, value);
    
    if (value) {
      let nextRow = row, nextCol = col;
      const currentOrientation = getWordOrientation(row, col);

      if (currentOrientation === 'across') {
         nextCol++;
      } else {
         nextRow++;
      }

      if (activeCells.has(`${nextRow}-${nextCol}`)) {
        inputRefs.current[nextRow][nextCol]?.focus();
      }
    }
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${puzzleData.gridSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${puzzleData.gridSize}, minmax(0, 1fr))`,
        aspectRatio: '1 / 1',
        maxWidth: 'calc(100vh - 220px)',
        maxHeight: 'calc(100vw - 40px)',
        width: '100%',
        margin: 'auto',
      }}
    >
      {Array.from({ length: puzzleData.gridSize }).map((_, row) =>
        Array.from({ length: puzzleData.gridSize }).map((_, col) => {
          const cellKey = `${row}-${col}`;
          const isInput = activeCells.has(cellKey);
          const cellNumber = activeCells.get(cellKey)?.number;
          const isFocused = focusedCell?.row === row && focusedCell?.col === col;

          return (
            <div
              key={cellKey}
              className={cn(
                'relative flex items-center justify-center border border-muted/50',
                isInput ? 'bg-card' : 'bg-muted/30',
                correctCells[row][col] && 'bg-accent/80',
                isFocused && 'ring-2 ring-primary ring-inset'
              )}
            >
              {cellNumber && (
                <span className="absolute top-0.5 left-1 text-[10px] sm:text-xs text-muted-foreground select-none">
                  {cellNumber}
                </span>
              )}
              {isInput && (
                <input
                  ref={el => (inputRefs.current[row][col] = el)}
                  type="text"
                  maxLength={1}
                  value={grid[row][col] || ''}
                  onFocus={() => setFocusedCell({row, col})}
                  onBlur={() => setFocusedCell(null)}
                  onInput={(e) => handleInput(e, row, col)}
                  onKeyDown={(e) => handleKeyDown(e, row, col)}
                  className={cn(
                    'w-full h-full bg-transparent text-center text-base sm:text-lg md:text-xl font-bold uppercase p-0 border-none focus:outline-none focus:ring-0 rounded-none',
                     correctCells[row][col] ? 'text-accent-foreground caret-accent-foreground' : 'text-foreground caret-primary'
                  )}
                  aria-label={`casilla ${row}, ${col}`}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
