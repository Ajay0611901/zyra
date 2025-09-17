export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  thumbnailUrl: string;
  thumbnailHint: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface LeaderboardUser {
    rank: number;
    user: string;
    xp: number;
    avatar: string;
}

export interface CommunityPost {
    id: string;
    user: string;
    avatar: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
}
