import type { Game, Category } from '@/lib/types';
import { Code, BrainCircuit, Puzzle, Gamepad2, BookOpen, Leaf } from 'lucide-react';

export const games: Game[] = [
  {
    id: 'recycle-sorter',
    title: 'Recycle Sorter',
    description: 'Drag and drop items into the correct 3D recycling bins.',
    category: 'Eco Games',
    difficulty: 'Easy',
    xp: 50,
    thumbnailUrl: 'https://picsum.photos/seed/recycle/600/400',
    thumbnailHint: 'recycling bins',
  },
  {
    id: 'tree-planter',
    title: 'Tree Planting Clicker',
    description: 'An animated 3D tree grows with each click.',
    category: 'Eco Games',
    difficulty: 'Easy',
    xp: 25,
    thumbnailUrl: 'https://picsum.photos/seed/tree/600/400',
    thumbnailHint: 'growing tree',
  },
  {
    id: 'water-saver',
    title: 'Water Saver Challenge',
    description: 'Control a realistic water animation to save water.',
    category: 'Eco Games',
    difficulty: 'Medium',
    xp: 75,
    thumbnailUrl: 'https://picsum.photos/seed/water/600/400',
    thumbnailHint: 'water tap',
  },
  {
    id: 'energy-puzzle',
    title: 'Energy Saver Puzzle',
    description: 'Find and turn off glowing appliances in a 3D home.',
    category: 'Logic',
    difficulty: 'Medium',
    xp: 100,
    thumbnailUrl: 'https://picsum.photos/seed/energy/600/400',
    thumbnailHint: 'glowing lightbulb',
  },
  {
    id: 'carbon-quiz',
    title: 'Carbon Footprint Quiz',
    description: 'Answer questions and watch the CO₂ meter rise and fall.',
    category: 'IQ',
    difficulty: 'Hard',
    xp: 150,
    thumbnailUrl: 'https://picsum.photos/seed/carbon/600/400',
    thumbnailHint: 'factory smoke',
  },
  {
    id: 'algo-master',
    title: 'Algo Master',
    description: 'Solve complex algorithmic challenges to prove your skills.',
    category: 'Coding',
    difficulty: 'Hard',
    xp: 200,
    thumbnailUrl: 'https://picsum.photos/seed/coding/600/400',
    thumbnailHint: 'code abstract',
  },
];

export const categories: Category[] = [
    { id: 'coding', name: 'Coding', icon: Code },
    { id: 'iq', name: 'IQ', icon: BrainCircuit },
    { id: 'logic', name: 'Logic', icon: Puzzle },
    { id: 'fun', name: 'Fun', icon: Gamepad2 },
    { id: 'subject', name: 'Subject-based', icon: BookOpen },
    { id: 'eco', name: 'Eco Games', icon: Leaf },
];
