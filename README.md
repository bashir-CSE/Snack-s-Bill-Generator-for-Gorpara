Automation Link: https://script.google.com/macros/s/AKfycbyWQmY8zlVSarYIEpRdgk0F8E09VQjWd_e3NJMr4sfu75TJXw_QOYmOoiU4hx6-YtbM/exec
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

**Latest Update:** The system now features **Centralized Artisan Management** and **Full Record Control**, allowing users to manage artisans and generated bills directly from the interface.

---

## ✨ Key Features

### 1. Intelligent Bill Generation
*   **Dynamic PDF Creation:** Generates print-ready PDFs with Bengali numerals and text conversion (e.g., `150` → `একশ পঞ্চাশ`).
*   **Smart Pagination:** Automatically splits large lists into multiple pages (30 artisans per page) with sub-totals.
*   **Signature Ready:** Includes designated areas for Prepared By, Verified By, and Approved By.

### 2. Centralized Data Management
*   **Unified Artisan List:** All artisans across all sections are now managed in a single `Artisans` sheet, making it easier to maintain.
*   **Quick Add Artisans:** Users can instantly add a new artisan name and code to any section via the "Quick Add" bar.
*   **Artisan Deletion:** Remove duplicate or inactive artisan records directly from the selection table.

### 3. Record Management & History
*   **Today's History:** Displays all bills generated on the current day with timestamps.
*   **Delete Bill:** Users can now delete a generated bill from the history. This action automatically removes the record from the spreadsheet and trashes the PDF file in Google Drive.

### 4. Modern User Interface & UX
*   **Improved Workflows:** Added confirmation modals for generating and deleting records to prevent accidental actions.
*   **Real-time Search:** Filter artisans by name or code instantly.
*   **Glassmorphism Design:** A clean, modern aesthetic with smooth animations and interactive feedback.

### 5. Cloud Architecture
*   **Google Drive Integration:** PDFs are automatically saved and organized in a specific Drive folder.
*   **Auto-Cleanup:** A time-driven trigger runs at midnight to delete old PDFs and clear logs, ensuring no storage bloat.

---

## 🛠 Tech Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, Bootstrap 5, Font Awesome, Google Fonts |
| **Logic** | Vanilla JavaScript (GAS V8 Compatible) |
| **Backend** | Google Apps Script (Serverless) |
| **Database** | Google Sheets (SpreadsheetService) |
| **Storage** | Google Drive (DriveApp) |

---

## ⚙️ Installation & Setup

To deploy this project for your organization:

### 1. Google Sheet Configuration
1.  Create a Google Sheet.
2.  **Sheet 1:** Name it `Sections`. List all section names in Column A.
3.  **Sheet 2:** Name it `Artisans`. Columns: `Section Name` (A), `Artisan Name` (B), `Code` (C).
4.  **Sheet 3:** Name it `Snack's Bill`. Columns: `Date` (A), `Section Name` (B), `Bill URL` (C), `Time` (D).

### 2. Google Drive Setup
1.  Create a folder in Google Drive for storing PDFs.
2.  Copy the **Folder ID** from the URL.

### 3. Apps Script Deployment
1.  Open your Google Sheet and go to **Extensions > Apps Script**.
2.  Create two files: `Code.gs` and `Index.html`.
3.  Paste the provided code into the respective files.
4.  **Update Configuration:** In `Code.gs`, replace `SPREADSHEET_ID` and `DRIVE_FOLDER_ID` with your actual IDs.
5.  Click **Deploy > New Deployment** (Type: Web App, Execute as: Me, Access: Anyone).

---

## 🙏 Acknowledgements

*   **Ayesha Abed Foundation** — Gorpara, Manikganj.
*   **Md Bashir Ahmed** — Lead Developer & MIS, AAF Gorpara.

---
*Developed with ❤️ for Ayesha Abed Foundation.*
