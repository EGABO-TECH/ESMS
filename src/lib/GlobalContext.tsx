"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  MOCK_STUDENTS, 
  MOCK_COURSES, 
  MOCK_STATS, 
  MOCK_TRANSACTIONS, 
  MOCK_GRADING, 
  MOCK_STUDENT_RESULTS,
  MOCK_USERS,
  MOCK_ASSIGNMENTS,
  MOCK_MATERIALS,
  MOCK_LESSON_PLANS,
  MOCK_TRANSCRIPT_REQUESTS
} from "./mockData";

type GlobalContextType = {
  students: typeof MOCK_STUDENTS;
  setStudents: React.Dispatch<React.SetStateAction<typeof MOCK_STUDENTS>>;
  courses: typeof MOCK_COURSES;
  setCourses: React.Dispatch<React.SetStateAction<typeof MOCK_COURSES>>;
  stats: typeof MOCK_STATS;
  setStats: React.Dispatch<React.SetStateAction<typeof MOCK_STATS>>;
  transactions: typeof MOCK_TRANSACTIONS;
  setTransactions: React.Dispatch<React.SetStateAction<typeof MOCK_TRANSACTIONS>>;
  grading: typeof MOCK_GRADING;
  setGrading: React.Dispatch<React.SetStateAction<typeof MOCK_GRADING>>;
  studentResults: typeof MOCK_STUDENT_RESULTS;
  setStudentResults: React.Dispatch<React.SetStateAction<typeof MOCK_STUDENT_RESULTS>>;
  
  users: typeof MOCK_USERS;
  setUsers: React.Dispatch<React.SetStateAction<typeof MOCK_USERS>>;
  assignments: typeof MOCK_ASSIGNMENTS;
  setAssignments: React.Dispatch<React.SetStateAction<typeof MOCK_ASSIGNMENTS>>;
  materials: typeof MOCK_MATERIALS;
  setMaterials: React.Dispatch<React.SetStateAction<typeof MOCK_MATERIALS>>;
  lessonPlans: typeof MOCK_LESSON_PLANS;
  setLessonPlans: React.Dispatch<React.SetStateAction<typeof MOCK_LESSON_PLANS>>;
  transcriptRequests: typeof MOCK_TRANSCRIPT_REQUESTS;
  setTranscriptRequests: React.Dispatch<React.SetStateAction<typeof MOCK_TRANSCRIPT_REQUESTS>>;

  // High-level Actions
  enrollStudent: (studentId: string) => void;
  verifyTransaction: (transactionId: string) => void;
  updateCourseProgress: (courseCode: string, newProgress: number) => void;
  deleteStudent: (studentId: string) => void;
  deleteCourse: (courseCode: string) => void;
  addTranscriptRequest: (request: typeof MOCK_TRANSCRIPT_REQUESTS[0]) => void;
  updateTranscriptRequestStatus: (id: string, newStatus: string) => void;
  deleteTranscriptRequest: (id: string) => void;
  enrollStudentInCourse: (studentId: string, courseCode: string) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Profile Image
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;

  // Financial State
  hasBalance: boolean;
  setHasBalance: (hasBalance: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Utility to initialize state from localStorage with format validation
  const getInitialState = <T,>(key: string, fallback: T, validator?: (v: unknown) => boolean): T => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // If a validator is provided and it fails, the cached data is stale — clear it
          if (validator && !validator(parsed)) {
            localStorage.removeItem(key);
            return fallback;
          }
          return parsed as T;
        } catch (e) {
          console.error(`Error parsing ${key} from localStorage`, e);
          localStorage.removeItem(key);
        }
      }
    }
    return fallback;
  };

  const [students, setStudents] = useState(() => getInitialState("esms-students", MOCK_STUDENTS));
  const [courses, setCourses] = useState(() => getInitialState("esms-courses", MOCK_COURSES));
  const [stats, setStats] = useState(() => getInitialState("esms-stats", MOCK_STATS));
  const [transactions, setTransactions] = useState(() => getInitialState("esms-transactions", MOCK_TRANSACTIONS));
  const [grading, setGrading] = useState(() => getInitialState("esms-grading", MOCK_GRADING));
  const [studentResults, setStudentResults] = useState(() => getInitialState("esms-results", MOCK_STUDENT_RESULTS));
  const [users, setUsers] = useState(() => getInitialState("esms-users", MOCK_USERS));
  const [assignments, setAssignments] = useState(() => getInitialState("esms-assignments", MOCK_ASSIGNMENTS));
  // Validate materials is a plain object (Record), NOT an array (old format)
  const [materials, setMaterials] = useState(() => getInitialState(
    "esms-materials-v2",
    MOCK_MATERIALS,
    (v) => typeof v === "object" && v !== null && !Array.isArray(v)
  ));
  const [lessonPlans, setLessonPlans] = useState(() => getInitialState("esms-lesson-plans", MOCK_LESSON_PLANS));
  const [transcriptRequests, setTranscriptRequests] = useState(() => getInitialState("esms-transcript-requests", MOCK_TRANSCRIPT_REQUESTS));
  const [hasBalance, setHasBalance] = useState(true);

  // Persist state changes to localStorage
  useEffect(() => { localStorage.setItem("esms-students", JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem("esms-courses", JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem("esms-stats", JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem("esms-transactions", JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem("esms-grading", JSON.stringify(grading)); }, [grading]);
  useEffect(() => { localStorage.setItem("esms-results", JSON.stringify(studentResults)); }, [studentResults]);
  useEffect(() => { localStorage.setItem("esms-users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("esms-assignments", JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem("esms-materials-v2", JSON.stringify(materials)); }, [materials]);
  useEffect(() => { localStorage.setItem("esms-lesson-plans", JSON.stringify(lessonPlans)); }, [lessonPlans]);
  useEffect(() => { localStorage.setItem("esms-transcript-requests", JSON.stringify(transcriptRequests)); }, [transcriptRequests]);

  // ── Cross-tab sync ────────────────────────────────────────────────────────
  // When the Lecturer uploads in one tab, this listener fires in ALL other
  // tabs (e.g. the Student portal) and syncs React state automatically.
  useEffect(() => {
    const syncFromStorage = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        switch (e.key) {
          case "esms-materials-v2":    setMaterials(parsed);       break;
          case "esms-assignments":     setAssignments(parsed);     break;
          case "esms-students":        setStudents(parsed);        break;
          case "esms-users":           setUsers(parsed);           break;
          case "esms-courses":         setCourses(parsed);         break;
          case "esms-lesson-plans":    setLessonPlans(parsed);     break;
          case "esms-transactions":    setTransactions(parsed);    break;
          case "esms-grading":         setGrading(parsed);         break;
          case "esms-results":         setStudentResults(parsed);  break;
        }
      } catch {
        // ignore malformed JSON
      }
    };
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  // Initialise from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("esms-dark-mode");
      if (saved !== null) return saved === "true";
      return false; // Default to light mode
    }
    return false;
  });

  // Apply / remove the `dark` class on <html> whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("esms-dark-mode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Profile Image
  const [profileImage, setProfileImageState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("esms-profile-image");
    }
    return null;
  });

  const setProfileImage = (image: string | null) => {
    setProfileImageState(image);
    if (image) {
      localStorage.setItem("esms-profile-image", image);
    } else {
      localStorage.removeItem("esms-profile-image");
    }
  };

  const enrollStudent = (studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: "Enrolled" } : s));
  };

  const verifyTransaction = (transactionId: string) => {
    setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: "Verified" } : t));
  };

  const updateCourseProgress = (courseCode: string, newProgress: number) => {
    setCourses(prev => prev.map(c => c.code === courseCode ? { ...c, progress: newProgress } : c));
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const deleteCourse = (courseCode: string) => {
    setCourses(prev => prev.filter(c => c.code !== courseCode));
  };

  const addTranscriptRequest = (request: typeof MOCK_TRANSCRIPT_REQUESTS[0]) => {
    setTranscriptRequests(prev => [request, ...prev]);
  };

  const updateTranscriptRequestStatus = (id: string, newStatus: string) => {
    setTranscriptRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteTranscriptRequest = (id: string) => {
    setTranscriptRequests(prev => prev.filter(r => r.id !== id));
  };

  const enrollStudentInCourse = (studentId: string, courseCode: string) => {
    const course = courses.find(c => c.code === courseCode);
    if (!course) return;
    
    const alreadyEnrolled = studentResults.some(r => r.studentId === studentId && r.code === courseCode);
    if (alreadyEnrolled) return;

    const newResult = {
      studentId,
      code: course.code,
      name: course.name,
      credits: course.credits,
      cw: 0,
      exam: 0,
      score: 0,
      grade: "N/A",
      gp: 0.0,
    };
    
    setStudentResults(prev => [...prev, newResult]);
    setCourses(prev => prev.map(c => c.code === courseCode ? { ...c, students: c.students + 1 } : c));
  };

  return (
    <GlobalContext.Provider value={{
      students, setStudents,
      courses, setCourses,
      stats, setStats,
      transactions, setTransactions,
      grading, setGrading,
      studentResults, setStudentResults,
      users, setUsers,
      assignments, setAssignments,
      materials, setMaterials,
      lessonPlans, setLessonPlans,
      transcriptRequests, setTranscriptRequests,
      enrollStudent,
      verifyTransaction,
      updateCourseProgress,
      deleteStudent,
      deleteCourse,
      addTranscriptRequest,
      updateTranscriptRequestStatus,
      deleteTranscriptRequest,
      enrollStudentInCourse,
      darkMode,
      toggleDarkMode,
      profileImage,
      setProfileImage,
      hasBalance,
      setHasBalance,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
