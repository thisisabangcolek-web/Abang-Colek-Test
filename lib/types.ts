// Data types for Abang Colek Mobile App

export type EventStatus = "lead" | "confirmed" | "completed";

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  fee: number;
  status: EventStatus;
  eoContact: {
    name: string;
    phone: string;
    email?: string;
  };
  requirements?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  notes?: string;
}

export interface BoothChecklist {
  id: string;
  eventId: string;
  preEvent: ChecklistItem[];
  duringEvent: ChecklistItem[];
  postEvent: ChecklistItem[];
}

export interface Hook {
  id: string;
  text: string;
  tags: string[];
  performance?: {
    views: number;
    engagement: number;
  };
  createdAt: string;
}

export interface ContentPlan {
  id: string;
  eventId: string;
  date: string;
  hookId?: string;
  caption: string;
  shotList: string[];
  posted: boolean;
}

export interface Review {
  id: string;
  eventId: string;
  sales: number;
  views: number;
  engagement: number;
  topHooks: string[];
  issues?: string;
  learnings?: string;
  photos?: string[];
  createdAt: string;
}

export interface Milestone {
  id: string;
  type: "event" | "sales" | "followers" | "custom";
  title: string;
  description: string;
  achieved: boolean;
  achievedAt?: string;
  createdAt: string;
}

export interface DailyMotivation {
  id: string;
  quote: string;
  author: string;
  category: "business" | "product" | "growth" | "founder";
}

export interface Tagline {
  id: string;
  text: string;
  context: "formal" | "social" | "emotional";
  emoji?: string;
}

export interface AppData {
  events: Event[];
  checklists: BoothChecklist[];
  hooks: Hook[];
  contentPlans: ContentPlan[];
  reviews: Review[];
  milestones: Milestone[];
  lastSync?: string;
}
