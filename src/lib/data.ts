import type { Game, Category, LeaderboardUser, CommunityPost } from '@/lib/types';
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

export const leaderboard: LeaderboardUser[] = [
  { rank: 1, user: 'PixelPioneer', xp: 10500, avatar: 'https://i.pravatar.cc/150?u=PixelPioneer' },
  { rank: 2, user: 'CodeCommander', xp: 9800, avatar: 'https://i.pravatar.cc/150?u=CodeCommander' },
  { rank: 3, user: 'LogicLegend', xp: 9500, avatar: 'https://i.pravatar.cc/150?u=LogicLegend' },
  { rank: 4, user: 'EcoWarrior', xp: 8900, avatar: 'https://i.pravatar.cc/150?u=EcoWarrior' },
  { rank: 5, user: 'QuizMaster', xp: 8500, avatar: 'https://i.pravatar.cc/150?u=QuizMaster' },
  { rank: 6, user: 'FunFanatic', xp: 8200, avatar: 'https://i.pravatar.cc/150?u=FunFanatic' },
  { rank: 7, user: 'AstroNomad', xp: 7800, avatar: 'https://i.pravatar.cc/150?u=AstroNomad' },
  { rank: 8, user: 'BioBard', xp: 7400, avatar: 'https://i.pravatar.cc/150?u=BioBard' },
  { rank: 9, user: 'ChemChampion', xp: 7100, avatar: 'https://i.pravatar.cc/150?u=ChemChampion' },
  { rank: 10, user: 'DataDynamo', xp: 6800, avatar: 'https://i.pravatar.cc/150?u=DataDynamo' },
];

export const communityPosts: CommunityPost[] = [
  {
    id: 'post1',
    user: 'PixelPioneer',
    avatar: 'https://i.pravatar.cc/150?u=PixelPioneer',
    timestamp: '2 hours ago',
    content: 'Just hit the top of the leaderboards in Recycle Sorter! Who wants to challenge my high score?',
    likes: 58,
    comments: 12,
  },
  {
    id: 'post2',
    user: 'EcoWarrior',
    avatar: 'https://i.pravatar.cc/150?u=EcoWarrior',
    timestamp: '5 hours ago',
    content: 'The Tree Planting Clicker is so relaxing. It\'s a great way to de-stress and feel like you\'re making a small difference. 🌳',
    likes: 123,
    comments: 24,
  },
  {
    id: 'post3',
    user: 'CodeCommander',
    avatar: 'https://i.pravatar.cc/150?u=CodeCommander',
    timestamp: '1 day ago',
    content: 'Stuck on level 5 of Algo Master. That recursion problem is a real head-scratcher. Any hints without giving away the solution?',
    likes: 92,
    comments: 35,
  },
];
