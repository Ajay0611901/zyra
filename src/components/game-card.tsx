import type { Game } from '@/lib/types';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="group h-full rounded-lg [perspective:1000px]">
        <Card className="h-full cursor-pointer rounded-lg border-2 border-transparent bg-card transition-all duration-500 group-hover:[transform:rotateY(10deg)_rotateX(5deg)] group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20" style={{transformStyle: 'preserve-3d'}}>
            <CardContent className="flex h-full flex-col p-0">
                <div className="relative h-40 w-full">
                    <Image
                        src={game.thumbnailUrl}
                        alt={game.title}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover"
                        data-ai-hint={game.thumbnailHint}
                    />
                     <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-headline text-lg font-semibold text-primary">{game.title}</h3>
                    <p className="mt-1 flex-grow text-sm text-muted-foreground">{game.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <Badge variant="secondary" className="font-mono">{game.difficulty}</Badge>
                        <div className="flex items-center gap-2 text-sm font-medium text-amber-400">
                            <Zap className="h-4 w-4 fill-current" />
                            <span>{game.xp} XP</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default GameCard;
