import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GameCard from '@/components/game-card';
import { games } from '@/lib/data';
import { Gamepad2 } from 'lucide-react';

export default function GamesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-4">
            <Gamepad2 className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              All Games
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
