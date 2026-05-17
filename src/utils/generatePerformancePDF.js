import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generatePerformancePDF(students) {

  const doc = new jsPDF("landscape");

  doc.setFontSize(20);

  doc.text(
    "DEPARTMENT OF MICROBIOLOGY",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    "Government Medical College & Hospital, Ramanathapuram",
    14,
    30
  );

  doc.text(
    "Complete Student Performance Report",
    14,
    40
  );

  const tableData = students.map((student) => {

    // Theory %

    const theoryPercentage = Math.round(

      (
        student.theoryAttended /
        student.theoryTaken
      ) * 100

    );

    // Practical %

    const practicalPercentage = Math.round(

      (
        student.practicalAttended /
        student.practicalTaken
      ) * 100

    );

    // FA Average

    const faAverage = Math.round(

      (
        student.fa1 +
        student.fa2 +
        student.fa3 +
        student.fa4 +
        student.fa5 +
        student.fa6 +
        student.fa7 +
        student.fa8
      ) / 8

    );

    // PCT Average

    const pctAverage = Math.round(

      (
        student.pct1Theory +
        student.pct1Practical +
        student.pct2Theory +
        student.pct2Practical
      ) / 4

    );

    // Overall

    const overall = Math.round(

      (
        theoryPercentage +
        practicalPercentage +
        faAverage +
        pctAverage
      ) / 4

    );

    // Status

    const status =
      overall < 50
      ||
      theoryPercentage < 75
      ||
      practicalPercentage < 75
        ? "AT RISK"
        : "GOOD";

    return [

      student.regno,

      student.name,

      `${student.theoryAttended}/${student.theoryTaken}
       (${theoryPercentage}%)`,

      `${student.practicalAttended}/${student.practicalTaken}
       (${practicalPercentage}%)`,

      faAverage,

      pctAverage,

      overall,

      status

    ];

  });

  autoTable(doc, {

    startY: 50,

    head: [[

      "Reg No",

      "Student Name",

      "Theory Attendance",

      "Practical Attendance",

      "FA Avg",

      "PCT Avg",

      "Overall",

      "Status"

    ]],

    body: tableData

  });

  doc.save(
    "Complete_Student_Performance_Report.pdf"
  );

}