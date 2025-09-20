'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const ChallengeGenerator = dynamic(() => import('@/components/challenge-generator').then(mod => mod.ChallengeGenerator), {
  loading: () => <Button disabled className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold text-lg">Loading Challenge...</Button>,
  ssr: false,
});

export function ChallengeLoader({ trigger }: { trigger?: React.ReactNode }) {
  return <ChallengeGenerator trigger={trigger} />;
}
