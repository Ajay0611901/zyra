import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GameCard from '@/components/game-card';
import CategoryCard from '@/components/category-card';
import { games, categories } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';
import Link from 'next/link';
import { ChallengeLoader } from '@/components/challenge-loader';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden text-center -mt-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-900/40 via-blue-900/60 to-background">
             {/* Placeholder for particle animation */}
             <div className="absolute inset-0 z-0 opacity-50">
                {/* This could be a component that renders a canvas animation */}
             </div>
             <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
             <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse [animation-delay:2s]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <h1 className="font-headline text-6xl font-bold tracking-tighter text-primary sm:text-8xl md:text-9xl text-glow">
              ZYRA
            </h1>
            <p className="mt-4 font-headline text-xl text-foreground/80 md:text-3xl">
              Learn about environmental conservation through fun and interactive games.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
               <ChallengeLoader trigger={
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 text-lg">
                  Start a Challenge
                </button>
               } />
               <Link href="/login">
                <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-md font-semibold transition-all hover:bg-secondary/80 hover:shadow-lg hover:shadow-secondary/20 text-lg">
                  Login
                </button>
               </Link>
            </div>
          </div>
        </section>

        {/* Trending Games Section */}
        <section id="games" className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
                Featured Games
              </h2>
               <Link href="/games">
                <Badge variant="outline" className="border-primary/50 text-primary transition-colors hover:bg-primary/10">
                  <Flame className="mr-2 h-5 w-5" />
                  View All
                </Badge>
              </Link>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-6">
                {games.slice(0, 5).map((game) => (
                  <CarouselItem key={game.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <GameCard game={game} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Explore by Topic
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
