/**
 * MAV&CO — Contact form backend (Google Apps Script)
 *
 * What this does:
 *  1. Receives a POST from the site's Contact page.
 *  2. Appends the submission as a new row in a Google Sheet.
 *  3. Emails you a notification with the details.
 *
 * SETUP
 *  1. Go to https://sheets.google.com and create a new Sheet.
 *     Add a header row: Timestamp | Name | Email | Phone | Budget | Message
 *  2. In that Sheet: Extensions > Apps Script.
 *  3. Delete any starter code and paste this whole file in.
 *  4. Update NOTIFY_EMAIL below to your inbox.
 *  5. Click Deploy > New deployment > select type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  6. Copy the deployment URL — that's your VITE_GOOGLE_SCRIPT_URL.
 *  7. Paste it into your .env file on the website project.
 *
 * NOTE: every time you edit this script, you must create a NEW deployment
 * (or "Manage deployments" > edit > New version) for changes to go live.
 */

const NOTIFY_EMAIL = 'maverricdev@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.budget || '',
      data.message || '',
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: `New enquiry — ${data.name || 'Website contact form'}`,
      body:
        `Name: ${data.name || ''}\n` +
        `Email: ${data.email || ''}\n` +
        `Phone: ${data.phone || ''}\n` +
        `Budget: ${data.budget || ''}\n\n` +
        `Message:\n${data.message || ''}`,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
