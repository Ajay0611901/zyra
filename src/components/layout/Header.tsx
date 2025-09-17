import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-baseline gap-2">
          <h1 className="text-3xl font-bold font-headline text-primary text-glow">ZYRA</h1>
          <p className="hidden text-sm text-foreground/80 sm:block">Learn, Play, Explore</p>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#games" className="text-foreground/80 transition-colors hover:text-primary">Games</Link>
          <Link href="#leaderboards" className="text-foreground/80 transition-colors hover:text-primary">Leaderboards</Link>
          <Link href="#community" className="text-foreground/80 transition-colors hover:text-primary">Community</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">Log In</Link>
          <Link href="#" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
