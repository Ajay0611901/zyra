'use server';

/**
 * @fileOverview An AI agent that generates adaptive coding challenges based on player skill level.
 *
 * - generateAdaptiveChallenge - A function that generates a coding challenge.
 * - AdaptiveChallengeInput - The input type for the generateAdaptiveChallenge function.
 * - AdaptiveChallengeOutput - The return type for the generateAdaptiveChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveChallengeInputSchema = z.object({
  playerSkillLevel: z
    .number()
    .describe('The skill level of the player (e.g., 1-10, where 10 is expert).'),
  preferredProgrammingLanguage: z
    .string()
    .describe('The player\'s preferred programming language (e.g., JavaScript, Python, Java).'),
  topic: z
    .string()
    .optional()
    .describe('Optional topic for the coding challenge, such as data structures or algorithms.'),
});
export type AdaptiveChallengeInput = z.infer<typeof AdaptiveChallengeInputSchema>;

const AdaptiveChallengeOutputSchema = z.object({
  challengeTitle: z.string().describe('The title of the coding challenge.'),
  challengeDescription: z.string().describe('A detailed description of the coding challenge.'),
  difficultyLevel: z.string().describe('The difficulty level of the challenge (e.g., Easy, Medium, Hard).'),
  expectedOutput: z.string().describe('Example expected output of the coding challenge.'),
  programmingLanguage: z.string().describe('The programming language that the challenge is for.'),
});
export type AdaptiveChallengeOutput = z.infer<typeof AdaptiveChallengeOutputSchema>;

export async function generateAdaptiveChallenge(
  input: AdaptiveChallengeInput
): Promise<AdaptiveChallengeOutput> {
  return adaptiveCodingChallengeFlow(input);
}

const adaptiveCodingChallengePrompt = ai.definePrompt({
  name: 'adaptiveCodingChallengePrompt',
  input: {schema: AdaptiveChallengeInputSchema},
  output: {schema: AdaptiveChallengeOutputSchema},
  prompt: `You are an AI coding challenge generator that creates coding challenges tailored to the user's skill level and preferences.

  Generate a coding challenge based on the following information:

  Player Skill Level: {{{playerSkillLevel}}}
  Preferred Programming Language: {{{preferredProgrammingLanguage}}}
  Topic: {{topic}}

  The challenge should be appropriate for the player's skill level and should be engaging and educational. Include a challenge title, a detailed description of the challenge, the difficulty level (Easy, Medium, Hard), and example expected output.

  Make sure that the output is appropriate for the specified programming language.

  Difficulty should be scaled appropriately for the player skill level, with 1 being beginner, and 10 being expert.
  `,
});

const adaptiveCodingChallengeFlow = ai.defineFlow(
  {
    name: 'adaptiveCodingChallengeFlow',
    inputSchema: AdaptiveChallengeInputSchema,
    outputSchema: AdaptiveChallengeOutputSchema,
  },
  async input => {
    const {output} = await adaptiveCodingChallengePrompt(input);
    return output!;
  }
);
