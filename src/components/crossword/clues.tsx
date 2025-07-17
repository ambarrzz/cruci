"use client";

import { puzzleData, type Word } from '@/lib/puzzle-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '../ui/scroll-area';

type CluesProps = {
  onClueSelect: (wordNumber: number) => void;
};

const ClueList = ({ title, words, onClueSelect }: { title: string; words: Word[]; onClueSelect: (n: number) => void }) => (
  <div>
    <h3 className="font-headline font-bold text-xl mb-2 text-primary">{title}</h3>
    <ul className="space-y-2">
      {words.map((word) => (
        <li
          key={word.number}
          className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          onClick={() => onClueSelect(word.number)}
        >
          <strong className="text-foreground">{word.number}.</strong> {word.clue}
        </li>
      ))}
    </ul>
  </div>
);

export default function Clues({ onClueSelect }: CluesProps) {
  const acrossWords = puzzleData.words.filter(w => w.orientation === 'across').sort((a,b) => a.number - b.number);
  const downWords = puzzleData.words.filter(w => w.orientation === 'down').sort((a,b) => a.number - b.number);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pistas</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] lg:h-[calc(100vh-320px)] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                <ClueList title="Horizontales" words={acrossWords} onClueSelect={onClueSelect} />
                <ClueList title="Verticales" words={downWords} onClueSelect={onClueSelect} />
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
