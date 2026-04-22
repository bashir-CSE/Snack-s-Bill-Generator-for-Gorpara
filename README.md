# Snack's Bill Generator

**A fully automated, cloud-based solution for generating daily snack bills, designed specifically for the Ayesha Abed Foundation (Gorpara, Manikganj).**

![Built with Google Apps Script](https://img.shields.io/badge/Built%20with-Google%20Apps%20Script-blue)
![Built with Bootstrap](https://img.shields.io/badge/Style-Bootstrap%205-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Table of Contents
1.  [Problem Statement](#-problem-statement)
2.  [The Solution](#-the-solution)
3.  [Key Features](#-key-features)
4.  [Tech Stack](#-tech-stack)
5.  [Installation & Setup](#-installation--setup)
6.  [Use Case](#-use-case)
7.  [Opportunities & Impact](#-opportunities--impact)
8.  [Limitations](#-limitations)
9.  [Future Improvements](#-future-improvements)
10. [Acknowledgements](#-acknowledgements)

---

## 🚨 Problem Statement

In our production center, the Section In-charge was required to prepare daily snack bills manually. This traditional method presented several challenges:
*   **High Error Rate:** Manual entry often led to calculation mistakes or duplicate entries.
*   **Repetitive Effort:** If a single mistake occurred, the entire bill had to be redone from scratch, wasting valuable time.
*   **Resource Wastage:** Significant man-hours were lost in administrative tasks rather than core production management.
*   **Data Retrieval:** Searching for past records in physical files was inefficient and prone to data loss.

## 💡 The Solution

The **Snack's Bill Generator** is a web application hosted on Google Apps Script that digitizes and automates the entire billing workflow.

By simply selecting a date, section, and rate, the system automatically fetches artisan lists, allows for selection, and generates a professionally formatted PDF bill in Bengali. This solution has successfully:
*   **Reduced manual effort by 90%.**
*   **Improved operational efficiency by 50–70%.**
*   **Eliminated repetitive tasks** via automated calculation and PDF generation.

---

## ✨ Key Features

### 1. Intelligent Automation
*   **Dynamic Data Fetching:** Automatically loads artisan lists based on the selected section from the Google Sheet database.
*   **Rate Memory:** Remembers the last used "Snack's Rate" for specific users, reducing data entry.
*   **Bengali Localization:** Automatically converts dates, numbers, and total amounts into Bengali text (e.g., converting `150` to `একশ পঞ্চাশ`).

### 2. Professional PDF Generation
*   **Standardized Format:** Generates uniform bills with headers for "BRAC - Aarong" and specific location details.
*   **Smart Pagination:** Automatically splits bills into multiple pages if the artisan count exceeds 30 per page.
*   **Signature Ready:** Includes built-in blocks for "Prepared By," "Verified By," and "Approved By."

### 3. Modern User Interface
*   **Glassmorphism Design:** Clean, modern aesthetic with blur effects and smooth transitions.
*   **Responsive Layout:** Fully functional on desktops, tablets, and mobile devices.
*   **Interactive Modals:** Easy selection of artisans with "Select All" toggles and real-time search filters.

### 4. Cloud Architecture
*   **Google Drive Integration:** PDFs are automatically saved to a specific Google Drive folder.
*   **Auto-Cleanup:** A time-driven trigger runs at midnight to delete previous PDFs and clear logs, ensuring no storage bloat.
*   **History Tracking:** Displays the current day's generated bills for quick access.

---

## 🛠 Tech Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Glassmorphism), Bootstrap 5, Font Awesome |
| **Backend** | Google Apps Script (Serverless) |
| **Database** | Google Sheets (SpreadsheetService) |
| **Storage** | Google Drive (DriveApp) |
| **AI Assistance** | Gemini 3.1 Pro, Z.ai GLM-5-Turbo (used for logic generation) |

---

## ⚙️ Installation & Setup

To deploy this project for your own organization, follow these steps:

### 1. Google Sheet Setup
1.  Create a new Google Sheet.
2.  Create a sheet named **`Sections Name`**. List all section names in Column A (starting from A2).
3.  Create individual sheets for **each section** (e.g., "Cutting", "Sewing"). In these sheets, Column A should contain **Artisan Names** and Column B should contain **Codes**.
4.  Create a blank sheet named **`Snack's Bill`** (This will store the logs).

### 2. Google Drive Setup
1.  Create a folder in Google Drive where the PDFs will be saved.
2.  Copy the **Folder ID** from the URL (e.g., `drive.google.com/drive/folders/[FOLDER_ID]`).

### 3. Apps Script Deployment
1.  Open your Google Sheet and go to **Extensions > Apps Script**.
2.  Delete any existing code and paste the contents of `Code.gs`.
3.  Create a new HTML file named `index` and paste the contents of `index.html`.
4.  **Update Configuration:**
    *   In `Code.gs`, replace `SPREADSHEET_ID` with your Sheet ID.
    *   Replace `DRIVE_FOLDER_ID` with your Drive Folder ID.
5.  Click **Deploy > New Deployment**.
6.  Select **Web App**.
7.  Set "Who has access" to **Anyone** (or specific domain users).
8.  Click **Deploy** and authorize the application.

---

## 🎯 Use Case

**Scenario:** It is 5:00 PM, and the Section In-charge needs to process the snack bills for the "Sewing" section.

1.  The In-charge opens the Web App link on their mobile device.
2.  They select the date (defaults to today) and choose "Sewing" from the dropdown.
3.  They enter the snack rate (e.g., 15 Taka) and click **Load Artisans**.
4.  A list of all artisans in "Sewing" appears. By default, all are selected. The In-charge unchecks anyone who was absent.
5.  They click **Generate Bill**.
6.  **Result:** A PDF is instantly generated in Bengali, saved to the Drive, and a link is provided. The total amount is automatically calculated in both numbers and words.

---

## 📈 Opportunities & Impact

*   **Scalability:** This framework can be adapted for other production centers (e.g., Jamalpur, Tangail) simply by changing the Google Sheet data source.
*   **Go Green:** Eliminates the need for physical paper drafts, contributing to environmental sustainability.
*   **Audit Readiness:** Digital records with timestamps make audits transparent and error-free.
*   **Time Management:** Section In-charges can now focus on production quality and team management rather than clerical work.

---

## ⚠️ Limitations

1.  **Google Quotas:** The script relies on Google Apps Script quotas (e.g., URL Fetch calls, Drive storage). Very large datasets (thousands of rows) might hit execution time limits.
2.  **Internet Dependency:** As a cloud-based app, it requires a stable internet connection to load data and generate PDFs.
3.  **Browser Compatibility:** While optimized for modern browsers (Chrome, Edge), older browsers (IE) may not render the UI correctly.
4.  **Static Data:** If an artisan is not listed in the Google Sheet, they cannot be added dynamically through the app interface; the sheet must be updated first.

---

## 🚀 Future Improvements

1.  **Authentication Layer:** Implement a login system to track which user generated which bill for better accountability.
2.  **Dashboard Analytics:** Integrate a chart dashboard to visualize monthly snack expenses per section.
3.  **WhatsApp Integration:** Add a feature to automatically share the generated PDF link to a WhatsApp group.
4.  **Offline Mode:** Use Progressive Web App (PWA) standards to allow data entry offline, which syncs when the connection is restored.
5.  **Edit Functionality:** Allow users to "Edit" a generated bill within a specific timeframe instead of generating a new one.

---

## 🙏 Acknowledgements

*   **Ayesha Abed Foundation** — Gorpara, Manikganj, for the opportunity to digitize their workflow.
*   **Gemini 3.1 Pro & Z.ai GLM-5-Turbo** — AI tools that assisted in code optimization and logic structuring.
*   **Bootstrap Team** — For the excellent frontend framework.

---
*Developed with ❤️ for Ayesha Abed Foundation.*
