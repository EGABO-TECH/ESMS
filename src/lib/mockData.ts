export const MOCK_STUDENTS = [
  { 
    id: "CUU-258-154", 
    name: "Egabo Aaron", 
    program: "Bachelor of Science in Software Engineering (BSE)", 
    year: "4", 
    sem: "1", 
    status: "Enrolled", 
    email: "a.egabo@students.cavendish.ac.ug", 
    phoneNumber: "+256 700 111 111",
    nationality: "Ugandan", 
    applied_at: "2023-10-23T09:15:00Z",
    intake: "Aug 2022"
  },
  { 
    id: "CUU-230-500", 
    name: "Faida Nancy", 
    program: "Bachelor of Science in Data Science and Analytics (BDSA)", 
    year: "1", 
    sem: "1", 
    status: "Pending", 
    email: "n.faida@students.cavendish.ac.ug", 
    phoneNumber: "+256 700 222 222",
    nationality: "Ugandan", 
    applied_at: "2024-01-10T11:00:00Z",
    intake: "Aug 2025"
  },
  { 
    id: "CUU-273-318", 
    name: "Ababiku Brenda", 
    program: "Bachelor of Business Administration (BBA)", 
    year: "3", 
    sem: "2", 
    status: "Enrolled", 
    email: "b.ababiku@students.cavendish.ac.ug", 
    phoneNumber: "+256 700 333 333",
    nationality: "Ugandan", 
    applied_at: "2023-10-24T10:00:00Z",
    intake: "Aug 2023"
  },
  { 
    id: "CUU-269-896", 
    name: "Alimpa Anne Hillary", 
    program: "Bachelor of Science in Information Technology (BIT)", 
    year: "2", 
    sem: "1", 
    status: "Enrolled", 
    email: "h.alimpa@students.cavendish.ac.ug", 
    phoneNumber: "+256 700 444 444",
    nationality: "Kenyan", 
    applied_at: "2023-10-23T14:30:00Z",
    intake: "Jan 2024"
  },
  { 
    id: "CUU-274-961", 
    name: "Kirabo Alice", 
    program: "Bachelor of Laws (LLB)", 
    year: "1", 
    sem: "2", 
    status: "Inactive", 
    email: "a.kirabo@students.cavendish.ac.ug", 
    phoneNumber: "+256 700 555 555",
    nationality: "Ugandan", 
    applied_at: "2023-09-15T08:00:00Z",
    intake: "Aug 2024"
  },
];

export const MOCK_STATS = {
  totalStudents: 4892,
  totalStaff: 342,
  activeCourses: 156,
  totalInvoiced: 4500000000,
  totalCollected: 3800000000,
  collectionRate: 84,
  availableFunds: 1200000000,
  outstandingFees: 700000000,
};

export const MOCK_COURSES = [
  { code: "SWE311", name: "Software Lifecycle Management", faculty: "Science & Technology", credits: 4, lecturer: "Dr. Sarah Johnson", status: "Active", students: 64, schedule: "Mon/Wed 10:00 AM", room: "LT-4", progress: 85, nextClass: "Tomorrow, 10:00 AM" },
  { code: "SWE313", name: "Cloud Computing Architecture", faculty: "Science & Technology", credits: 3, lecturer: "Mr. Egabo Aaron", status: "Active", students: 58, schedule: "Tue/Thu 02:00 PM", room: "Lab-2", progress: 70, nextClass: "Today, 02:00 PM" },
  { code: "BBA101", name: "Introduction to Business", faculty: "Business & Management", credits: 4, lecturer: "Prof. Alice M.", status: "Active", students: 120, schedule: "Wed 09:00 AM", room: "LT-1", progress: 45, nextClass: "Wed, 09:00 AM" },
  { code: "LLB211", name: "Constitutional Law", faculty: "Law", credits: 4, lecturer: "Justice Brenda A.", status: "Inactive", students: 45, schedule: "Thu 11:00 AM", room: "LT-2", progress: 90, nextClass: "Thu, 11:00 AM" },
  { code: "DSI101", name: "Data Science Fundamentals", faculty: "Science & Technology", credits: 4, lecturer: "Dr. Nancy Faida", status: "Active", students: 52, schedule: "Fri 10:00 AM", room: "Lab-3", progress: 30, nextClass: "Friday, 10:00 AM" },
];


export const MOCK_TRANSACTIONS = [
  { id: "TXN-8821", student: "Egabo Aaron", amount: "UGX 1,250,000", method: "MTN MoMo", date: "Oct 24, 2025", status: "Verified", reference: "MTN-9921-X" },
  { id: "TXN-8820", student: "Faida Nancy", amount: "UGX 850,000", method: "Stanbic Bank", date: "Oct 24, 2025", status: "Verified", reference: "SB-0021-A" },
  { id: "TXN-8819", student: "Alimpa Anne", amount: "UGX 1,100,000", method: "Airtel Money", date: "Oct 23, 2025", status: "Pending", reference: "ART-1122-B" },
  { id: "TXN-8818", student: "Kirabo Alice", amount: "UGX 1,250,000", method: "Centenary Bank", date: "Oct 23, 2025", status: "Verified", reference: "CB-4455-Q" },
  { id: "TXN-8817", student: "Ababiku Brenda", amount: "UGX 500,000", method: "Cash Deposit", date: "Oct 22, 2025", status: "Review", reference: "CASH-101" },
];

export const MOCK_GRADING = [
  { code: "SWE311", name: "Software Lifecycle", students: 64, avg: "81%", lecturer: "Dr. Sarah J.", status: "Approved" },
  { code: "SWE313", name: "Cloud Computing", students: 58, avg: "76%", lecturer: "Mr. Egabo A.", status: "Moderating" },
  { code: "BBA101", name: "Intro to Business", students: 120, avg: "68%", lecturer: "Prof. Alice M.", status: "Approved" },
  { code: "LLB211", name: "Constitutional Law", students: 45, avg: "54%", lecturer: "Justice Brenda", status: "Review Needed" },
  { code: "DSI101", name: "Data Science Fund.", students: 52, avg: "83%", lecturer: "Dr. Nancy F.", status: "Draft" },
];

export const GRADING_SCALE = [
  { grade: "A",  range: "80–100", gp: "5.0", color: "text-finance-success" },
  { grade: "B+", range: "75–79",  gp: "4.5", color: "text-primary" },
  { grade: "B",  range: "70–74",  gp: "4.0", color: "text-primary" },
  { grade: "C+", range: "65–69",  gp: "3.5", color: "text-exam-warning" },
  { grade: "C",  range: "60–64",  gp: "3.0", color: "text-exam-warning" },
  { grade: "D",  range: "50–59",  gp: "2.0", color: "text-orange-500" },
  { grade: "F",  range: "0–49",   gp: "0.0", color: "text-error" },
];

export const MOCK_STUDENT_RESULTS = [
  { studentId: "CUU-258-154", code: "SWE311", name: "Software Lifecycle", credits: 4, cw: 34, exam: 47, score: 81, grade: "A", gp: 5.0 },
  { studentId: "CUU-258-154", code: "SWE312", name: "Mobile App Dev", credits: 4, cw: 31, exam: 45, score: 76, grade: "B+", gp: 4.5 },
  { studentId: "CUU-258-154", code: "SWE313", name: "Cloud Computing", credits: 3, cw: 35, exam: 48, score: 83, grade: "A", gp: 5.0 },
  { studentId: "CUU-258-154", code: "SWE314", name: "System Architecture", credits: 4, cw: 18, exam: 26, score: 44, grade: "F", gp: 0.0 },
];

export const MOCK_USERS = [
  { id: "U-001", name: "Egabo Aaron", role: "Super Admin", department: "IT Center", status: "Active", email: "a.egabo@cuu.ac.ug", lastLogin: "10 mins ago", phone: "+256 700 000 001" },
  { id: "U-002", name: "Faida Nancy", role: "Registrar", department: "Academic Registry", status: "Active", email: "n.faida@cuu.ac.ug", lastLogin: "1 hour ago", phone: "+256 700 000 002" },
  { id: "U-003", name: "Ababiku Brenda", role: "Finance Officer", department: "Treasury", status: "Active", email: "b.ababiku@cuu.ac.ug", lastLogin: "Yesterday", phone: "+256 700 000 003" },
  { id: "U-004", name: "Alimpa Anne", role: "Lecturer", department: "Science & Tech", status: "Active", email: "h.alimpa@cuu.ac.ug", lastLogin: "2 days ago", phone: "+256 700 000 004" },
  { id: "U-005", name: "Kirabo Alice", role: "Admissions", department: "Admissions", status: "Inactive", email: "a.kirabo@cuu.ac.ug", lastLogin: "1 week ago", phone: "+256 700 000 005" },
];

export const MOCK_ASSIGNMENTS = [
  { id: 1, title: "System Design Proposal", course: "SWE313", dueDate: "2025-11-05", maxMarks: 100, instructions: "Design a distributed system for a university portal. Include ER diagram and architecture overview.", submissions: 42, total: 45, status: "Active" },
  { id: 2, title: "React Hooks Lab", course: "BIT201", dueDate: "2025-10-30", maxMarks: 40, instructions: "Build a to-do app using React hooks only. No class components.", submissions: 38, total: 40, status: "Closing Soon" },
  { id: 3, title: "Mid-Sem Take Home", course: "BCS101", dueDate: "2025-10-25", maxMarks: 60, instructions: "Answer all 5 questions. Show working for all calculations.", submissions: 120, total: 120, status: "Grading" },
  { id: 4, title: "Final Project Draft", course: "SWE422", dueDate: "2025-12-10", maxMarks: 100, instructions: "Submit your final project draft with technical documentation.", submissions: 5, total: 32, status: "Draft" },
];

export const MOCK_MATERIALS = [
  { id: 1, title: "Course Outline & Syllabus", type: "PDF", size: "2.4 MB", uploaded: "Oct 24, 2025", course: "SWE311" },
  { id: 2, title: "Lecture 1: Introduction", type: "PPTX", size: "5.1 MB", uploaded: "Oct 25, 2025", course: "SWE311" },
];

export const MOCK_LESSON_PLANS: Record<string, Record<string, string>> = {
  "SWE311": {
    "Week 1": "Introduction to Lifecycle Models\n- Waterfall vs Agile\n- Required reading: Chapter 1-3"
  }
};

export const MOCK_TRANSCRIPT_REQUESTS = [
  { id: "TR-9012", name: "Sande Sula", type: "Official", status: "In Progress", date: "2025-10-25" },
  { id: "TR-9013", name: "Sarah Nakato", type: "Unofficial", status: "Ready", date: "2025-10-26" },
  { id: "TR-9014", name: "James Okello", type: "Official", status: "Verified", date: "2025-10-27" },
  { id: "TR-9015", name: "Alice Nabirye", type: "Official", status: "Pending Payment", date: "2025-10-27" },
];
