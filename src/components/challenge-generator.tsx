'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAdaptiveChallenge } from '@/app/actions';
import type { AdaptiveChallengeOutput } from '@/ai/flows/adaptive-coding-challenges';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { WandSparkles, Loader2, Lightbulb } from 'lucide-react';
import { Separator } from './ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from './ui/badge';
import React from 'react';

const formSchema = z.object({
  playerSkillLevel: z.coerce.number().min(1, 'Skill level must be at least 1').max(10, 'Skill level must be at most 10'),
  preferredProgrammingLanguage: z.string().min(1, 'Please select a language'),
  topic: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ChallengeGenerator({ trigger }: { trigger?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [challenge, setChallenge] = useState<AdaptiveChallengeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerSkillLevel: 5,
      preferredProgrammingLanguage: 'JavaScript',
      topic: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setChallenge(null);
    const result = await getAdaptiveChallenge(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setChallenge(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state on close
      form.reset();
      setChallenge(null);
      setIsLoading(false);
    }
  };

  const dialogTrigger = trigger ? (
    React.cloneElement(trigger as React.ReactElement, { onClick: () => setIsOpen(true) })
  ) : (
    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/30">
      <WandSparkles className="mr-2 h-5 w-5" />
      Generate AI Challenge
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Adaptive Challenge Generator</DialogTitle>
          <DialogDescription>
            Our AI will create a coding challenge tailored to your skill level and preferences.
          </DialogDescription>
        </DialogHeader>
        
        {!challenge && !isLoading && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="playerSkillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level (1-10)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredProgrammingLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programming Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="JavaScript">JavaScript</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="Java">Java</SelectItem>
                          <SelectItem value="TypeScript">TypeScript</SelectItem>
                          <SelectItem value="Go">Go</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Arrays, Data Structures, Algorithms" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  Generate Challenge
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {isLoading && (
           <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">AI is crafting your challenge...</p>
          </div>
        )}

        {challenge && (
          <div className="mt-4 max-h-[70vh] overflow-y-auto pr-2">
            <h2 className="font-headline text-xl font-bold text-accent">{challenge.challengeTitle}</h2>
            <div className="mt-2 flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="font-mono">{challenge.programmingLanguage}</Badge>
                <Badge variant="secondary" className="font-mono">Difficulty: {challenge.difficultyLevel}</Badge>
            </div>
            <Separator className="my-4" />
            <div className="prose prose-invert prose-sm max-w-none space-y-4 text-foreground/90">
                <p>{challenge.challengeDescription}</p>
                <div>
                    <h3 className="font-semibold">Expected Output:</h3>
                    <pre className="mt-2 rounded-md bg-secondary p-4 text-sm text-secondary-foreground">
                        <code>{challenge.expectedOutput}</code>
                    </pre>
                </div>
            </div>
             <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="hints">
                <AccordionTrigger>
                  <span className="flex items-center gap-2"><Lightbulb className="w-4 h-4"/>Need a hint?</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                    {challenge.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="solution">
                <AccordionTrigger>Show Solution</AccordionTrigger>
                <AccordionContent>
                  <pre className="mt-2 rounded-md bg-secondary p-4 text-sm text-secondary-foreground">
                    <code>{challenge.solution}</code>
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
             <DialogFooter className="mt-6">
                <Button onClick={() => setChallenge(null)}>Generate Another</Button>
            </DialogFooter>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
