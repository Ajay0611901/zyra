import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-headline font-semibold text-primary">ZYRA</h3>
          <p className="mt-2 text-sm text-muted-foreground">Learn, Play, Explore</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="#games" className="text-muted-foreground hover:text-primary">Games</Link></li>
            <li><Link href="#leaderboards" className="text-muted-foreground hover:text-primary">Leaderboards</Link></li>
            <li><Link href="#community" className="text-muted-foreground hover:text-primary">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">Follow Us</h4>
          <div className="mt-4 flex space-x-4">
            <Link href="#" aria-label="X (formerly Twitter)" className="text-muted-foreground hover:text-primary">X</Link>
            <Link href="#" aria-label="Discord" className="text-muted-foreground hover:text-primary">Discord</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50 py-4">
        <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Nueronex Coders. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
