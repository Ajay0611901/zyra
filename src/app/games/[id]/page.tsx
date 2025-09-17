import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { games } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Zap, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChallengeGenerator } from '@/components/challenge-generator';

export default function GameDetailsPage({ params }: { params: { id: string } }) {
  const game = games.find((g) => g.id === params.id);

  if (!game) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="overflow-hidden bg-card">
                <div className="relative h-64 w-full md:h-96">
                  <Image
                    src={game.thumbnailUrl}
                    alt={game.title}
                    fill
                    className="object-cover"
                    data-ai-hint={game.thumbnailHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h1 className="font-headline text-4xl font-bold text-white md:text-5xl text-glow">
                      {game.title}
                    </h1>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="mb-4 font-headline text-2xl font-semibold text-primary">Game Description</h2>
                  <p className="text-muted-foreground">{game.description}</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
               <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle>Game Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <Badge variant="secondary" className="font-mono">{game.difficulty}</Badge>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">XP Reward:</span>
                         <div className="flex items-center gap-2 text-sm font-medium text-amber-400">
                            <Zap className="h-4 w-4 fill-current" />
                            <span>{game.xp} XP</span>
                        </div>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium text-foreground">{game.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1 text-amber-400">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4" />
                            <span className="text-xs text-muted-foreground ml-1">(1,234 reviews)</span>
                        </div>
                    </div>
                </CardContent>
              </Card>
              {game.id === 'algo-master' ? (
                <ChallengeGenerator
                  trigger={
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Play Now
                    </Button>
                  }
                />
              ) : (
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Play Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }));
}
