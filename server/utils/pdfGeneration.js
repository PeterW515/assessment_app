const { jsPDF } = require("jspdf");
const { autoTable } = require('jspdf-autotable');
const logoURI = require("./logoURI.json");

module.exports = function (data) {

    //start document
    const doc = new jsPDF({
        unit: "in",
        format: "letter"
    });

    //destructure data for report
    const { clientHeader, assessmentSummary } = data;

    //set initial font style
    doc.setFont('Times', 'Bold');
    doc.setFontSize(12);

    //add wonderfly logo
    doc.addImage(logoURI.data, 'JPEG', 4.75, 0.5, 3.26, .35);

    //client name and date of assessment
    doc.text("Name:", 1, 1.5);
    doc.text(clientHeader.firstName + ' ' + clientHeader.lastName, 1.5, 1.5);
    doc.text("Date:", 1, 1.8);
    doc.text(assessmentSummary.assessmentDate, 1.5, 1.8);

    //table with exercises and weights for each
    doc.autoTable({
        startY: 2.5,
        styles: {
            lineColor: [255, 0, 0],
            lineWidth: .01,
        },
        headStyles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
        theme: 'grid',
        margin: { left: 1, right: 1 },
        head: [['Movement', 'Weight', 'Notes']],
        body: [

            ['Bench', assessmentSummary.bench, ''],
            ['Squat', assessmentSummary.squat, ''],
            ['Deadlift', assessmentSummary.deadlift, ''],
            ['Pullups', assessmentSummary.pullUps, ''],
            ['Push Ups (1 min)', '', ''],
            ['Sit Ups (1 min)', assessmentSummary.sitUps, ''],
            ['Max plank time', '', ''],
            ['Max hang time*', '', ''],
            ['Broad jump*', '', ''],
            ['Vertical Jump (CMJ)*', assessmentSummary.cmj, ''],
            ['10 yard dash*', '', ''],
        ]
    });
    doc.setFontSize(12)
    doc.text("*Typically reserved for athletes", 1, 6.3);

    //start mobility table with header
    doc.setFontSize(13)
    doc.text("Mobility", 1, 7);

    //mobility table
    doc.autoTable({
        startY: 7.2,
        styles: {
            lineColor: [255, 0, 0],
            lineWidth: .01,
        },
        headStyles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
        theme: 'grid',
        margin: { left: 1, right: 1 },
        head: [['Movement', 'Good/Bad', 'Notes']],
        body: [

            ['Shoulder', '', ''],
            ['Deep Squat', '', ''],
            ['Overhead Squat', '', '']
        ]
    });


    //document footer
    doc.setFontSize(20)
    doc.text("Assessment Report", 1, 10);
    doc.setFontSize(10)
    doc.text("(410) 288-7765", 6.5, 9.8);
    doc.text("@wonderflyathletics", 6.5, 10);
    doc.text("wonderflyathletics.com", 6.5, 10.2);

    //create new page, set font size, add logo, name, and date
    doc.addPage();
    doc.setFontSize(12);
    doc.addImage(logoURI.data, 'JPEG', 4.75, 0.5, 3.26, .35);
    doc.text("Name:", 1, 1.5);
    doc.text(clientHeader.firstName + ' ' + clientHeader.lastName, 1.5, 1.5);
    doc.text("Date:", 1, 1.8);
    doc.text(assessmentSummary.assessmentDate, 1.5, 1.8);

    //start new health table
    doc.setFontSize(14);
    doc.text("Daily Health Goals", 1, 2.4);
    doc.autoTable({
        startY: 2.5,
        styles: {
            lineColor: [255, 0, 0],
            lineWidth: .01,
        },
        headStyles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
        theme: 'grid',
        margin: { left: 1, right: 1 },
        head: [['Calories', 'Protein(g)', 'Fats(g)', 'Carbs(g)', 'Water(oz)', 'Sleep(hrs)']],
        body: [

            ['', '', '', '', '', ''],

        ]
    });

    //additional notes section
    doc.text("Additional Notes:", 1, 3.5);
    doc.setFontSize(12)
    doc.text(assessmentSummary.notes, 1, 3.8);


    //document footer
    doc.setFontSize(20)
    doc.text("Assessment Report", 1, 10);
    doc.setFontSize(10)
    doc.text("(410) 288-7765", 6.5, 9.8);
    doc.text("@wonderflyathletics", 6.5, 10);
    doc.text("wonderflyathletics.com", 6.5, 10.2);

    return doc;
    //doc.save("../resources/assessments/" + clientHeader.id + "_" + assessmentSummary.id + "_assessment.pdf");
}