# 🚀 Real-Time Bracket Validator

### Production-Grade Syntax Validation SaaS

A **real-time bracket syntax validation platform** built with a modern SaaS architecture.
It provides instant feedback, analytics, and validation insights for developers writing code.

This project is structured to be **scalable, maintainable, and production-ready**, following industry best practices.

Visit 
https://bracket-validator-6h8nhgqqs-vikramjeetmaity8-gmailcoms-projects.vercel.app/
---

## 📌 Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Application Architecture](#application-architecture)
* [Route Structure](#route-structure)
* [Navigation Flow](#navigation-flow)
* [Environment Setup](#environment-setup)
* [Installation & Running Locally](#installation--running-locally)
* [State Management](#state-management)
* [Authentication Model](#authentication-model)
* [Design Principles](#design-principles)
* [Folder Structure](#folder-structure)
* [Deployment](#deployment)
* [Future Enhancements](#future-enhancements)
* [Security Notes](#security-notes)
* [License](#license)

---

## 🧠 Overview

**Real-Time Bracket Validator** is a developer-focused web application that validates bracket syntax in real time using stack-based algorithms.

Unlike simple validators, this platform:

* Separates **editing**, **analysis**, **history**, and **dashboard** concerns
* Provides **visual analytics**
* Follows a **true SaaS routing architecture**
* Is deployable directly on **Vercel**

---

## ✨ Key Features

* ✅ Real-time bracket validation
* 📊 Validation analytics & scoring
* 🧩 Detailed error explanations
* 🧠 Stack-based algorithm insights
* 🕒 Validation history tracking
* 🤖 Floating AI assistant (optional)
* 🎨 Modern UI with animations
* 📱 Fully responsive
* 🔐 Soft authentication support

---

## 🛠 Tech Stack

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **React**
* **Tailwind CSS**
* **Framer Motion**

### Backend / Services

* **MongoDB** (history & user data)
* **Groq API** (AI assistant)

### Tooling

* **Vercel** (deployment)
* **ESLint + Prettier**
* **Git & GitHub**

---

## 🏗 Application Architecture

This project follows a **route-based SaaS architecture** with strict separation of concerns.

Each feature:

* Has its **own route**
* Has **independent state**
* Uses **shared reusable components**
* Has a **distinct UI layout**

This ensures scalability and clean code organization.

---

## 🧭 Route Structure

### `/` — Home (Landing Page)

**Purpose**: Marketing & onboarding
**Includes**:

* Hero section
* Feature highlights
* Testimonials
* CTA sections
* Animated background

---

### `/dashboard` — Dashboard

**Purpose**: Overview & analytics
**Includes**:

* Usage statistics
* Quick navigation cards
* Recent activity

🚫 No code editor here (by design)

---

### `/editor` — Code Editor

**Purpose**: Core validation workspace
**Includes**:

* Large IDE-like editor
* Line numbers
* Real-time validation
* Inline error highlights
* Error panel

---

### `/live-analysis` — Live Analysis

**Purpose**: Deep validation insights
**Includes**:

* Validation score
* Error breakdown by type
* Algorithm explanation
* Compact editor

---

### `/history` — Validation History

**Purpose**: Track past validations
**Includes**:

* Timeline view
* Success/failure indicators
* Timestamps

🔐 Soft-protected (shows login prompt if not authenticated)

---

### `/guide` — Usage Guide

**Purpose**: Documentation
**Includes**:

* How it works
* Examples
* Best practices

---

### `/profile` — User Profile

**Purpose**: Account & settings
🔐 Soft-protected

---

### `/login` — Login

### `/signup` — Signup

Redirects to `/dashboard` after success.

---

## 🧭 Navigation Flow

```
Home (/)
 ├─ Login (/login) → Dashboard
 ├─ Signup (/signup) → Dashboard
 └─ Get Started → Editor

Dashboard
 ├─ Editor
 ├─ Live Analysis
 └─ History

Global Navigation
 ├─ Home
 ├─ Dashboard
 ├─ Editor
 ├─ Live Analysis
 ├─ History
 ├─ Guide
 └─ Profile
```

---

## 🔐 Environment Setup

Create a `.env.local` file in the **root directory**.

> ⚠️ Use **your own API keys**
> ❌ Never commit `.env.local` to GitHub

### `.env.local`

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string_here

# Groq AI
GROQ_API_KEY=your_groq_api_key_here
```

📍 Location:

```
realtimebracketvalidator/
├─ app/
├─ components/
├─ lib/
├─ .env.local
├─ package.json
└─ README.md
```

---

## 📦 Installation & Running Locally

```bash
# Clone repo
git clone https://github.com/Shadx-007/flash-heckton.git

# Enter project
cd realtimebracketvalidator

# Install dependencies
npm install

# Run dev server
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🧠 State Management

* **Local state per route**
* No shared editor state across pages
* Independent validation instances
* Global auth handled via `MockAuthProvider`

---

## 🔑 Authentication Model

* Soft-protected routes
* Shows login prompt if unauthenticated
* No hard blocking for public access
* Easily replaceable with real auth (NextAuth / Firebase)

---

## 🎨 Design Principles

1. **Clear separation of concerns**
2. **Scalable routing**
3. **Reusable components**
4. **Production-ready UX**
5. **No shared page logic**
6. **Future-proof architecture**

---

## 📂 Folder Structure

```
app/
 ├─ dashboard/
 ├─ editor/
 ├─ live-analysis/
 ├─ history/
 ├─ guide/
 ├─ profile/
 ├─ login/
 ├─ signup/
 └─ page.tsx

components/
 ├─ CodeEditor.tsx
 ├─ ErrorPanel.tsx
 ├─ FloatingChatbot.tsx
 ├─ GlobalNavigation.tsx
 └─ AnimatedBackground.tsx

lib/
 └─ bracket-validator.ts
```

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import repo into **Vercel**
3. Add environment variables:

   * `MONGO_URI`
   * `GROQ_API_KEY`
4. Deploy 🎉

---

## 🔮 Future Enhancements

* Persistent history with DB
* Team collaboration
* Code sharing links
* Export reports
* Advanced analytics
* Real authentication
* Paid plans (SaaS)

---

## 🔒 Security Notes

* `.env.local` is ignored
* API keys never exposed to client
* Server-only access for secrets
* Ready for enterprise hardening

---

## 📜 License

MIT License
Free to use, modify, and distribute.

---

### 💬 Author

Built by **Shad_x007**
Production-ready SaaS architecture 🚀

---

