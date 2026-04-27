export const MOCK_STUDENTS = [
  { 
    id: "CUU-258-154", 
    name: "Egabo Aaron", 
    program: "Software Engineering", 
    year: "4", 
    sem: "1", 
    status: "Enrolled", 
    email: "a.egabo@students.cavendish.ac.ug", 
    nationality: "Ugandan", 
    applied_at: "2023-10-23T09:15:00Z",
    intake: "Aug 2022"
  },
  { 
    id: "CUU-230-500", 
    name: "Faida Nancy", 
    program: "Data Science & AI", 
    year: "1", 
    sem: "1", 
    status: "Pending", 
    email: "n.faida@students.cavendish.ac.ug", 
    nationality: "Ugandan", 
    applied_at: "2024-01-10T11:00:00Z",
    intake: "Aug 2025"
  },
  { 
    id: "CUU-273-318", 
    name: "Ababiku Brenda", 
    program: "Business Admin (BBA)", 
    year: "3", 
    sem: "2", 
    status: "Enrolled", 
    email: "b.ababiku@students.cavendish.ac.ug", 
    nationality: "Ugandan", 
    applied_at: "2023-10-24T10:00:00Z",
    intake: "Aug 2023"
  },
  { 
    id: "CUU-269-896", 
    name: "Alimpa Anne Hillary", 
    program: "Information Technology (BSIT)", 
    year: "2", 
    sem: "1", 
    status: "Enrolled", 
    email: "h.alimpa@students.cavendish.ac.ug", 
    nationality: "Kenyan", 
    applied_at: "2023-10-23T14:30:00Z",
    intake: "Jan 2024"
  },
  { 
    id: "CUU-274-961", 
    name: "Kirabo Alice", 
    program: "Laws (LLB)", 
    year: "1", 
    sem: "2", 
    status: "Inactive", 
    email: "a.kirabo@students.cavendish.ac.ug", 
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
  { code: "SWE311", name: "Software Lifecycle",      credits: 4, score: 81, grade: "A",  gp: 5.0 },
  { code: "SWE312", name: "Mobile App Dev",          credits: 4, score: 76, grade: "B+", gp: 4.5 },
  { code: "SWE313", name: "Cloud Computing",         credits: 3, score: 83, grade: "A",  gp: 5.0 },
  { code: "SWE314", name: "System Architecture",     credits: 4, score: 44, grade: "F",  gp: 0.0 },
];

