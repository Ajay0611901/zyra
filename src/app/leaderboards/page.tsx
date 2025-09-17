import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { leaderboard } from '@/lib/data';
import { Trophy, Award } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function LeaderboardsPage() {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber-400';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-4">
            <Trophy className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Leaderboards
            </h1>
          </div>
          
          <div className="overflow-hidden rounded-lg border bg-card shadow-lg shadow-primary/10">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user, index) => (
                  <TableRow key={user.rank} className={index < 3 ? 'bg-card/50' : ''}>
                    <TableCell className="text-center">
                      <div className={`font-bold text-lg flex items-center justify-center ${getRankColor(user.rank)}`}>
                        {user.rank <=3 && <Award className="mr-2 h-5 w-5 fill-current" />}
                        {user.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-primary/50">
                          <AvatarImage src={user.avatar} alt={user.user} />
                          <AvatarFallback>{user.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{user.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <Badge variant="secondary" className="font-mono text-base">{user.xp.toLocaleString()} XP</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
