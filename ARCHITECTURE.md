# Application Architecture

## Overview
This application has been refactored to follow a production-grade SaaS architecture with clear separation of concerns. Each feature has its own dedicated route with distinct purpose and UI.

## Route Structure

### `/` - Home Page
- **Purpose**: Marketing landing page
- **Features**: Hero section, feature highlights, testimonials, stats, CTA sections
- **Layout**: Full-page scrolling sections with animations
- **Components**: AnimatedBackground, FloatingShapes, Footer

### `/dashboard` - Dashboard (Overview)
- **Purpose**: Analytics and quick action hub
- **Features**: 
  - Usage statistics cards (validations, success rate, errors, time saved)
  - Quick action cards to navigate to other sections
  - Recent activity feed
- **Layout**: Grid-based cards and widgets
- **NO**: Code editor or validation features (those belong in `/editor`)

### `/editor` - Code Editor
- **Purpose**: Full IDE-like code editing and validation workspace
- **Features**:
  - Large code editor with line numbers
  - Real-time bracket validation
  - Inline error highlighting
  - Error panel with detailed messages
- **Layout**: Split view - editor on left, errors on right
- **Components**: CodeEditor, ErrorPanel

### `/live-analysis` - Live Analysis
- **Purpose**: Real-time validation metrics and detailed error analysis
- **Features**:
  - Validation score visualization
  - Error breakdown by type (stray closing, mismatch, missing closing)
  - Detailed algorithm information
  - Compact code editor for testing
- **Layout**: Grid layout with metrics cards and analysis panels
- **Components**: CodeEditor (compact), AnalysisView

### `/history` - Validation History
- **Purpose**: Track past validation results
- **Features**:
  - Timeline of validation sessions
  - Success/failure indicators
  - Timestamp tracking
  - Login prompt for unauthenticated users
- **Layout**: Vertical list with cards
- **Components**: HistoryView
- **Auth**: Soft-protected (shows login prompt if not authenticated)

### `/guide` - Usage Guide
- **Purpose**: Documentation and examples
- **Features**:
  - Feature explanations
  - Code examples (valid and invalid)
  - Best practices
- **Layout**: Documentation-style layout with cards
- **Components**: GuideView

### `/profile` - User Profile
- **Purpose**: Account management and settings
- **Features**:
  - User information display
  - Account details
  - Login prompt for unauthenticated users
- **Layout**: Profile card layout
- **Components**: ProfileView
- **Auth**: Soft-protected (shows login prompt if not authenticated)

### `/login` - Login Page
- **Purpose**: User authentication
- **Redirects to**: `/dashboard` after successful login

### `/signup` - Signup Page
- **Purpose**: User registration
- **Redirects to**: `/dashboard` after successful signup

## Global Components

### `GlobalNavigation`
- Fixed navigation bar at the top
- Tab-based navigation with active state
- Responsive design (collapses on mobile)
- Auth state management (Login/Logout button)
- Hidden on `/login` and `/signup` pages

### `AnimatedBackground`
- Gradient animated background
- Used on all main pages for visual consistency

### `FloatingShapes`
- Decorative animated shapes
- Adds visual interest to pages

### `FloatingChatbot`
- AI assistant widget (if enabled)
- Available on main pages

### `Footer`
- Site footer with links and information
- Consistent across all pages

## Design Principles

1. **Clear Separation**: Each route has a distinct purpose and UI - no shared page layouts between main features
2. **Scalable Structure**: New features can be added as new routes without affecting existing ones
3. **Component Reusability**: Shared components (CodeEditor, ErrorPanel, etc.) can be composed differently per route
4. **User Experience**: Tab switching feels like changing contexts, not just query parameters
5. **Production-Ready**: Clean folder structure, no duplicate logic, deployable on Vercel

## State Management

- **Local State**: Each page manages its own state (validation errors, user input, etc.)
- **Auth State**: Global auth context via MockAuthProvider
- **No Shared Validation State**: Each page that needs validation has its own editor instance

## Key Differences from Previous Architecture

### Before (Tab-based):
- Single `/dashboard` page with query parameter tabs (`?tab=editor`, `?tab=history`, etc.)
- All content rendered from one page component
- Shared state between tabs
- Same layout for all features

### After (Route-based):
- Separate routes for each feature (`/editor`, `/history`, `/dashboard`, etc.)
- Each route has its own dedicated page component
- Independent state per page
- Distinct layouts per feature
- Dashboard is now a true overview page with metrics and quick actions

## Navigation Flow

```
Home (/) 
  ├─> Login (/login) ─> Dashboard (/dashboard)
  ├─> Signup (/signup) ─> Dashboard (/dashboard)
  └─> Get Started ─> Editor (/editor)

Dashboard (/dashboard)
  ├─> Open Editor ─> Editor (/editor)
  ├─> Live Analysis ─> Live Analysis (/live-analysis)
  └─> View History ─> History (/history)

Global Navigation (available on all pages except login/signup)
  ├─> Home (/)
  ├─> Dashboard (/dashboard)
  ├─> Editor (/editor)
  ├─> Live Analysis (/live-analysis)
  ├─> History (/history)
  ├─> Guide (/guide)
  └─> Profile (/profile)
```

## Future Enhancements

- Add database integration for persistent history
- Implement real-time collaboration features
- Add code sharing and export functionality
- Enhanced analytics and reporting on dashboard
