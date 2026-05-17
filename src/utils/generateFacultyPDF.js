import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateFacultyPDF(selectedStudents) {

  const doc = new jsPDF();

  // Header

  doc.setFontSize(20);

  doc.text(
    "DEPARTMENT OF MICROBIOLOGY",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    "Government Medical College & Hospital, Ramanathapuram",
    20,
    30
  );

  doc.text(
    "Student Academic Performance Report",
    20,
    40
  );

  let startY = 55;

  selectedStudents.forEach((student, index) => {

    doc.setFontSize(14);

    doc.text(
      `Student ${index + 1}`,
      20,
      startY
    );

    autoTable(doc, {

      startY: startY + 5,

      body: [

        ["Name", student.name],
        ["Register Number", student.regno],
        ["Attendance", `${student.attendance}%`],
        ["Average", `${student.average}%`]

      ]

    });

    startY = doc.lastAutoTable.finalY + 15;

    // Page Break

    if (startY > 230) {

      doc.addPage();

      startY = 20;

    }

  });

  doc.save("Selected_Students_Marklist.pdf");

}