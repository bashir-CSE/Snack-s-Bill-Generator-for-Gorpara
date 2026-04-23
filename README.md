Automation Link: https://script.google.com/macros/s/AKfycbzlL7oMpgigyGsCYTm0WAvZUTK4hT6Hsq0TtgOmOI9Wz-VbiylxvOM57leGeun8t0pp/exec

# Snack's Bill Generator

![Built with Google Apps Script](https://img.shields.io/badge/Backend-Google%20Apps%20Script-blue)
![Frontend](https://img.shields.io/badge/Frontend-Bootstrap%205-purple)
![License](https://img.shields.io/badge/License-MIT-green)

**A fully automated, cloud-based solution for generating daily snack bills, designed for the Ayesha Abed Foundation (Gorpara, Manikganj).**

---

## 📖 Table of Contents
1.  [The Problem](#-the-problem)
2.  [The Solution](#-the-solution)
3.  [Key Features](#-key-features)
4.  [Tech Stack](#-tech-stack)
5.  [Setup & Installation](#-installation--setup)
6.  [Use Case](#-use-case)
7.  [Opportunities & Impact](#-opportunities--impact)
8.  [Limitations](#-limitations)
9.  [Future Improvements](#-future-improvements)

---

## 🚨 The Problem

In our production center, the Section In-charge faced significant challenges with the manual preparation of daily snack bills:
*   **High Error Rate:** Manual calculations often resulted in financial discrepancies.
*   **Repetitive Effort:** A single mistake meant redoing the entire bill from scratch.
*   **Data Management:** Adding new workers or removing inactive ones required manual spreadsheet editing, often done by separate data entry personnel.
*   **Resource Wastage:** Valuable time was lost on administrative tasks rather than core production management.

## 💡 The Solution

The **Snack's Bill Generator** is a serverless web application hosted on Google Apps Script. It digitizes the billing workflow, allowing section in-charges to generate professional PDF bills in Bengali directly from their browser.

**Latest Update:** The system now supports **full data management**, allowing users to add new artisans or remove inactive ones directly from the interface without touching the backend spreadsheet.

---

## ✨ Key Features

### 1. Intelligent Bill Generation
*   **Dynamic PDF Creation:** Generates print-ready PDFs with Bengali numerals and text conversion (e.g., `150` → `একশ পঞ্চাশ`).
*   **Smart Pagination:** Automatically splits large lists into multiple pages (30 artisans per page) with sub-totals.
*   **Signature Ready:** Includes designated areas for Prepared By, Verified By, and Approved By.

### 2. Interactive Data Management (New)
*   **Quick Add Artisans:** Users can instantly add a new artisan name and code via the "Quick Add" bar without opening the Google Sheet.
*   **Delete Functionality:** Remove duplicate or inactive artisan records directly from the modal table with one click.
*   **Visible Codes:** The selection table now displays the artisan's Code clearly, preventing confusion between workers with similar names.

### 3. Modern User Interface
*   **Glassmorphism Design:** A clean, modern aesthetic with smooth animations.
*   **Real-time Search:** Filter artisans by name or code instantly.
*   **Select All/None:** Toggle visibility for all artisans with a single switch.

### 4. Cloud Architecture
*   **Google Drive Integration:** PDFs are automatically saved and organized in a specific Drive folder.
*   **Auto-Cleanup:** A time-driven trigger runs at midnight to delete old PDFs and clear logs, ensuring no storage bloat.
*   **History Tracking:** Displays the current day's generated bills for quick access.

---

## 🛠 Tech Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Custom Properties), Bootstrap 5, Font Awesome |
| **Logic** | Vanilla JavaScript (ES6), jQuery (optional) |
| **Backend** | Google Apps Script (Serverless) |
| **Database** | Google Sheets (SpreadsheetService) |
| **Storage** | Google Drive (DriveApp) |
| **AI Assistance** | Gemini 3.1 Pro, Z.ai GLM-5-Turbo |

---

## ⚙️ Installation & Setup

To deploy this project for your organization:

### 1. Google Sheet Configuration
1.  Create a Google Sheet.
2.  **Sheet 1:** Name it `Sections Name`. List all section names in Column A.
3.  **Sheet 2:** Name it `Snack's Bill`. Leave this empty (used for logging).
4.  **Other Sheets:** Create a sheet for each section (e.g., `Cutting`, `Sewing`). In these sheets, Column A = **Name**, Column B = **Code**.

### 2. Google Drive Setup
1.  Create a folder in Google Drive for storing PDFs.
2.  Copy the **Folder ID** from the URL.

### 3. Apps Script Deployment
1.  Open your Google Sheet and go to **Extensions > Apps Script**.
2.  Delete existing files and create two files: `Code.gs` and `index.html`.
3.  Paste the provided code into the respective files.
4.  **Update Configuration:**
    *   In `Code.gs`, replace `SPREADSHEET_ID` and `DRIVE_FOLDER_ID` with your actual IDs.
5.  Click **Deploy > New Deployment**.
    *   Type: **Web App**.
    *   Execute as: **Me**.
    *   Who has access: **Anyone** (or your organization's domain).
6.  Copy the Web App URL and share it with your team.

---

## 🎯 Use Case

**Scenario:** A new artisan named "Karim" joins the "Sewing" section, and another artisan "Rahim" has left the job. The Section In-charge needs to generate today's bill.

1.  **Select Section:** The In-charge opens the app, selects "Sewing," and enters the snack rate.
2.  **Load Data:** Clicking "Load Artisans" opens the list.
3.  **Manage Changes:**
    *   *Add New:* The In-charge types "Karim" and his code in the **Quick Add** bar and clicks **Add**. Karim appears instantly in the list, checked and ready.
    *   *Remove:* The In-charge finds "Rahim," clicks the **Delete (Trash Icon)** button next to his name, and confirms. Rahim is removed from the database permanently.
4.  **Generate:** The In-charge clicks **Generate Bill**.
5.  **Result:** A PDF is created with the updated list, saved to Drive, and ready for printing.

---

## 📈 Opportunities & Impact

*   **Operational Efficiency:** Reduces the time spent on bill preparation by **90%**.
*   **Data Integrity:** Empowers Section In-charges to manage their own team lists, removing the need for a middleman data entry operator.
*   **Scalability:** The framework is generic and can be deployed to other production centers (e.g., Jamalpur, Tangail) by simply duplicating the Sheet and Script.
*   **Go Green:** Eliminates the need for physical paper drafts and manual filing.

---

## ⚠️ Limitations

1.  **Internet Dependency:** As a cloud-based app, it requires a stable internet connection to load data and generate PDFs.
2.  **Concurrent Editing:** If two users try to delete or add artisans in the exact same second, one might overwrite the other (Google Sheets handles this reasonably well, but it's a minor edge case).
3.  **No "Undo" for Deletion:** Once an artisan is deleted via the interface, they are permanently removed from the Google Sheet. They must be re-added manually if deleted by mistake.
4.  **Browser Compatibility:** Optimized for modern browsers (Chrome, Edge, Safari). May not function correctly on Internet Explorer.

---

## 🚀 Future Improvements

1.  **Edit Functionality:** Allow users to correct a name or code without deleting and re-adding the row.
2.  **Dashboard Analytics:** A visual dashboard showing monthly snack expenses per section using Google Charts.
3.  **WhatsApp Integration:** A button to share the generated PDF directly to a WhatsApp group.
4.  **PWA Support:** Make the app installable on mobile home screens for offline data viewing.
5.  **Audit Log:** Create a separate "Audit" sheet to track who deleted or added which artisan and when.

---

## 🙏 Acknowledgements

*   **Ayesha Abed Foundation** — Gorpara, Manikganj.
*   **Gemini 3.1 Pro & Z.ai GLM-5-Turbo** — For code logic assistance.
*   **Bootstrap Team** — For the UI framework.

---
*Developed with ❤️ for Ayesha Abed Foundation.*
