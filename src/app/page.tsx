import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GameCard from '@/components/game-card';
import CategoryCard from '@/components/category-card';
import { games, categories } from '@/lib/data';
import { ChallengeGenerator } from '@/components/challenge-generator';
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative flex h-[70vh] min-h-[500px] items-center justify-center overflow-hidden text-center">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-blue-900/40"></div>
             <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
             <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse [animation-delay:2s]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-primary sm:text-7xl md:text-8xl text-glow">
              ZYRA
            </h1>
            <p className="mt-4 font-headline text-lg text-foreground/80 md:text-2xl">
              Learn, Play, Explore
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              Dive into a futuristic universe of gamified learning. Sharpen your skills, earn rewards, and make a positive impact on the planet.
            </p>
            <div className="mt-8">
              <ChallengeGenerator />
            </div>
          </div>
        </section>

        {/* Trending Games Section */}
        <section id="games" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Trending Games
              </h2>
               <Link href="/games">
                <Badge variant="outline" className="border-primary/50 text-primary">
                  <Flame className="mr-2 h-4 w-4" />
                  View All
                </Badge>
              </Link>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {games.slice(0, 5).map((game) => (
                  <CarouselItem key={game.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
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
        <section id="categories" className="bg-secondary/20 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Explore by Category
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
