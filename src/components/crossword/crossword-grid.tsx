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
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    let nextRow = row, nextCol = col;
    let moved = false;
    
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
          const word = puzzleData.words.find(w => {
            if (w.orientation === 'across') return row === w.row && col > w.col && col <= w.col + w.answer.length;
            return false;
          });
          if (word) {
            nextCol--; moved = true;
          } else {
             nextRow--; moved = true;
          }
        }
        break;
    }

    if (moved) {
      e.preventDefault();
      // Find the next available input cell in the direction of movement
      while(nextRow >= 0 && nextRow < puzzleData.gridSize && nextCol >= 0 && nextCol < puzzleData.gridSize) {
        if (activeCells.has(`${nextRow}-${nextCol}`)) {
          inputRefs.current[nextRow][nextCol]?.focus();
          break;
        }
        if (e.key === 'ArrowUp') nextRow--;
        else if (e.key === 'ArrowDown') nextRow++;
        else if (e.key === 'ArrowLeft') nextCol--;
        else if (e.key === 'ArrowRight') nextCol++;
        else if (e.key === 'Backspace') { // simplified backspace logic
            if (col > 0) {
                 if (activeCells.has(`${row}-${col-1}`)) {
                    inputRefs.current[row][col-1]?.focus();
                 }
            }
            break;
        }
        else break; // safety break
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>, row: number, col: number) => {
    const target = e.target as HTMLInputElement;
    let { value } = target;

    if (value.length > 1) {
      value = value.charAt(value.length-1);
    }
    onInputChange(row, col, value);
    
    if (value) {
      // Auto-advance logic
      let nextRow = row, nextCol = col;
      
      const acrossWord = puzzleData.words.find(w => w.orientation === 'across' && row === w.row && col >= w.col && col < w.col + w.answer.length -1);
      const downWord = puzzleData.words.find(w => w.orientation === 'down' && col === w.col && row >= w.row && row < w.row + w.answer.length - 1);
      
      if (acrossWord) {
        nextCol++;
      } else if (downWord) {
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
        maxWidth: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vw - 40px)',
        width: '100%',
      }}
    >
      {grid.map((rowItems, row) =>
        rowItems.map((_, col) => {
          const cellKey = `${row}-${col}`;
          const isInput = activeCells.has(cellKey);
          const cellNumber = activeCells.get(cellKey)?.number;

          return (
            <div
              key={cellKey}
              className={cn(
                'relative flex items-center justify-center border',
                isInput ? 'bg-card' : 'bg-muted/30 border-muted/50',
                correctCells[row][col] && 'bg-accent/80 transition-colors duration-500'
              )}
            >
              {cellNumber && (
                <span className="absolute top-0.5 left-1 text-xs text-muted-foreground select-none">
                  {cellNumber}
                </span>
              )}
              {isInput && (
                <input
                  ref={el => (inputRefs.current[row][col] = el)}
                  type="text"
                  maxLength={1}
                  value={grid[row][col] || ''}
                  onInput={(e) => handleInput(e, row, col)}
                  onKeyDown={(e) => handleKeyDown(e, row, col)}
                  className={cn(
                    'w-full h-full bg-transparent text-center text-lg sm:text-xl md:text-2xl font-bold uppercase p-0 border-none focus:ring-2 focus:ring-primary rounded-none',
                     correctCells[row][col] && 'text-accent-foreground caret-accent-foreground'
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
