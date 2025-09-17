import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { communityPosts } from '@/lib/data';
import { MessageSquare, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-8 flex items-center gap-4">
            <Users className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Community Hub
            </h1>
          </div>
          
          {/* New Post Input */}
          <Card className="mb-8 bg-card">
             <CardHeader>
                <h2 className="font-headline text-xl font-semibold">Create a Post</h2>
             </CardHeader>
             <CardContent>
                <Textarea placeholder="What's on your mind, champion?" className="bg-background" />
             </CardContent>
             <CardFooter className="flex justify-end">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Post</Button>
             </CardFooter>
          </Card>


          {/* Community Feed */}
          <div className="space-y-6">
            {communityPosts.map((post) => (
              <Card key={post.id} className="bg-card/50">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-accent/50">
                    <AvatarImage src={post.avatar} alt={post.user} />
                    <AvatarFallback>{post.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90">{post.content}</p>
                </CardContent>
                <CardFooter className="flex items-center gap-6 text-muted-foreground">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" /> 
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> 
                    <span>{post.comments}</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
