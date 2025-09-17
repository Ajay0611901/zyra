
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, BarChart, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    xp: number;
    level: number;
    ecoScore: number;
}

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchUserProfile = async () => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserProfile(userDoc.data() as UserProfile);
                } else {
                    // This can happen if the user was created with Google Sign In
                    // but the doc creation failed or is still pending.
                    // We can try to create it here as a fallback.
                    const basicProfile: UserProfile = {
                        uid: user.uid,
                        email: user.email!,
                        displayName: user.displayName || 'New User',
                        photoURL: user.photoURL || undefined,
                        xp: 0,
                        level: 1,
                        ecoScore: 0,
                    };
                    setUserProfile(basicProfile);
                }
                 setProfileLoading(false);
            }
        };

        fetchUserProfile();
    }, [user, loading, router]);
    
    if (loading || profileLoading || !userProfile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    const nextLevelXp = userProfile.level * 1000 + 1000;
    const levelProgress = (userProfile.xp / nextLevelXp) * 100;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow pt-24">
                <div className="container mx-auto max-w-4xl px-4">
                    <Card className="bg-card/50">
                        <CardHeader className="flex flex-col items-center text-center">
                            <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                                <AvatarImage src={userProfile.photoURL || `https://i.pravatar.cc/150?u=${userProfile.uid}`} alt={userProfile.displayName} />
                                <AvatarFallback>{userProfile.displayName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="mt-4 font-headline text-4xl text-primary">{userProfile.displayName}</CardTitle>
                            <p className="text-muted-foreground">Level {userProfile.level} Explorer</p>
                        </CardHeader>
                        <CardContent className="mt-6 space-y-8">
                            {/* XP and Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-sm">
                                    <span className="text-primary">{userProfile.xp.toLocaleString()} XP</span>
                                    <span className="text-muted-foreground">{nextLevelXp.toLocaleString()} XP</span>
                                </div>
                                <div className="relative">
                                    <Progress value={levelProgress} className="h-6" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="font-bold text-xs text-primary-foreground">{levelProgress.toFixed(0)}% to Level {userProfile.level + 1}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                                <div className="rounded-lg bg-secondary p-4">
                                    <Award className="mx-auto h-8 w-8 text-amber-400" />
                                    <p className="mt-2 text-2xl font-bold">#1</p>
                                    <p className="text-xs text-muted-foreground">Global Rank</p>
                                </div>
                                <div className="rounded-lg bg-secondary p-4">
                                    <Zap className="mx-auto h-8 w-8 text-yellow-400" />
                                    <p className="mt-2 text-2xl font-bold">{userProfile.xp.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">Total XP</p>
                                </div>
                                <div className="rounded-lg bg-secondary p-4">
                                    <BarChart className="mx-auto h-8 w-8 text-accent" />
                                    <p className="mt-2 text-2xl font-bold">{userProfile.ecoScore}</p>
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
