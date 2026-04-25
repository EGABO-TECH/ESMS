export type UserRole = 'admin' | 'staff' | 'student';
export type AdmissionStatus = 'pending' | 'interview' | 'offer' | 'enrolled' | 'rejected';
export type FinanceStatus = 'cleared' | 'partial' | 'arrears';
export type TransactionStatus = 'confirmed' | 'pending' | 'failed';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  campus: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Student {
  id: string;
  profile_id: string;
  student_number: string;
  programme: string;
  year_of_study: number;
  cgpa: number;
  credits_earned: number;
  credits_remaining: number;
  status: string;
  profiles?: Profile;
}

export interface Staff {
  id: string;
  profile_id: string;
  staff_number: string;
  department: string;
  title: string | null;
  profiles?: Profile;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: number;
  year: number;
  department: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  grade: string | null;
  grade_points: number | null;
  semester: number;
  academic_year: string;
  status: string;
  courses?: Course;
}

export interface FinanceRecord {
  id: string;
  student_id: string;
  fee_type: string;
  amount_ugx: number;
  paid_ugx: number;
  balance_ugx: number;
  due_date: string | null;
  academic_year: string;
  semester: number;
  status: FinanceStatus;
}

export interface Transaction {
  id: string;
  student_id: string;
  description: string;
  amount_ugx: number;
  transaction_date: string;
  reference: string | null;
  payment_method: string | null;
  status: TransactionStatus;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Admission {
  id: string;
  applicant_name: string;
  email: string | null;
  phone: string | null;
  programme: string;
  nationality: string;
  status: AdmissionStatus;
  documents: Record<string, string>;
  notes: string | null;
  applied_at: string;
}
