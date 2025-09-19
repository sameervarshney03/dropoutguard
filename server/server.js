const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const emailService = require('./emailService');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const upload = multer({ dest: 'uploads/' });

const processData = (files, res) => {
    const attendance = [];
    const tests = [];
    const fees = [];

    let counter = 0;

    const onEnd = () => {
        counter++;
        if (counter < 3) return;

        const mergedData = attendance.map(att => {
            const testData = tests.find(t => t.student_id === att.student_id);
            const feeData = fees.find(f => f.student_id === att.student_id);
            return { ...att, ...testData, ...feeData };
        });

        const processedData = mergedData.map(student => {
            let flags = 0;
            const flagDetails = [];

            if (parseInt(student.attendance_percent) < 75) {
                flags++;
                flagDetails.push(`Low attendance: ${student.attendance_percent}%`);
            }
            if (parseInt(student.average_score) < 40) {
                flags++;
                flagDetails.push(`Low score: ${student.average_score}`);
            }
            if (parseInt(student.days_overdue) > 30) {
                flags++;
                flagDetails.push(`Fee overdue: ${student.days_overdue} days`);
            }

            let risk = 'LOW';
            if (flags >= 2) {
                risk = 'HIGH';
            } else if (flags === 1) {
                risk = 'MEDIUM';
            }

            return { ...student, risk, flagDetails };
        });

        // Filter high-risk students and send email notification
        const highRiskStudents = processedData.filter(student => student.risk === 'HIGH');
        if (highRiskStudents.length > 0) {
            try {
                emailService.sendHighRiskNotification(highRiskStudents)
                    .then(() => console.log(`Email notification sent for ${highRiskStudents.length} high-risk students`))
                    .catch(err => console.error('Failed to send email notification:', err));
            } catch (error) {
                console.error('Error sending email notification:', error);
            }
        }

        res.json(processedData);
    };

    fs.createReadStream(files.attendance[0].path)
        .pipe(csv())
        .on('data', (data) => attendance.push(data))
        .on('end', onEnd);

    fs.createReadStream(files.tests[0].path)
        .pipe(csv())
        .on('data', (data) => tests.push(data))
        .on('end', onEnd);

    fs.createReadStream(files.fees[0].path)
        .pipe(csv())
        .on('data', (data) => fees.push(data))
        .on('end', onEnd);
};

app.get('/api/students', (req, res) => {
    const files = {
        attendance: [{ path: path.join(__dirname, '..', 'public', 'attendance.csv') }],
        tests: [{ path: path.join(__dirname, '..', 'public', 'tests.csv') }],
        fees: [{ path: path.join(__dirname, '..', 'public', 'fees.csv') }]
    };
    processData(files, res);
});

app.post('/api/upload', upload.fields([{ name: 'attendance' }, { name: 'tests' }, { name: 'fees' }]), (req, res) => {
    processData(req.files, res);
});

// API endpoint to manually trigger email notifications for testing
app.post('/api/send-notification', async (req, res) => {
    try {
        const files = {
            attendance: [{ path: path.join(__dirname, '..', 'public', 'attendance.csv') }],
            tests: [{ path: path.join(__dirname, '..', 'public', 'tests.csv') }],
            fees: [{ path: path.join(__dirname, '..', 'public', 'fees.csv') }]
        };
        
        const attendance = [];
        const tests = [];
        const fees = [];
        
        // Read attendance data
        await new Promise((resolve) => {
            fs.createReadStream(files.attendance[0].path)
                .pipe(csv())
                .on('data', (data) => attendance.push(data))
                .on('end', resolve);
        });
        
        // Read tests data
        await new Promise((resolve) => {
            fs.createReadStream(files.tests[0].path)
                .pipe(csv())
                .on('data', (data) => tests.push(data))
                .on('end', resolve);
        });
        
        // Read fees data
        await new Promise((resolve) => {
            fs.createReadStream(files.fees[0].path)
                .pipe(csv())
                .on('data', (data) => fees.push(data))
                .on('end', resolve);
        });
        
        // Process the data
        const mergedData = attendance.map(att => {
            const testData = tests.find(t => t.student_id === att.student_id);
            const feeData = fees.find(f => f.student_id === att.student_id);
            return { ...att, ...testData, ...feeData };
        });
        
        const processedData = mergedData.map(student => {
            let flags = 0;
            const flagDetails = [];
            
            if (parseInt(student.attendance_percent) < 75) {
                flags++;
                flagDetails.push(`Low attendance: ${student.attendance_percent}%`);
            }
            if (parseInt(student.average_score) < 40) {
                flags++;
                flagDetails.push(`Low score: ${student.average_score}`);
            }
            if (parseInt(student.days_overdue) > 30) {
                flags++;
                flagDetails.push(`Fee overdue: ${student.days_overdue} days`);
            }
            
            let risk = 'LOW';
            if (flags >= 2) {
                risk = 'HIGH';
            } else if (flags === 1) {
                risk = 'MEDIUM';
            }
            
            return { ...student, risk, flagDetails };
        });
        
        // Filter high-risk students and send email notification
         const highRiskStudents = processedData.filter(student => student.risk === 'HIGH');
         if (highRiskStudents.length > 0) {
             const info = await emailService.sendHighRiskNotification(highRiskStudents);
             res.json({ 
                 success: true, 
                 message: `Email notification sent for ${highRiskStudents.length} high-risk students`,
                 students: highRiskStudents,
                 emailPreviewUrl: info.previewUrl
             });
        } else {
            res.json({ success: false, message: 'No high-risk students found' });
        }
    } catch (error) {
        console.error('Error sending test notification:', error);
        res.status(500).json({ success: false, message: 'Failed to send notification', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
