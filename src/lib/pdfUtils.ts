import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Student {
  id: string;
  name: string;
  program: string;
  email: string;
  intake?: string;
  phoneNumber?: string;
}

interface EnrolledSubject {
  code: string;
  name: string;
  credits: number;
}

export const downloadAdmissionPDF = (student: Student, subjects: EnrolledSubject[]) => {
  const doc = new jsPDF() as any;

  // Header - Logo Placeholder
  doc.setFillColor(0, 51, 102);
  doc.circle(25, 25, 10, "F");
  doc.setTextColor(255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("CUU", 25, 26, { align: "center" });

  // Header - University Info
  doc.setFontSize(22);
  doc.setTextColor(0, 51, 102); // Dark blue
  doc.text("CAVENDISH UNIVERSITY UGANDA", 105, 25, { align: "center" });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Office of the University Registrar • Admission Letter", 105, 32, { align: "center" });
  
  // Divider
  doc.setDrawColor(200);
  doc.line(20, 40, 190, 40);

  // Student Details Section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("OFFICIAL ADMISSION RECORD", 20, 55);

  doc.setFontSize(11);
  doc.text(`Student Name:`, 20, 65);
  doc.setFont("helvetica", "bold");
  doc.text(student.name, 60, 65);

  doc.setFont("helvetica", "normal");
  doc.text(`Student ID:`, 20, 72);
  doc.setFont("helvetica", "bold");
  doc.text(student.id, 60, 72);

  doc.setFont("helvetica", "normal");
  doc.text(`Academic Program:`, 20, 79);
  doc.setFont("helvetica", "bold");
  doc.text(student.program, 60, 79);

  doc.setFont("helvetica", "normal");
  doc.text(`Intake:`, 20, 86);
  doc.setFont("helvetica", "bold");
  doc.text(student.intake || "N/A", 60, 86);

  doc.setFont("helvetica", "normal");
  doc.text(`Email:`, 20, 93);
  doc.setFont("helvetica", "bold");
  doc.text(student.email, 60, 93);

  // Enrolled Subjects Table
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("ENROLLED SUBJECTS", 20, 110);

  const tableRows = subjects.map((sub) => [sub.code, sub.name, sub.credits.toString()]);

  autoTable(doc, {
    startY: 115,
    head: [["Course Code", "Subject Name", "Credits"]],
    body: tableRows.length > 0 ? tableRows : [["No subjects assigned", "-", "-"]],
    theme: "striped",
    headStyles: { fillColor: [0, 51, 102], textColor: 255 },
    margin: { left: 20, right: 20 },
  });

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("This is an official computer-generated document.", 105, pageHeight - 30, { align: "center" });
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, pageHeight - 25, { align: "center" });

  // Download the PDF
  doc.save(`Admission_${student.id}_${student.name.replace(/\s+/g, "_")}.pdf`);
};
