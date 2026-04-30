export interface SchoolEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Course {
  code: string;
  name: string;
  faculty: string;
  created_at?: string;
}

export interface TimetableSession {
  id: number;
  day: string;
  time: string;
  course_code: string;
  programs: string;
  faculty: string;
  room: string;
  created_at?: string;
  courses?: Course; // For joined data
}
