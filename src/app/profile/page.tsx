import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, BarChart, ShieldCheck, Zap } from 'lucide-react';

export default function ProfilePage() {
    const user = {
        name: 'PixelPioneer',
        avatar: 'https://i.pravatar.cc/150?u=PixelPioneer',
        xp: 10500,
        level: 12,
        rank: 1,
        ecoScore: 85,
    };
    
    const nextLevelXp = 12000;
    const levelProgress = (user.xp / nextLevelXp) * 100;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow pt-24">
                <div className="container mx-auto max-w-4xl px-4">
                    <Card className="bg-card/50">
                        <CardHeader className="flex flex-col items-center text-center">
                            <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="mt-4 font-headline text-4xl text-primary">{user.name}</CardTitle>
                            <p className="text-muted-foreground">Level {user.level} Explorer</p>
                        </CardHeader>
                        <CardContent className="mt-6 space-y-8">
                            {/* XP and Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-sm">
                                    <span className="text-primary">{user.xp.toLocaleString()} XP</span>
                                    <span className="text-muted-foreground">{nextLevelXp.toLocaleString()} XP</span>
                                d</div>
                                <div className="relative">
                                    <Progress value={levelProgress} className="h-6" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-bold text-xs text-primary-foreground">{levelProgress.toFixed(0)}% to Level {user.level + 1}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                                <div className="rounded-lg bg-secondary p-4">
                                    <Award className="mx-auto h-8 w-8 text-amber-400" />
                                    <p className="mt-2 text-2xl font-bold">{user.rank}</p>
                                    <p className="text-xs text-muted-foreground">Global Rank</p>
                                </div>
                                <div className="rounded-lg bg-secondary p-4">
                                    <Zap className="mx-auto h-8 w-8 text-yellow-400" />
                                    <p className="mt-2 text-2xl font-bold">{user.xp.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">Total XP</p>
                                </div>
                                <div className="rounded-lg bg-secondary p-4">
                                    <BarChart className="mx-auto h-8 w-8 text-accent" />
                                    <p className="mt-2 text-2xl font-bold">{user.ecoScore}</p>
                                    <p className="text-xs text-muted-foreground">Eco Score</p>
                                </div>
                                 <div className="rounded-lg bg-secondary p-4">
                                    <ShieldCheck className="mx-auto h-8 w-8 text-blue-400" />
                                    <p className="mt-2 text-2xl font-bold">12</p>
                                    <p className="text-xs text-muted-foreground">Badges</p>
                                </div>
                            </div>

                             {/* Badges Section */}
                            <div>
                                <h3 className="font-headline text-xl font-semibold">Badges</h3>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <Badge variant="default" className="p-2 text-sm"><Award className="mr-2"/>Top Recycler</Badge>
                                    <Badge variant="secondary" className="p-2 text-sm"><Zap className="mr-2"/>XP Master</Badge>
                                    <Badge variant="secondary" className="p-2 text-sm">Tree Hugger</Badge>
                                    <Badge variant="secondary" className="p-2 text-sm">Community Helper</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
