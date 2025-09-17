'use server';

import { generateAdaptiveChallenge, type AdaptiveChallengeInput, type AdaptiveChallengeOutput } from '@/ai/flows/adaptive-coding-challenges';

export async function getAdaptiveChallenge(input: AdaptiveChallengeInput): Promise<{
  success: boolean;
  data?: AdaptiveChallengeOutput;
  error?: string;
}> {
  try {
    const result = await generateAdaptiveChallenge(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate challenge. Please try again.' };
  }
}
