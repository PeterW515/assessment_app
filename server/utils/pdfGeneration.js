const { jsPDF } = require("jspdf");
const { autoTable } = require('jspdf-autotable');
const logoURI = require("./logoURI.json");

module.exports = function (data) {
    const doc = new jsPDF({
        unit: "in",
        format: "letter"
    });

    doc.setFont('Times', 'Bold');
    doc.setFontSize(12);

    doc.addImage(logoURI.data, 'JPEG', 4.75, 0.5, 3.26, .35);

    doc.text("Name:", 1, 1.5);
    //TODO add client name

    doc.text("Date:", 1, 1.8);
    //TODO add client name

    //import weight
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

            ['Bench', '', ''],
            ['Squat', '', ''],
            ['Deadlift', '', ''],
            ['Pullups', '', ''],
            ['Push Ups (1 min)', '', ''],
            ['Sit Ups (1 min)', '', ''],
            ['Max plank time', '', ''],
            ['Max hang time*', '', ''],
            ['Broad jump*', '', ''],
            ['Vertical Jump (CMJ)*', '', ''],
            ['10 yard dash*', '', ''],
        ]
    });

    doc.text("*Typically reserved for athletes:", 1, 6.5);

    doc.setFontSize(13)
    doc.text("Mobility", 1, 7);

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

    doc.setFontSize(20)
    doc.text("Assessment Report", 1, 10);
    doc.setFontSize(10)
    doc.text("(410) 288-7765", 6.5, 9.8);
    doc.text("@wonderflyathletics", 6.5, 10);
    doc.text("wonderflyathletics.com", 6.5, 10.2);

    doc.addPage();

    doc.setFontSize(12);

    doc.addImage(logoURI.data, 'JPEG', 4.75, 0.5, 3.26, .35);

    doc.text("Name:", 1, 1.5);
    //TODO add client name

    doc.text("Date:", 1, 1.8);
    //TODO add client name

    doc.setFontSize(14);
    doc.text("Daily Health Goals", 1, 2.4);

    //import weight
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

    doc.text("Additional Notes:", 1, 3.5);
    doc.setFontSize(20)
    doc.text("Assessment Report", 1, 10);
    doc.setFontSize(10)
    doc.text("(410) 288-7765", 6.5, 9.8);
    doc.text("@wonderflyathletics", 6.5, 10);
    doc.text("wonderflyathletics.com", 6.5, 10.2);


    doc.save("a8.pdf");
}