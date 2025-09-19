const nodemailer = require('nodemailer');
const config = require('./config');

// For testing purposes, use nodemailer's test account
let transporter;

// Function to create a test transporter
async function createTestTransporter() {
    // Generate test SMTP service account
    const testAccount = await nodemailer.createTestAccount();
    
    // Create a testing transporter
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
}

/**
 * Send an email notification to the teacher about high-risk students
 * @param {Array} highRiskStudents - Array of students with HIGH risk level
 * @returns {Promise} - Nodemailer send mail promise with test URL
 */
const sendHighRiskNotification = async (highRiskStudents) => {
  if (!highRiskStudents || highRiskStudents.length === 0) {
    console.log('No high-risk students to report');
    return;
  }

  // Create test transporter if not already created
  if (!transporter) {
    transporter = await createTestTransporter();
  }

  // Create a table of high-risk students for the email body
  const studentsTable = highRiskStudents.map(student => {
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${student.student_id}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${student.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${student.attendance_percent}%</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${student.average_score}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${student.days_overdue}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${student.flagDetails.join(', ')}</td>
      </tr>
    `;
  }).join('');

  // Email content
  const mailOptions = {
    from: '"DropoutGuard System" <alert@dropoutguard.edu>',
    to: config.email.teacherEmail,
    subject: 'High Risk Students Alert - DropOutGuard',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">High Risk Students Alert</h2>
        <p>The following students have been identified as high risk and may require immediate attention:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px; border: 1px solid #ddd;">Student ID</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Name</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Attendance</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Average Score</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Days Overdue</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Issues</th>
            </tr>
          </thead>
          <tbody>
            ${studentsTable}
          </tbody>
        </table>
        
        <p style="margin-top: 20px;">Please take appropriate action to support these students.</p>
        <p>This is an automated message from the DropOutGuard system.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    // Log the test URL where the email can be previewed
    console.log('Email Preview URL: ' + nodemailer.getTestMessageUrl(info));
    
    // Return both the mail info and the preview URL
    return {
      ...info,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendHighRiskNotification
};