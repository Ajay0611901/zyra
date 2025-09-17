
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
  }

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-baseline gap-2">
          <h1 className={cn(
              "font-bold font-headline text-primary text-glow transition-all duration-300",
              isScrolled ? "text-3xl" : "text-4xl"
          )}>ZYRA</h1>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/games" className="text-foreground/80 transition-colors hover:text-primary">Games</Link>
          <Link href="/leaderboards" className="text-foreground/80 transition-colors hover:text-primary">Leaderboards</Link>
          <Link href="/community" className="text-foreground/80 transition-colors hover:text-primary">Community</Link>
        </nav>
        <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/profile">
                      <div className="rounded-full border-2 border-primary/50 p-2 text-primary transition-colors hover:bg-primary/10">
                        <User size={20} />
                      </div>
                    </Link>
                     <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground hover:text-primary">
                        <LogOut size={20} />
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                     <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                        Login
                    </Button>
                  </Link>
                )}
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
