# ApnaResume - AI-Powered Resume Builder

<div align="center">

**A modern, AI-enhanced resume builder that helps you create professional resumes with intelligent content suggestions.**

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.8-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Data Models](#-data-models)
- [Key Features Guide](#-key-features-guide)
- [API & Server Actions](#-api--server-actions)
- [Customization](#-customization)
- [Build & Deployment](#-build--deployment)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)

---

## ✨ Features

### Core Features
- **AI-Powered Content Generation** - Generate professional summaries and job descriptions using Google Gemini AI
- **Multiple Resume Templates** - Choose between Classic, Modern, and Minimal designs
- **Real-time Live Preview** - See changes instantly as you edit your resume
- **Customizable Themes** - 8+ theme colors to personalize your resume
- **Rich Text Editing** - Format text, add lists, links, and styling to sections
- **Section Reordering** - Drag-and-drop sections to customize your resume layout
- **Social Links Integration** - Add links to LinkedIn, GitHub, Portfolio, LeetCode, and more

### Resume Sections
- **Personal Details** - Name, job title, contact information, and social profiles
- **Professional Summary** - AI-generated or manual summary of your professional background
- **Experience** - Work history with AI-powered job description generation
- **Education** - Academic qualifications with GPA tracking
- **Skills** - Technical and professional skills with proficiency levels
- **Achievements** - Notable accomplishments and awards
- **Certifications** - Professional certifications with issue/expiry dates and credential links
- **Custom Sections** - Add any additional sections with rich formatting

### User Management
- **Secure Authentication** - Clerk-based authentication and authorization
- **Dashboard** - Overview of all your resumes
- **Multiple Resumes** - Create and manage multiple resume versions
- **Resume Versioning** - Save different versions for different job applications

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Framework**: React 18
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI (Dialog, Dropdown, Alert, Toast, etc.)
- **Form Management**: React Hook Form + Zod validation
- **Text Editing**: React Quill & Draft.js
- **Rich Formatting**: HTML2PDF for resume export
- **Animations**: Tailwind CSS Animate

### Backend
- **Server Actions**: Next.js Server Actions for API calls
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Drag & Drop**: @hello-pangea/dnd

### DevOps
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm

---

## 🏗 Project Architecture

### Data Flow Architecture

```
User (Frontend)
    ↓
React Components (Client)
    ↓
Server Actions (Middleware)
    ↓
Database Operations (MongoDB + Mongoose)
    ↓
Data Response
    ↓
UI Update (Real-time via FormProvider Context)
```

### Authentication Flow

```
User → Clerk Auth Middleware → Protected Routes
                    ↓
            Route Matcher Check
                    ↓
         Authenticated User Access
                    ↓
        Unauthenticated Redirect to Sign-in
```

### AI Content Generation Flow

```
User Input (Job, Skills, Experience)
    ↓
Server Action (gemini.actions.ts)
    ↓
Google Generative AI API
    ↓
Structured JSON Response
    ↓
Parse & Validate Response
    ↓
Display to User for Review/Edit
```

---

## 💻 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or cloud)
- Clerk account for authentication
- Google Cloud Project with Generative AI API enabled

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/apnaresume.git
cd apnaresume
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
NEXT_MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key
```

### Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 5: Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
apnaresume/
├── app/                              # Next.js App Router
│   ├── (auth)/                      # Authentication pages group
│   │   ├── layout.tsx               # Auth layout wrapper
│   │   ├── page.tsx                 # Root auth page
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/                      # Main application group
│   │   ├── dashboard/               # Dashboard page
│   │   └── my-resume/
│   │       └── [id]/
│   │           ├── edit/            # Resume editor
│   │           └── view/            # Resume viewer
│   ├── globals.css                  # Global styles
│   └── layout.tsx                   # Root layout
│
├── components/
│   ├── common/                      # Reusable common components
│   │   ├── AddResume.tsx            # Add new resume button
│   │   ├── PageWrapper.tsx          # Page layout wrapper
│   │   ├── ProgressBarProvider.tsx  # Progress bar component
│   │   ├── ResumeCard.tsx           # Resume card display
│   │   └── RichTextEditor.tsx       # WYSIWYG text editor
│   ├── layout/                      # Layout components
│   │   ├── DashboardCards.tsx       # Dashboard statistics
│   │   ├── Header.tsx               # Page header
│   │   ├── HeaderText.tsx           # Header typography
│   │   ├── ResumeView.tsx           # Resume display view
│   │   ├── TemplatePreview.tsx      # Template preview card
│   │   ├── TemplateSelector.tsx     # Template selection UI
│   │   ├── ThemeColor.tsx           # Theme color picker
│   │   ├── TopBar.tsx               # Navigation top bar
│   │   └── my-resume/               # Resume editing components
│   │       ├── ResumeEditor.tsx     # Main editor (split panel)
│   │       ├── ResumeEditForm.tsx   # Form with tabs
│   │       ├── ResumePreview.tsx    # Live preview panel
│   │       ├── SectionOrderBoard.tsx# Drag-drop section ordering
│   │       ├── forms/               # Individual section forms
│   │       │   ├── PersonalDetailsForm.tsx
│   │       │   ├── SummaryForm.tsx
│   │       │   ├── ExperienceForm.tsx
│   │       │   ├── EducationForm.tsx
│   │       │   ├── SkillsForm.tsx
│   │       │   ├── AchievementForm.tsx
│   │       │   ├── CertificationForm.tsx
│   │       │   └── CustomSectionForm.tsx
│   │       ├── previews/            # Corresponding preview components
│   │       │   ├── PersonalDetailsPreview.tsx
│   │       │   ├── SummaryPreview.tsx
│   │       │   ├── ExperiencePreview.tsx
│   │       │   ├── EducationalPreview.tsx
│   │       │   ├── SkillsPreview.tsx
│   │       │   ├── AchievementPreview.tsx
│   │       │   ├── CertificationPreview.tsx
│   │       │   └── CustomSectionPreview.tsx
│   │       └── templates/           # Resume templates
│   │           ├── ClassicTemplate.tsx
│   │           ├── ModernTemplate.tsx
│   │           ├── MinimalTemplate.tsx
│   │           └── index.ts         # Template exports
│   └── ui/                          # Radix UI component library
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── alert-dialog.tsx
│       ├── popover.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── use-toast.ts
│
├── lib/
│   ├── actions/                     # Server actions (API layer)
│   │   ├── resume.actions.ts        # Resume CRUD operations
│   │   ├── gemini.actions.ts        # AI content generation
│   │   └── user.actions.ts          # User operations
│   ├── context/                     # React context
│   │   └── FormProvider.tsx         # Global form state management
│   ├── models/                      # Mongoose schemas
│   │   ├── resume.model.ts
│   │   ├── experience.model.ts
│   │   ├── education.model.ts
│   │   ├── skill.model.ts
│   │   ├── achievement.model.ts
│   │   ├── certification.model.ts
│   │   └── customSection.model.ts
│   ├── validations/
│   │   └── resume.ts                # Zod validation schemas
│   ├── mongoose.ts                  # MongoDB connection
│   ├── templates.ts                 # Template configuration
│   ├── utils.ts                     # Utility functions
│   ├── dummy.ts                     # Dummy data for development
│   └── dummyResume.ts               # Dummy resume data
│
├── public/                          # Static assets
│   └── img/
│
├── types/                           # TypeScript type definitions
│
├── middleware.ts                    # Clerk auth middleware
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
├── Dockerfile                       # Docker configuration
├── docker-compose.yml               # Docker Compose setup
└── README.md                        # This file
```

---

## 🗄 Data Models

### Resume Model

The central entity that connects all resume sections.

```typescript
{
  resumeId: String (unique)
  userId: String (required) - Clerk user ID
  title: String (required)
  updatedAt: Date
  firstName: String
  lastName: String
  jobTitle: String
  address: String
  phone: String
  email: String
  summary: String
  socialLinks: {
    linkedin: String
    twitter: String
    portfolio: String
    leetcode: String
    codeforces: String
    github: String
    instagram: String
  }
  experience: [ObjectId] → Experience
  education: [ObjectId] → Education
  skills: [ObjectId] → Skill
  achievements: [ObjectId] → Achievement
  certifications: [ObjectId] → Certification
  customSections: [ObjectId] → CustomSection
  themeColor: String (default: theme color)
  template: String (default: "classic")
  sectionOrder: [String] - Dynamic section ordering
}
```

### Experience Model

```typescript
{
  _id: ObjectId
  title: String (required)
  companyName: String (required)
  startDate: Date
  endDate: Date
  workSummary: String
  currentlyWorking: Boolean (default: false)
  resumeId: ObjectId → Resume
}
```

### Education Model

```typescript
{
  _id: ObjectId
  universityName: String (required)
  startDate: Date
  endDate: Date
  degree: String
  gpa: Number
  description: String
  resumeId: ObjectId → Resume
}
```

### Skill Model

```typescript
{
  _id: ObjectId
  name: String (required)
  rating: Number (1-5)
  resumeId: ObjectId → Resume
}
```

### Achievement Model

```typescript
{
  _id: ObjectId
  title: String (required)
  description: String (required)
  date: String
  resumeId: ObjectId → Resume
}
```

### Certification Model

```typescript
{
  _id: ObjectId
  title: String (required)
  issuer: String (required)
  issueDate: Date
  expiryDate: Date (optional)
  credentialUrl: String (optional)
  resumeId: ObjectId → Resume
}
```

### Custom Section Model

```typescript
{
  _id: ObjectId
  title: String (required)
  content: String (HTML content)
  resumeId: ObjectId → Resume
}
```

---

## 🎯 Key Features Guide

### 1. Resume Dashboard

**Location**: `app/(root)/dashboard/page.tsx`

The dashboard displays all user resumes with quick actions:
- View resume count
- Create new resume
- Edit existing resumes
- Delete resumes
- Resume metadata (title, last updated)

### 2. Resume Editor

**Location**: `components/layout/my-resume/ResumeEditor.tsx`

The main editor with split-panel layout:
- **Left Panel**: Form sections with tabs
- **Right Panel**: Live preview of resume
- **Synchronized Updates**: Changes reflect immediately in preview
- **Theme Customization**: Color picker for theme selection
- **Template Switching**: Change between templates without losing data

### 3. Form Management

**Location**: `lib/context/FormProvider.tsx`

Global form state management using React Context:
- Maintains resume data throughout editing session
- `formData` state for current resume data
- `handleInputChange()` for normalized input handling
- Automatic state updates across all components

Usage in components:
```typescript
const { formData, handleInputChange } = useFormContext();
```

### 4. AI Content Generation

**Location**: `lib/actions/gemini.actions.ts`

Generate professional content using Google Gemini:

#### Generate Professional Summary
```typescript
await generateSummary(resumeId, formData)
```
- Takes job title, experience level, skills
- Returns 3 summary options for different seniority levels
- Returns JSON with `experience_level` and `summary` fields

#### Generate Experience Description
```typescript
await generateEducationDescription(jobTitle, experience)
```
- Takes job title and years of experience
- Returns 3 professional descriptions
- Customized for Senior, Mid-Level, and Fresher positions

### 5. Live Preview System

**Location**: `components/layout/my-resume/ResumePreview.tsx`

Real-time resume rendering with:
- Dynamic template selection
- Section ordering based on `sectionOrder` array
- Theme color application
- All sections rendered via dedicated preview components
- Responsive layout

### 6. Drag-and-Drop Section Ordering

**Location**: `components/layout/my-resume/SectionOrderBoard.tsx`

Reorder resume sections with drag-and-drop:
- Uses `@hello-pangea/dnd` library
- Updates `sectionOrder` in database
- Changes reflect immediately in live preview
- Persists order across sessions

### 7. Rich Text Editor

**Location**: `components/common/RichTextEditor.tsx`

Full-featured text editor for custom sections:
- Bold, italic, underline formatting
- Lists (ordered and unordered)
- Links and embedded media
- Heading levels
- Undo/redo functionality
- Clean HTML output

### 8. Template System

**Location**: `components/layout/my-resume/templates/`

Three professional templates:

#### Classic Template
- Traditional, ATS-friendly layout
- Simple column structure
- Focus on readability
- Perfect for corporate roles

#### Modern Template
- Contemporary design
- Colored sidebar
- Spacious layout
- Great for creative roles

#### Minimal Template
- Clean, minimalist design
- Elegant typography
- High emphasis on content
- Ideal for minimalist aesthetic

All templates:
- Support all resume sections
- Apply theme colors dynamically
- Respect section ordering
- Render data consistently

---

## 📡 API & Server Actions

All API calls are implemented as Server Actions in `lib/actions/`.

### Resume Operations

**File**: `lib/actions/resume.actions.ts`

#### Create Resume
```typescript
await createResume(userId, title)
```
- Creates new resume for user
- Returns resume data with ID
- Initializes with default settings

#### Fetch Resume
```typescript
await fetchResume(resumeId)
```
- Fetches resume with all populated references
- Populates all sub-documents (experience, education, etc.)
- Returns complete resume object

#### Update Resume
```typescript
await updateResume(resumeId, data)
```
- Updates personal details and settings
- Updates theme color and template
- Updates section order

#### Delete Resume
```typescript
await deleteResume(resumeId)
```
- Deletes resume and all associated data
- Removes from user's resume list

#### Get User Resumes
```typescript
await getUserResumes(userId)
```
- Fetches all resumes for authenticated user
- Returns array of resume summaries

### Experience Management

```typescript
await addExperienceToResume(params)
await updateExperienceToResume(params)
await deleteExperienceFromResume(resumeId, experienceId)
```

### Education Management

```typescript
await addEducationToResume(params)
await updateEducationToResume(params)
await deleteEducationFromResume(resumeId, educationId)
```

### Skills Management

```typescript
await addSkillToResume(params)
await updateSkillToResume(params)
await deleteSkillFromResume(resumeId, skillId)
```

### Achievements Management

```typescript
await addAchievementToResume(params)
await updateAchievementToResume(params)
await deleteAchievementFromResume(resumeId, achievementId)
```

### Certifications Management

```typescript
await addCertificationToResume(params)
await updateCertificationToResume(params)
await deleteCertificationFromResume(resumeId, certificationId)
```

### Custom Sections Management

```typescript
await addCustomSectionToResume(params)
await updateCustomSectionToResume(params)
await deleteCustomSectionFromResume(resumeId, customSectionId)
```

### Response Format

All server actions follow consistent response format:

```typescript
{
  success: boolean
  data?: any              // Returned data if successful
  error?: string          // Error message if failed
}
```

---

## 🎨 Customization

### Adding a New Resume Section

Follow these steps to add a new section (e.g., "Languages"):

#### Step 1: Create Mongoose Model

Create `lib/models/language.model.ts`:

```typescript
import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  language: { type: String, required: true },
  proficiency: { type: String, required: true }, // Native, Fluent, Intermediate, Beginner
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
});

const Language = mongoose.models.Language || mongoose.model("Language", languageSchema);
export default Language;
```

#### Step 2: Update Resume Model

Add reference in `lib/models/resume.model.ts`:

```typescript
languages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Language" }]
```

#### Step 3: Create Server Actions

Add to `lib/actions/resume.actions.ts`:

```typescript
export async function addLanguageToResume(params) {
  // Similar pattern to addSkillToResume
}
```

#### Step 4: Create Form Component

Create `components/layout/my-resume/forms/LanguageForm.tsx`:

```typescript
export default function LanguageForm() {
  const { formData, handleInputChange } = useFormContext();
  // Form UI implementation
}
```

#### Step 5: Create Preview Component

Create `components/layout/my-resume/previews/LanguagePreview.tsx`:

```typescript
export default function LanguagePreview() {
  const { formData } = useFormContext();
  // Preview UI implementation
}
```

#### Step 6: Update ResumeEditForm

Add tab in `ResumeEditForm.tsx`:

```typescript
<TabsContent value="languages">
  <LanguageForm />
</TabsContent>
```

#### Step 7: Update Templates

Add rendering logic in all three templates:

```typescript
case "languages":
  return <LanguagePreview />;
```

### Adding a New Theme Color

Edit `lib/utils.ts` and add color to `themeColors` array:

```typescript
export const themeColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  // Add new color here
  "#YOUR_COLOR",
];
```

### Modifying Templates

Edit template files in `components/layout/my-resume/templates/`:

- Update layout styling with Tailwind CSS
- Modify section rendering logic
- Add new conditional renders for sections
- Ensure responsive design

---

## 🚀 Build & Deployment

### Development

```bash
npm run dev
```

Starts development server at `http://localhost:3000` with hot reload.

### Production Build

```bash
npm run build
npm start
```

Builds optimized production bundle and starts server.

### Linting

```bash
npm run lint
```

Runs Next.js linting to check for errors.

### Docker Deployment

#### Build Image

```bash
docker build -t apnaresume:latest .
```

#### Run Container

```bash
docker run -p 3000:3000 \
  -e NEXT_MONGODB_URL=your_mongodb_url \
  -e GEMINI_API_KEY=your_gemini_key \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key \
  apnaresume:latest
```

#### Docker Compose

```bash
docker-compose up -d
```

Starts services defined in `docker-compose.yml`.

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
1. Verify `NEXT_MONGODB_URL` in `.env.local`
2. Check MongoDB cluster is running and accessible
3. Ensure IP whitelist includes your machine
4. Test connection string with MongoDB Compass

### Clerk Authentication Errors

**Problem**: `Unauthorized` errors on protected routes

**Solution**:
1. Verify Clerk keys in `.env.local`
2. Check `middleware.ts` route matchers
3. Clear browser cookies and sign in again
4. Ensure user is authenticated in Clerk Dashboard

### AI Generation Failures

**Problem**: `GEMINI_API_KEY not found` or API errors

**Solution**:
1. Verify `GEMINI_API_KEY` in `.env.local`
2. Check Google Cloud project has Generative AI API enabled
3. Verify API quota hasn't been exceeded
4. Check request format matches API specifications

### Form State Not Updating

**Problem**: Changes don't appear in live preview

**Solution**:
1. Verify `FormProvider` wraps the page
2. Check `useFormContext()` is called correctly
3. Ensure `handleInputChange()` is properly bound
4. Check browser console for React errors

### Resume Not Saving

**Problem**: Changes lost after page reload

**Solution**:
1. Check network requests in DevTools
2. Verify server action functions have `"use server"`
3. Ensure `connectToDB()` is called in actions
4. Check MongoDB connection and user permissions

### Template Not Rendering

**Problem**: Empty or broken template display

**Solution**:
1. Verify template component exists in `templates/` folder
2. Check data is properly populated via `useFormContext()`
3. Verify section order includes template name
4. Check theme color is valid

---

## ✅ Best Practices

### Code Style

1. **Use TypeScript** - All new code must be typed
2. **Path Aliases** - Use `@/` for imports from root
3. **Component Organization** - Group related components in folders
4. **Naming Conventions** - Use PascalCase for components, camelCase for functions

### Database Operations

1. **Always Call connectToDB()** - Essential for all database operations
2. **Use Mongoose Populate** - Load references when fetching data
3. **Validate Input** - Use Zod schemas before database writes
4. **Handle Errors Gracefully** - Return error messages to user

### Performance

1. **Server Actions for Data Fetching** - Keep sensitive logic server-side
2. **Lazy Load Components** - Use React.lazy for heavy components
3. **Image Optimization** - Use Next.js Image component
4. **Memoize Functions** - Use useCallback for expensive operations

### Security

1. **Clerk Authentication Required** - Protect all sensitive routes
2. **Validate User Ownership** - Verify user can access requested data
3. **Sanitize User Input** - Sanitize HTML in custom sections
4. **Environment Variables** - Never commit secrets to repository

### Testing

1. **Test Server Actions** - Verify API returns correct responses
2. **Test Form Validation** - Ensure Zod schemas catch errors
3. **Test Authentication** - Verify protected routes deny unauthorized access
4. **Test AI Integration** - Mock Gemini API responses in tests

---

## 📞 Support & Contributing

For issues, suggestions, or contributions:

1. Check existing [issues](https://github.com/yourusername/apnaresume/issues)
2. Create detailed bug reports with reproduction steps
3. Submit feature requests with use cases
4. Follow code style guidelines when contributing

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Next.js 14 documentation and community
- Clerk for authentication infrastructure
- Google Generative AI for AI capabilities
- Radix UI for accessible component patterns
- MongoDB for reliable data storage

---

**Last Updated**: January 2026
