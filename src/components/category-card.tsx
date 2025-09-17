import type { Category } from '@/lib/types';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = category.icon;
  return (
    <Link href={`/games/${category.id}`} className="group block">
        <Card className="h-full bg-card/50 transition-all duration-300 hover:bg-card hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full border-2 border-accent/50 bg-accent/10 p-4 text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-lg font-semibold text-foreground">{category.name}</h3>
            </CardContent>
        </Card>
    </Link>
  );
};

export default CategoryCard;
