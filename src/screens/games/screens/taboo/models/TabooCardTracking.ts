import {TabooCard} from './TabooCard';

export interface TabooCardTracking {
  card: TabooCard;
  status: TabooCardTrackingStatus;
  unMentionableWordSaid?: number;
  isLatestPreviousCard: boolean;
}

export type TabooCardTrackingStatus = 'guessed' | 'failed' | 'skipped' | 'pending';
