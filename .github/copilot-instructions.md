# AI Coding Agent Instructions - ApnaResume Resume Builder

## Project Overview
**ApnaResume** is a Next.js 14 AI-powered resume builder that helps users create professional resumes with AI-generated content suggestions. The app uses Clerk for authentication, MongoDB with Mongoose for data persistence, and Google Gemini API for AI-powered content generation.

## Architecture & Data Flow

### Tech Stack
- **Frontend**: React 18, Next.js 14 (App Router), TypeScript, Tailwind CSS, Radix UI components
- **Backend**: Server Actions, Middleware (Clerk auth), Mongoose ODM
- **Database**: MongoDB (connection via `lib/mongoose.ts`)
- **Authentication**: Clerk (protected routes: `/dashboard`, `/my-resume/:resumeId/edit`)
- **AI**: Google Generative AI (Gemini 1.5 Flash) for content generation
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Custom Radix UI wrapper components in `components/ui/`

### Data Model & Relationships
- **Resume** (root entity): Contains user's resume metadata and references to education, experience, and skills
- **Experience, Education, Skill** (sub-documents): Referenced via MongoDB ObjectId in Resume
- Resume schema includes: `firstName`, `lastName`, `jobTitle`, `address`, `phone`, `email`, `summary`, `socialLinks` (nested object with URLs for LinkedIn, Twitter, Portfolio, LeetCode, Codeforces, GitHub, Instagram), `themeColor`, and `template` (string: "classic", "modern", or "minimal")
- All data operations use Mongoose with populated references (see `lib/actions/resume.actions.ts`)

### Key File Structure
```
lib/
  actions/
    resume.actions.ts      # Server actions: CRUD for resumes/experiences/etc
    gemini.actions.ts      # AI content generation prompts
    user.actions.ts        # User-related operations
  models/                  # Mongoose schemas
  validations/
    resume.ts              # Zod schemas (currently minimal)
  context/
    FormProvider.tsx       # Global form state for resume editing
components/
  layout/my-resume/
    ResumeEditor.tsx       # Split-panel: form + live preview
    ResumeEditForm.tsx     # Tabs for different resume sections
    ResumePreview.tsx      # Live preview component
    forms/                 # Individual section forms (PersonalDetailsForm, etc)
    previews/              # Corresponding preview components
    templates/             # Resume template components (ClassicTemplate, ModernTemplate, MinimalTemplate)
```

## Critical Workflows

### Adding a New Resume Section (e.g., Certification)
1. Create Mongoose model in `lib/models/certification.model.ts`
2. Add reference to Resume model: `certifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certification" }]`
3. Add server action in `lib/actions/resume.actions.ts` (create/update/delete pattern)
4. Create form component in `components/layout/my-resume/forms/CertificationForm.tsx`
5. Create preview component in `components/layout/my-resume/previews/CertificationPreview.tsx`
6. Add tab in `ResumeEditForm.tsx` and preview in `ResumePreview.tsx`

### Adding a New Resume Template
1. Create template component in `components/layout/my-resume/templates/NewTemplate.tsx`
2. Export from `components/layout/my-resume/templates/index.ts`
3. Add template info to `lib/templates.ts` (id, name, description)
4. Add case to `ResumePreview.tsx` switch statement
- Template components are self-contained and receive data via `useFormContext()`
- Each template must handle all resume sections (personal, summary, experience, education, skills, socialLinks)

### Server Actions Pattern
- All server actions must have `"use server"` directive at the top
- Always call `connectToDB()` before database operations
- Return consistent response format: `{ success: boolean, data?: any, error?: string }`
- Use `revalidatePath()` to invalidate Next.js cache after mutations
- Example: `lib/actions/resume.actions.ts:createResume()`

### Form State Management
- **FormProvider** context wraps resume edit pages and provides global `formData` state
- Components access state via `useFormContext()` hook
- `handleInputChange()` normalizes input events to update state by field name
- Loaded resume data is parsed from JSON and set in context on mount

### AI Content Generation
- Use `lib/actions/gemini.actions.ts:generateSummary()` and `generateEducationDescription()` as templates
- Always request JSON response (`responseMimeType: "application/json"`)
- Prompts should specify output structure (e.g., array of objects with `experience_level` and `summary` fields)
- Handle three experience levels: Senior, Mid Level, Fresher

## Developer Conventions

### TypeScript Path Alias
- Use `@/*` for imports from root (e.g., `@/components/ui/button`, `@/lib/actions/resume.actions.ts`)
- Configured in `tsconfig.json`

### Routing & Authentication
- Protected routes enforced via `middleware.ts` using Clerk's `createRouteMatcher()`
- Page structure: `app/(root)/dashboard/`, `app/(root)/my-resume/[id]/edit/`, etc.
- Auth layout group: `app/(auth)/` for sign-in/sign-up pages

### UI Component Library
- Use shadcn/Radix UI components from `components/ui/` (not third-party equivalents)
- Dialog, Dropdown, Alert, Toast all use Radix + custom styling
- Toast notifications via `useToast()` from `components/ui/use-toast.ts`

### Environment Variables
- `NEXT_MONGODB_URL`: MongoDB connection string
- `GEMINI_API_KEY`: Google Generative AI API key
- `NEXT_PUBLIC_CLERK_*`: Clerk public keys (set up in Clerk dashboard)

## Build & Deployment Commands
```bash
npm run dev      # Start Next.js dev server (port 3000)
npm run build    # Compile Next.js app
npm start        # Run production server
npm run lint     # Run Next.js linting
```

## Anti-Patterns to Avoid
- **Don't** use client-side state for resume data (use FormProvider + server actions)
- **Don't** call AI generation in render (use server actions only)
- **Don't** manually handle database connections (always use `connectToDB()`)
- **Don't** bypass Clerk auth checks on protected routes (middleware handles this)
- **Don't** create new UI components (reuse `components/ui/` Radix wrappers)

## Common Pitfalls & Debugging
- **MongoDB connection errors**: Ensure `NEXT_MONGODB_URL` is set; check `lib/mongoose.ts` connection state
- **AI response parsing fails**: Verify response `responseMimeType: "application/json"` is set; JSON structure matches prompt
- **Form state not persisting**: Confirm `useFormContext()` is called in correct component; check FormProvider wraps the page
- **Protected route access denied**: Verify `middleware.ts` route matcher includes the path
