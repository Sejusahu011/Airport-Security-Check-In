# Airport Security Check-In Prototype - Design Guidelines

## Design Approach

**Selected Approach:** Design System-Based (Material Design)
**Rationale:** This security verification application requires trust, clarity, and efficiency. Material Design's strong visual feedback, clear status indicators, and professional aesthetic align perfectly with airport security contexts where users need confidence and quick comprehension.

**Core Principles:**
- Trustworthy professionalism through clear hierarchy and generous spacing
- Instant status recognition with prominent success/failure indicators
- Progressive disclosure guiding users step-by-step through verification
- Accessible, high-contrast interface suitable for diverse users in potentially stressful situations

---

## Typography

**Font Stack:** Inter (Google Fonts) for entire application
- **Headers (H1):** 3xl (mobile) / 5xl (desktop), font-weight 700, tracking-tight
- **Section Headers (H2):** 2xl (mobile) / 3xl (desktop), font-weight 600
- **Step Labels:** xl, font-weight 600
- **Body Text:** base, font-weight 400, leading-relaxed
- **Status Messages:** lg, font-weight 500
- **Data Labels:** sm, font-weight 600, uppercase, tracking-wide
- **Data Values:** base, font-weight 400

---

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16 (e.g., p-4, mb-8, gap-6)

**Container Strategy:**
- Maximum width: max-w-4xl for main content
- Full-width sections with inner containers for visual balance
- Consistent padding: px-4 (mobile), px-8 (desktop)
- Vertical section spacing: py-12 (mobile), py-16 (desktop)

**Grid System:**
- Single column mobile-first approach
- Two-column layouts for upload sections: grid-cols-1 md:grid-cols-2
- Results dashboard: flexible grid for data display

---

## Component Library

### 1. Welcome Screen
- Centered layout with generous vertical spacing (min-h-screen flex centered)
- App title: H1 with subtle icon/logo above
- Two prominent CTA buttons stacked vertically with gap-4
- Descriptive subtitle text between title and buttons
- Footer with version/info text

### 2. Progress Indicator
- Fixed top bar showing 4-step progression
- Each step: numbered circle with label beneath
- Active step: larger scale, connected lines between steps
- Spacing: px-8, py-6, evenly distributed across width

### 3. Document Upload Cards
- Card containers with border and subtle shadow
- Upload area: min-h-48, dashed border, centered icon and text
- Preview: full-width image display with aspect-ratio handling
- File name display below preview
- Re-upload button beneath

### 4. Camera Interface
- Video preview: w-full, aspect-video, rounded corners
- Centered capture button below video (large, circular)
- Camera permissions messaging prominent
- Captured photo preview with retake option

### 5. Results Dashboard
- Header section: large status icon with verification message
- Data grid: 2-column layout on desktop, single on mobile
- Each data item: label + value pairs with divider lines
- KYC score: prominent circular progress indicator or large percentage display
- Status cards: icon, title, checkmark/X, subtle background treatment
- Action buttons at bottom: "Complete Check-In" or "Retry Verification"

### 6. Button System
- Primary: large (px-8, py-4), rounded-lg, font-weight 600
- Secondary: outlined variant with same sizing
- Icon buttons: circular, p-4
- Disabled states: reduced opacity
- Loading states: spinner with text

### 7. Status Indicators
- Success: checkmark icon, green indicator
- Error: X icon, red indicator  
- Warning: alert icon, yellow indicator
- Pending: spinner icon, blue indicator
- Size: consistent across all states (w-6 h-6 for icons)

### 8. Form Elements
- Input fields: full-width, py-3, px-4, rounded-md border
- Labels: mb-2, font-weight 500
- Error messages: text-sm, spacing mt-1
- Upload buttons: py-3, px-6, border-2 dashed

---

## Images

**Hero Section:** No traditional hero image for this application

**Icons:**
- **Library:** Heroicons via CDN (outline and solid variants)
- **Usage locations:**
  - Progress steps: numbered circles
  - Upload areas: cloud-upload icon
  - Camera: camera icon
  - Status indicators: check-circle, x-circle, exclamation-triangle
  - Data fields: passport, ticket, user icons
  - Buttons: arrow-right for CTAs

**Document Previews:**
- Passport image: displayed at uploaded resolution, max-h-64
- Boarding pass: similar treatment
- Selfie: circular crop for profile display, square for full preview

**Placeholder Content:**
- Use generic passport/boarding pass icons during empty states
- Camera viewfinder grid overlay on video element

---

## Animation

**Minimal, purposeful motion only:**
- Step transitions: 300ms ease slide
- Card appearances: subtle fade-in on mount
- Status change: scale pulse once on verification complete
- Camera capture: brief flash overlay
- No scroll animations, parallax, or decorative motion