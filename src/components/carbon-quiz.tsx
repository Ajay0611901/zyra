'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, Leaf, BarChart, Lightbulb, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchCarbonQuiz, analyzeCarbonAnswers } from '@/ai/flows/carbon-footprint-flow';
import type { QuizQuestion, CarbonFootprintAnalysis } from '@/ai/flows/carbon-footprint-flow';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';

export function CarbonQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CarbonFootprintAnalysis | null>(null);
  const { toast } = useToast();

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setAnalysis(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    const result = await fetchCarbonQuiz();
    if (result.success && result.data) {
      setQuestions(result.data.questions);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load quiz questions. Please try again.',
      });
      setIsOpen(false);
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    if (isOpen) {
      loadQuestions();
    }
  }, [isOpen, loadQuestions]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await analyzeCarbonAnswers({ answers });
    if (result.success && result.data) {
      setAnalysis(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'We couldn\'t analyze your results. Please try again.',
      });
    }
    setIsLoading(false);
  };
  
  const handleRestart = () => {
    setAnalysis(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    loadQuestions();
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {analysis === null && !currentQuestion ? 'Loading Quiz...' : 'Analyzing your footprint...'}
          </p>
        </div>
      );
    }

    if (analysis) {
      return (
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <DialogHeader className="text-center">
            <DialogTitle className="font-headline text-2xl text-primary">Your Eco-Footprint</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-center">
            <p className="text-5xl font-bold text-accent">{analysis.score.toFixed(1)}</p>
            <p className="text-muted-foreground">tonnes of CO2e per year</p>
            <p className={`mt-2 font-semibold text-lg ${analysis.level === 'Low' ? 'text-primary' : 'text-destructive'}`}>
              {analysis.level} Impact
            </p>
          </div>
          <p className="my-4 text-center text-foreground/90">{analysis.summary}</p>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold flex items-center gap-2"><Lightbulb className="text-accent" />Personalized Tips</h3>
            {analysis.tips.map((tip, index) => (
              <Card key={index} className="bg-secondary/50">
                <CardContent className="p-4">
                  <p className="font-semibold text-primary">{tip.title}</p>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <DialogFooter className="mt-6">
            <Button onClick={handleRestart} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Take Again
            </Button>
          </DialogFooter>
        </div>
      );
    }

    if (currentQuestion) {
      return (
        <div>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">Carbon Footprint Quiz</DialogTitle>
            <div className="pt-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-right">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
          </DialogHeader>
          <div className="my-6">
            <p className="font-semibold text-lg text-foreground">{currentQuestion.text}</p>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => {
                setAnswers(prevAnswers => ({
                  ...prevAnswers,
                  [currentQuestion.id]: value
                }));
              }}
              className="mt-4 space-y-2"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-secondary/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
              {isLastQuestion ? 'See My Results' : 'Next'}
            </Button>
          </DialogFooter>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Play Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}