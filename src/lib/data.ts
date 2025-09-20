import type { Game, Category, LeaderboardUser, CommunityPost } from '@/lib/types';
import { Leaf, Droplet, Zap, BrainCircuit, BookOpen } from 'lucide-react';

export const games: Game[] = [
  {
    id: 'recycle-sorter',
    title: 'Recycle Sorter',
    description: 'Learn to sort waste correctly by dragging items into the right bins.',
    category: 'Eco Games',
    difficulty: 'Easy',
    xp: 50,
    thumbnailUrl: 'https://picsum.photos/seed/recycling-game/600/400',
    thumbnailHint: 'colorful recycling bins',
  },
  {
    id: 'tree-planter',
    title: 'Digital Reforestation',
    description: 'Plant digital trees and watch a barren landscape transform into a forest.',
    category: 'Eco Games',
    difficulty: 'Easy',
    xp: 25,
    thumbnailUrl: 'https://picsum.photos/seed/digital-forest/600/400',
    thumbnailHint: 'lush green sapling',
  },
  {
    id: 'water-saver',
    title: 'Water Saver Challenge',
    description: 'Fix leaks and make smart choices to conserve water in a virtual home.',
    category: 'Eco Games',
    difficulty: 'Medium',
    xp: 75,
    thumbnailUrl: 'https://picsum.photos/seed/water-challenge/600/400',
    thumbnailHint: 'clear water droplet',
  },
  {
    id: 'energy-puzzle',
    title: 'Energy Saver Puzzle',
    description: 'Identify and eliminate energy vampires in a 3D house.',
    category: 'Eco Games',
    difficulty: 'Medium',
    xp: 100,
    thumbnailUrl: 'https://picsum.photos/seed/energy-game/600/400',
    thumbnailHint: 'wind turbines sun',
  },
  {
    id: 'carbon-quiz',
    title: 'Carbon Footprint Quiz',
    description: 'Test your knowledge about carbon emissions and learn how to reduce your impact.',
    category: 'IQ',
    difficulty: 'Hard',
    xp: 150,
    thumbnailUrl: 'https://picsum.photos/seed/carbon-quiz/600/400',
    thumbnailHint: 'green earth illustration',
  },
];

export const categories: Category[] = [
    { id: 'eco', name: 'Waste', icon: Leaf },
    { id: 'water', name: 'Water', icon: Droplet },
    { id: 'energy', name: 'Energy', icon: Zap },
    { id: 'iq', name: 'IQ', icon: BrainCircuit },
    { id: 'general', name: 'General', icon: BookOpen },
];

export const leaderboard: LeaderboardUser[] = [
  { rank: 1, user: 'EcoWarrior', xp: 10500, avatar: 'https://i.pravatar.cc/150?u=EcoWarrior' },
  { rank: 2, user: 'PixelPioneer', xp: 9800, avatar: 'https://i.pravatar.cc/150?u=PixelPioneer' },
  { rank: 3, user: 'LogicLegend', xp: 9500, avatar: 'https://i.pravatar.cc/150?u=LogicLegend' },
  { rank: 4, user: 'GreenGuard', xp: 8900, avatar: 'https://i.pravatar.cc/150?u=GreenGuard' },
  { rank: 5, user: 'QuizMaster', xp: 8500, avatar: 'https://i.pravatar.cc/150?u=QuizMaster' },
  { rank: 6, user: 'AquaAdvocate', xp: 8200, avatar: 'https://i.pravatar.cc/150?u=AquaAdvocate' },
  { rank: 7, user: 'AstroNomad', xp: 7800, avatar: 'https://i.pravatar.cc/150?u=AstroNomad' },
  { rank: 8, user: 'BioBard', xp: 7400, avatar: 'https://i.pravatar.cc/150?u=BioBard' },
  { rank: 9, user: 'ChemChampion', xp: 7100, avatar: 'https://i.pravatar.cc/150?u=ChemChampion' },
  { rank: 10, user: 'DataDynamo', xp: 6800, avatar: 'https://i.pravatar.cc/150?u=DataDynamo' },
];

export const communityPosts: CommunityPost[] = [
  {
    id: 'post1',
    user: 'EcoWarrior',
    avatar: 'https://i.pravatar.cc/150?u=EcoWarrior',
    timestamp: '2 hours ago',
    content: 'Just hit a new high score in Recycle Sorter! It\'s amazing how much you learn about what can and can\'t be recycled. ♻️',
    likes: 62,
    comments: 15,
  },
  {
    id: 'post2',
    user: 'GreenGuard',
    avatar: 'https://i.pravatar.cc/150?u=GreenGuard',
    timestamp: '5 hours ago',
    content: 'The Digital Reforestation game is so peaceful. It\'s a great reminder of the importance of trees for our planet.',
    likes: 130,
    comments: 28,
  },
  {
    id: 'post3',
    user: 'AquaAdvocate',
    avatar: 'https://i.pravatar.cc/150?u=AquaAdvocate',
    timestamp: '1 day ago',
    content: 'The Water Saver Challenge was eye-opening! I had no idea how much water is wasted by small leaks.',
    likes: 95,
    comments: 40,
  },
];
