'use client';

import {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  CalendarClock,
  CalendarDays,
  Ear,
  FileSearch,
  FolderKanban,
  Gauge,
  Images,
  Layers,
  LineChart,
  Link2,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  PieChart,
  Radar,
  Receipt,
  Share2,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Server components cannot pass component functions across the client boundary,
 * so page data references icons by name and they are resolved here.
 */
export const ICONS = {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  CalendarClock,
  CalendarDays,
  Ear,
  FileSearch,
  FolderKanban,
  Gauge,
  Images,
  Layers,
  LineChart,
  Link2,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  PieChart,
  Radar,
  Receipt,
  Share2,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  size = 22,
  className = '',
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name] ?? Activity;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}
