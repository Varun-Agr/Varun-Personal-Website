/**
 * Google Apps Script for Form Submissions (Hiring & Contact Forms)
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet for storing submissions
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire code into the script editor
 * 4. Update the CONFIG section below with your email
 * 5. Save and deploy as Web App:
 *    - Click Deploy > New deployment
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and update the form actions in:
 *    - layouts/shortcodes/hiring-callout.html
 *    - content/footer/footer.md (form_action parameter)
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  // Email address to receive notifications
  NOTIFICATION_EMAIL: "hello@varunagrawal.com", // CHANGE THIS!

  // Sheet names where submissions will be logged
  HIRING_SHEET_NAME: "TIA Hiring",
  CONTACT_SHEET_NAME: "Contact Form Submissions",

  // Email template settings
  HIRING_EMAIL_SUBJECT: "New Hiring Application: {name}",
  CONTACT_EMAIL_SUBJECT: "New Contact Form Submission: {name}",
  FROM_NAME: "Varun Agrawal Website",

  // Timezone for timestamps (default: GMT+5:30 for India)
  TIMEZONE: "Asia/Kolkata",
};

// ============================================
// MAIN HANDLER
// ============================================

/**
 * Handle POST requests from both hiring and contact forms
 */
function doPost(e) {
  try {
    // Parse form data
    const formData = e.parameter;

    // Determine form type based on field presence
    const isHiringForm = formData.linkedin && formData.resume;
    const isContactForm = formData.full_name && formData.message;

    if (isHiringForm) {
      // Validate hiring form required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.linkedin ||
        !formData.resume
      ) {
        return createResponse(false, "Missing required fields");
      }

      // Log to hiring sheet
      logToHiringSheet(formData);

      // Send hiring email notification
      sendHiringEmailNotification(formData);

      return createResponse(true, "Application submitted successfully!");
    } else if (isContactForm) {
      // Validate contact form required fields
      if (!formData.full_name || !formData.email || !formData.message) {
        return createResponse(false, "Missing required fields");
      }

      // Log to contact sheet
      logToContactSheet(formData);

      // Send contact email notification
      sendContactEmailNotification(formData);

      return createResponse(true, "Message sent successfully!");
    } else {
      return createResponse(false, "Invalid form data");
    }
  } catch (error) {
    Logger.log("Error processing form: " + error.toString());
    return createResponse(
      false,
      "Error processing your submission. Please try again.",
    );
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return HtmlService.createHtmlOutput(
    "<h1>Form Handler</h1>" +
      "<p>This endpoint accepts POST requests from the hiring and contact forms.</p>" +
      "<p>Status: Active</p>",
  );
}

// ============================================
// GOOGLE SHEET OPERATIONS
// ============================================

/**
 * Log hiring form data to Google Sheet
 */
function logToHiringSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.HIRING_SHEET_NAME);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.HIRING_SHEET_NAME);
    // Add headers
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Email",
      "Contact",
      "LinkedIn URL",
      "CV/Resume URL",
      "Status",
    ]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#478079");
    headerRange.setFontColor("#ffffff");

    // Freeze header row
    sheet.setFrozenRows(1);
  }

  // Format timestamp
  const timestamp = Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    "yyyy-MM-dd HH:mm:ss",
  );

  // Append the data
  sheet.appendRow([
    timestamp,
    data.name || "",
    data.email || "",
    data.contact || "Not provided",
    data.linkedin || "",
    data.resume || "",
    "New", // Status column for tracking
  ]);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 7);

  Logger.log("Hiring data logged to sheet successfully");
}

/**
 * Log contact form data to Google Sheet
 */
function logToContactSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.CONTACT_SHEET_NAME);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.CONTACT_SHEET_NAME);
    // Add headers
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Message",
      "Status",
    ]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#478079");
    headerRange.setFontColor("#ffffff");

    // Freeze header row
    sheet.setFrozenRows(1);
  }

  // Format timestamp
  const timestamp = Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    "yyyy-MM-dd HH:mm:ss",
  );

  // Append the data
  sheet.appendRow([
    timestamp,
    data.full_name || "",
    data.email || "",
    data.phone || "Not provided",
    data.message || "",
    "New", // Status column for tracking
  ]);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 6);

  Logger.log("Contact data logged to sheet successfully");
}

// ============================================
// EMAIL NOTIFICATIONS
// ============================================

/**
 * Send email notification for new hiring submission
 */
function sendHiringEmailNotification(data) {
  const subject = CONFIG.HIRING_EMAIL_SUBJECT.replace("{name}", data.name);

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #478079 0%, #396861 100%);
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: white;
          padding: 30px;
          border: 1px solid #e9ecef;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f0f0f0;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #478079;
          margin-bottom: 5px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value {
          font-size: 16px;
          color: #333;
          word-break: break-word;
        }
        .value a {
          color: #478079;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e9ecef;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          margin: 20px 0;
          padding: 12px 30px;
          background-color: #478079;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎯 New Hiring Application</h1>
      </div>

      <div class="content">
        <p style="font-size: 16px; margin-bottom: 25px;">
          A new application has been submitted for the Talent Identification Advisor position.
        </p>

        <div class="field">
          <div class="label">Applicant Name</div>
          <div class="value">${data.name}</div>
        </div>

        <div class="field">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>

        <div class="field">
          <div class="label">Contact Number</div>
          <div class="value">${data.contact || "Not provided"}</div>
        </div>

        <div class="field">
          <div class="label">LinkedIn Profile</div>
          <div class="value"><a href="${data.linkedin}" target="_blank">${data.linkedin}</a></div>
        </div>

        <div class="field">
          <div class="label">CV/Resume</div>
          <div class="value"><a href="${data.resume}" target="_blank">${data.resume}</a></div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${getSpreadsheetUrl()}" class="cta-button">
            View All Applications
          </a>
        </div>
      </div>

      <div class="footer">
        <p>This email was automatically generated by the Hiring Form system.</p>
        <p>Timestamp: ${Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "MMM dd, yyyy HH:mm:ss z")}</p>
      </div>
    </body>
    </html>
  `;

  const plainTextBody = `
New Hiring Application Received

Applicant Name: ${data.name}
Email: ${data.email}
Contact: ${data.contact || "Not provided"}
LinkedIn: ${data.linkedin}
Resume: ${data.resume}

View all applications: ${getSpreadsheetUrl()}

---
Timestamp: ${Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "MMM dd, yyyy HH:mm:ss z")}
  `.trim();

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody,
      name: CONFIG.FROM_NAME,
    });
    Logger.log("Hiring email notification sent successfully");
  } catch (error) {
    Logger.log("Error sending email: " + error.toString());
  }
}

/**
 * Send email notification for new contact form submission
 */
function sendContactEmailNotification(data) {
  const subject = CONFIG.CONTACT_EMAIL_SUBJECT.replace(
    "{name}",
    data.full_name,
  );

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #478079 0%, #396861 100%);
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: white;
          padding: 30px;
          border: 1px solid #e9ecef;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f0f0f0;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #478079;
          margin-bottom: 5px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value {
          font-size: 16px;
          color: #333;
          word-break: break-word;
        }
        .value a {
          color: #478079;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .message-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          margin-top: 10px;
          white-space: pre-wrap;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e9ecef;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          margin: 20px 0;
          padding: 12px 30px;
          background-color: #478079;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📬 New Contact Form Submission</h1>
      </div>

      <div class="content">
        <p style="font-size: 16px; margin-bottom: 25px;">
          Someone has reached out via the contact form on your website.
        </p>

        <div class="field">
          <div class="label">Name</div>
          <div class="value">${data.full_name}</div>
        </div>

        <div class="field">
          <div class="label">Email Address</div>
          <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>

        <div class="field">
          <div class="label">Phone Number</div>
          <div class="value">${data.phone || "Not provided"}</div>
        </div>

        <div class="field">
          <div class="label">Message</div>
          <div class="value">
            <div class="message-box">${data.message}</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${getSpreadsheetUrl()}" class="cta-button">
            View All Submissions
          </a>
        </div>
      </div>

      <div class="footer">
        <p>This email was automatically generated by the Contact Form system.</p>
        <p>Timestamp: ${Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "MMM dd, yyyy HH:mm:ss z")}</p>
      </div>
    </body>
    </html>
  `;

  const plainTextBody = `
New Contact Form Submission

Name: ${data.full_name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

Message:
${data.message}

View all submissions: ${getSpreadsheetUrl()}

---
Timestamp: ${Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "MMM dd, yyyy HH:mm:ss z")}
  `.trim();

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody,
      name: CONFIG.FROM_NAME,
    });
    Logger.log("Contact email notification sent successfully");
  } catch (error) {
    Logger.log("Error sending email: " + error.toString());
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create JSON response
 */
function createResponse(success, message) {
  const output = JSON.stringify({
    success: success,
    message: message,
  });

  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * Get spreadsheet URL
 */
function getSpreadsheetUrl() {
  return SpreadsheetApp.getActiveSpreadsheet().getUrl();
}
