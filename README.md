# MealBridge System

## Project Overview
MealBridge is a dual-platform (Web & Mobile) food management solution designed for small community-based food schemes in Pretoria, South Africa. It connects donors, volunteers, and beneficiaries to improve the efficiency of food collection, management, and distribution.

## Student Developer Information
- **Developer Name:** Ntsako Nkosi
- **Student Number:** ST10328180
- **Team Name:** CODECRAFTERS
- **Module Code:** XISD6329 / XISD6329w
- **Qualification:** Diploma in IT in Software Development (DISD0601)

## System Technology Stack
- **Web Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Mobile Application:** Native Android SDK (Kotlin)
- **Authentication:** Single Sign-On (OAuth 2.0 / Firebase Auth)
- **Database System:** Relational Database (MySQL / MS SQL Server)
- **DevOps & CI/CD:** Azure DevOps Kanban Board & GitHub Actions Workflows

## Repository Directory Blueprint
```text
mealbridge-system/
├── .github/
│   └── workflows/
│       └── main.yml           <-- GitHub Actions Automated CI/CD Workflow
├── docs/
│   ├── wireframes/            <-- Web and Mobile UI Wireframe PNGs
│   └── sitemap.png            <-- System Sitemap Diagram
├── src/
│   ├── web/
│   │   ├── index.html         <-- Semantic HTML Baseline Page
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js
│   └── mobile/                <-- Native Android Studio (Kotlin) Project Root
└── readme.md                  <-- Project Documentation
