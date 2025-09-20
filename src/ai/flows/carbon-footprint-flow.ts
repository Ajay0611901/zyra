'use server';

/**
 * @fileOverview An AI agent that generates a personalized carbon footprint quiz and analysis.
 *
 * - getCarbonFootprintQuiz - Generates the initial set of quiz questions.
 * - getCarbonFootprintAnalysis - Analyzes answers and provides a score and tips.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schema for a single quiz question
const QuizQuestionSchema = z.object({
  id: z.string().describe('A unique identifier for the question (e.g., "transport").'),
  text: z.string().describe('The question text to be displayed to the user.'),
  options: z.array(z.object({
    value: z.string().describe('The value to be submitted for this option.'),
    label: z.string().describe('The user-facing label for this option.'),
  })).describe('A list of multiple-choice options for the question.'),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

// Schema for the full quiz
const QuizSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of quiz questions.'),
});
export type Quiz = z.infer<typeof QuizSchema>;

// Schema for the user's answers
const QuizAnswersInputSchema = z.object({
  answers: z.record(z.string()).describe('An object where keys are question IDs and values are the selected option values.'),
});
export type QuizAnswersInput = z.infer<typeof QuizAnswersInputSchema>;

// Schema for the AI's analysis output
const CarbonFootprintAnalysisSchema = z.object({
  score: z.number().describe('The user\'s estimated annual carbon footprint in tonnes of CO2 equivalent.'),
  level: z.enum(['Low', 'Moderate', 'High', 'Very High']).describe('A qualitative assessment of the score.'),
  summary: z.string().describe('A brief, encouraging summary of the user\'s results.'),
  tips: z.array(z.object({
    title: z.string().describe('A catchy title for the tip.'),
    description: z.string().describe('A detailed explanation of the tip and its impact.'),
  })).describe('A list of personalized tips for reducing their carbon footprint.'),
});
export type CarbonFootprintAnalysis = z.infer<typeof CarbonFootprintAnalysisSchema>;


/**
 * Generates the questions for the carbon footprint quiz.
 */
export async function getCarbonFootprintQuiz(): Promise<Quiz> {
  return generateQuizFlow();
}

/**
 * Analyzes the user's answers and returns their carbon footprint analysis.
 */
export async function getCarbonFootprintAnalysis(input: QuizAnswersInput): Promise<CarbonFootprintAnalysis> {
  return analyzeAnswersFlow(input);
}


const generateQuizPrompt = ai.definePrompt({
  name: 'generateCarbonFootprintQuizPrompt',
  output: { schema: QuizSchema },
  prompt: `You are an environmental scientist creating a quiz to estimate a person's carbon footprint.
  Generate 5 multiple-choice questions about lifestyle choices that significantly impact a person's carbon footprint.
  Cover these topics:
  1. Transportation: How they primarily get around.
  2. Diet: How often they consume meat.
  3. Home Energy: Their typical energy usage habits.
  4. Shopping Habits: Their preference for new vs. secondhand items.
  5. Waste Management: How they handle food waste.

  For each question, provide a unique ID, the question text, and at least 3-4 clear options with a value and a label.
  The values should be simple keywords (e.g., 'car', 'rarely', 'high_energy').
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    outputSchema: QuizSchema,
  },
  async () => {
    const { output } = await generateQuizPrompt();
    return output!;
  }
);


const analyzeAnswersPrompt = ai.definePrompt({
  name: 'analyzeCarbonFootprintAnswersPrompt',
  input: { schema: QuizAnswersInputSchema },
  output: { schema: CarbonFootprintAnalysisSchema },
  prompt: `You are an AI environmental analyst. Analyze the user's answers to a carbon footprint quiz and provide a personalized report.

  User's Answers:
  {{#each answers}}
  - Question {{ @key }}: {{ this }}
  {{/each}}

  Based on these answers, perform the following:
  1.  **Estimate Score**: Calculate an estimated annual carbon footprint in tonnes of CO2. Use a baseline average of 16 tonnes for a person in a developed country. Adjust this baseline based on the answers. For example:
      - Driving a car ('car') increases the score significantly.
      - High meat consumption ('daily') increases the score.
      - High energy use ('high_energy') increases the score.
      - Composting ('compost') or low meat intake ('vegan', 'rarely') significantly decreases the score.
  2.  **Determine Level**: Categorize the score as 'Low' (<6 tonnes), 'Moderate' (6-15 tonnes), 'High' (16-22 tonnes), or 'Very High' (>22 tonnes).
  3.  **Write Summary**: Provide a brief, encouraging summary of their impact.
  4.  **Generate Personalized Tips**: Create 3 personalized, actionable tips for improvement based *directly* on their answers. For the highest impact areas, suggest specific changes. For example, if they drive a car, suggest carpooling or public transport. If they have high energy use, suggest energy-efficient appliances.
  `,
});


const analyzeAnswersFlow = ai.defineFlow(
  {
    name: 'analyzeAnswersFlow',
    inputSchema: QuizAnswersInputSchema,
    outputSchema: CarbonFootprintAnalysisSchema,
  },
  async (input) => {
    const { output } = await analyzeAnswersPrompt(input);
    return output!;
  }
);
