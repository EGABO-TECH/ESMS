export interface SchoolEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  created_by: string | null;
  created_at: string;
}
