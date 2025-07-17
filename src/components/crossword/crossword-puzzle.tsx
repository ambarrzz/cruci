"use client";

import * as React from 'react';
import { Check, RotateCw, Trophy, Mail } from 'lucide-react';
import { puzzleData } from '@/lib/puzzle-data';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import CrosswordGrid from './crossword-grid';
import Clues from './clues';

const emptyGrid = Array(puzzleData.gridSize).fill(null).map(() => Array(puzzleData.gridSize).fill(''));
const emptyCorrectCells = Array(puzzleData.gridSize).fill(null).map(() => Array(puzzleData.gridSize).fill(false));

export default function CrosswordPuzzle() {
  const [grid, setGrid] = React.useState<string[][]>(emptyGrid);
  const [correctCells, setCorrectCells] = React.useState<boolean[][]>(emptyCorrectCells);
  const [isSolved, setIsSolved] = React.useState(false);
  const { toast } = useToast();
  const inputRefs = React.useRef<(HTMLInputElement | null)[][]>(
    Array(puzzleData.gridSize).fill(null).map(() => Array(puzzleData.gridSize).fill(null))
  );

  const activeCells = React.useMemo(() => {
    const cells = new Map<string, { number: number | null }>();
    puzzleData.words.forEach(word => {
      let { row, col } = word;
      for (let i = 0; i < word.answer.length; i++) {
        cells.set(`${row}-${col}`, { number: i === 0 ? word.number : null });
        if (word.orientation === 'across') col++;
        else row++;
      }
    });
    return cells;
  }, []);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newGrid = [...grid.map(row => [...row])];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);
  };

  const handleClueSelect = (wordNumber: number) => {
    const word = puzzleData.words.find(w => w.number === wordNumber);
    if (word) {
      inputRefs.current[word.row][word.col]?.focus();
    }
  };

  const handleCheckAnswers = () => {
    let allCorrect = true;
    const newCorrectCells = Array(puzzleData.gridSize).fill(null).map(() => Array(puzzleData.gridSize).fill(false));

    puzzleData.words.forEach(word => {
      let currentWord = '';
      let { row, col } = word;
      for (let i = 0; i < word.answer.length; i++) {
        currentWord += (grid[row][col] || '').toUpperCase();
        if (word.orientation === 'across') col++; else row++;
      }
      
      if (currentWord === word.answer) {
        let { row: r, col: c } = word;
        for (let i = 0; i < word.answer.length; i++) {
          newCorrectCells[r][c] = true;
          if (word.orientation === 'across') c++; else r++;
        }
      } else {
        allCorrect = false;
      }
    });

    setCorrectCells(newCorrectCells);

    if (allCorrect) {
      setIsSolved(true);
    } else {
      toast({
        title: "Hay algunas respuestas incorrectas",
        description: "¡Sigue intentándolo! Las palabras correctas están resaltadas.",
        variant: "default",
      });
    }
  };
  
  const handleReset = () => {
    const newGrid = Array(puzzleData.gridSize).fill(null).map(() => Array(puzzleData.gridSize).fill(''));
    setGrid(newGrid);
    setCorrectCells(emptyCorrectCells);
    setIsSolved(false);
    toast({ title: "El crucigrama ha sido reiniciado." });
  };
  
  const handleSendEmail = () => {
    const subject = "¡He resuelto el CodeWord Puzzle!";
    const body = `¡Hola! Logré completar el crucigrama y la palabra clave es: ${puzzleData.keyWord}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="lg:col-span-2 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
          <CrosswordGrid
            grid={grid}
            correctCells={correctCells}
            activeCells={activeCells}
            onInputChange={handleInputChange}
            inputRefs={inputRefs}
          />
        </Card>

        <div className="flex flex-col gap-6">
          <Clues onClueSelect={handleClueSelect} />
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <Button onClick={handleCheckAnswers} size="lg">
              <Check className="mr-2 h-5 w-5" /> Verificar
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCw className="mr-2 h-5 w-5" /> Reiniciar
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={isSolved} onOpenChange={setIsSolved}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-center text-2xl sm:text-3xl text-center">
              <Trophy className="text-accent w-8 h-8 sm:w-10 sm:h-10 mr-2" />
              ¡Felicidades!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base sm:text-lg px-4">
              Has completado el crucigrama exitosamente. La palabra clave es:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-6 text-center">
             <p className="text-5xl sm:text-7xl font-bold text-accent tracking-[0.3em] animate-pulse">
                {puzzleData.keyWord}
             </p>
          </div>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <Button onClick={handleSendEmail} className="w-full">
              <Mail className="mr-2 h-5 w-5" /> Enviar por email
            </Button>
            <AlertDialogAction onClick={() => setIsSolved(false)} className="w-full" autoFocus>Cerrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
