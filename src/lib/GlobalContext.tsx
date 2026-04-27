"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  MOCK_STUDENTS, 
  MOCK_COURSES, 
  MOCK_STATS, 
  MOCK_TRANSACTIONS, 
  MOCK_GRADING, 
  MOCK_STUDENT_RESULTS 
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
  
  // High-level Actions
  enrollStudent: (studentId: string) => void;
  verifyTransaction: (transactionId: string) => void;
  updateCourseProgress: (courseCode: string, newProgress: number) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [stats, setStats] = useState(MOCK_STATS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [grading, setGrading] = useState(MOCK_GRADING);
  const [studentResults, setStudentResults] = useState(MOCK_STUDENT_RESULTS);

  // Initialise from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("esms-dark-mode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
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

  const enrollStudent = (studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: "Enrolled" } : s));
  };

  const verifyTransaction = (transactionId: string) => {
    setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: "Verified" } : t));
  };

  const updateCourseProgress = (courseCode: string, newProgress: number) => {
    setCourses(prev => prev.map(c => c.code === courseCode ? { ...c, progress: newProgress } : c));
  };

  return (
    <GlobalContext.Provider value={{
      students, setStudents,
      courses, setCourses,
      stats, setStats,
      transactions, setTransactions,
      grading, setGrading,
      studentResults, setStudentResults,
      enrollStudent,
      verifyTransaction,
      updateCourseProgress,
      darkMode,
      toggleDarkMode,
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
