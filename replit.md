# Airport Security Check-In Prototype

## Overview

This is a prototype airport security verification system that demonstrates automated document scanning and biometric verification. The application guides users through a multi-step check-in process including document upload (passport and boarding pass), selfie capture using device camera, and verification results display. Built as a demonstration of modern web technologies for streamlined security processing, the system simulates OCR document extraction and facial recognition matching without actual backend processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized builds
- Wouter for lightweight client-side routing (no server-side routing required)

**UI Component Strategy**
- Shadcn/ui component library built on Radix UI primitives
- Material Design principles for trustworthy, professional appearance
- Tailwind CSS for utility-first styling with custom design tokens
- Component architecture follows atomic design with examples provided for each major component
- Design system uses Inter font throughout with defined typography hierarchy
- Mobile-first responsive approach with breakpoints at 768px

**State Management Pattern**
- React Query (@tanstack/react-query) for server state management (future API integration)
- Local component state using React hooks for UI flow control
- Multi-step form flow managed through parent component state machine

**Key UI Flow Components**
1. WelcomeScreen - Entry point with automatic/manual mode selection
2. ProgressIndicator - Visual stepper showing current position in 4-step process
3. DocumentUpload - File upload with preview for passport and boarding pass
4. CameraCapture - MediaDevices API integration for front-facing camera selfie
5. ResultsScreen - Verification results display with mock OCR/face matching data

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Vite integration in development mode for seamless full-stack development
- Middleware setup for JSON parsing and request logging
- Prepared for RESTful API routes under `/api` prefix (currently minimal implementation)

**Data Layer Strategy**
- Drizzle ORM configured for PostgreSQL integration
- Schema defined in shared directory for type sharing between client/server
- Current implementation uses in-memory storage (MemStorage class)
- User schema demonstrates pattern for future entity modeling
- Database migrations configured in `./migrations` directory

**Session & Storage Pattern**
- Storage interface (IStorage) defines CRUD contract
- MemStorage provides in-memory implementation for prototype
- Designed for easy swap to database-backed storage without changing application logic

### External Dependencies

**UI Component Libraries**
- @radix-ui/* - Accessible, unstyled component primitives (accordion, dialog, dropdown, etc.)
- shadcn/ui - Pre-built component implementations using Radix UI
- lucide-react - Icon system for consistent visual language
- class-variance-authority - Type-safe variant styling for components
- tailwindcss - Utility-first CSS framework with custom configuration

**Database & ORM**
- drizzle-orm - TypeScript ORM for type-safe database queries
- drizzle-kit - CLI tools for migrations and schema management
- @neondatabase/serverless - Serverless PostgreSQL driver (configured but not actively used)
- drizzle-zod - Schema validation integration with Zod

**Form & Validation**
- react-hook-form - Performant form state management
- @hookform/resolvers - Validation resolver integrations
- zod - TypeScript-first schema validation

**Development Tools**
- @replit/vite-plugin-* - Replit-specific development enhancements (error overlay, cartographer, dev banner)
- tsx - TypeScript execution for Node.js
- esbuild - Fast JavaScript bundler for production builds

**Browser APIs Used**
- MediaDevices API (navigator.mediaDevices.getUserMedia) for camera access
- FileReader API for image preview generation
- Canvas API for photo capture from video stream

### Design System Decisions

**Color Theming**
- HSL-based color system with CSS custom properties for theme switching capability
- Neutral base color palette for professional security context
- High contrast ratios for accessibility in stressful airport environments
- Semantic color tokens (primary, secondary, destructive, etc.) for consistent application

**Layout & Spacing**
- Tailwind spacing scale (4px base unit) for consistent vertical rhythm
- Maximum content width of 4xl (896px) for optimal readability
- Generous padding and spacing for touch-friendly mobile interfaces
- Grid system switches from single column (mobile) to two-column layouts (desktop)

**Interaction Patterns**
- Progressive disclosure guides users step-by-step through verification
- Clear status indicators with prominent success/failure visual feedback
- Hover and active states with elevation changes for tactile feedback
- Focus visible states for keyboard navigation accessibility