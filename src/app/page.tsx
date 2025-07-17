import CrosswordPuzzle from "@/components/crossword/crossword-puzzle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary tracking-tight">
            CodeWord Puzzle
          </h1>
          <p className="text-muted-foreground mt-3 text-lg sm:text-xl">
            Pon a prueba tus conocimientos sobre ingeniería de software.
          </p>
        </header>
        <CrosswordPuzzle />
      </div>
    </main>
  );
}
