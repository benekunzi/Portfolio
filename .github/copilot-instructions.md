# Portfolio Copilot Instructions

## Project Overview
Next.js 16 portfolio showcasing projects and professional experience with advanced scroll-driven animations. Built with React 19, TypeScript, Framer Motion, and Tailwind CSS 4. Emphasizes **smooth physics-based animations** and **Apple-inspired UI/UX**.

## Architecture & Key Patterns

### Animation Architecture
This portfolio is **animation-first**. All interactions use Framer Motion with specific patterns:

1. **Scroll-driven animations** (`useScroll`, `useTransform`):
   - `src/app/about/page.tsx` demonstrates the canonical pattern: 200vh container with sticky viewport
   - Progress mapped to multiple transforms: `scrollYProgress` → `useTransform` → opacity/x/y/scale
   - Example: IntroSection splits "About me" text while image scales and moves (lines 43-153)

2. **Layout animations** (`layoutId`):
   - Shared element transitions between project list and detail view
   - `layoutId={`video-${id}`}` in `project-item.tsx` and `project-detail.tsx` creates seamless video expansion
   - `layoutId="about-link"` connects home nav link to About page title (subtle continuity)

3. **Spring physics** for micro-interactions:
   - `useSpring` with `{ damping: 25, stiffness: 600 }` for responsive feel (see `project-item.tsx` line 24)
   - Video parallax on hover uses spring-smoothed mouse tracking

4. **State-driven animations**:
   - Focus mode dims/blurs background while project detail is active (`page.tsx` line 32)
   - AnimatePresence for email hover reveal with vertical slide (`page.tsx` lines 61-90)

### Data & Content Strategy
- **Centralized content**: All project/job data in `src/lib/data.ts` with TypeScript interfaces
- Projects define `aspectRatio: "portrait" | "landscape"` which determines video container width
- Real-time age calculation in About page updates every 100ms for smooth counter effect (lines 47-55)

### Component Patterns
- **Client components everywhere**: All components use `'use client'` due to animation/interactivity requirements
- **Ref-based hover systems**: `CursorImages` component tracks mouse position within ref boundaries to show contextual images (see `cursor-images.tsx`)
- **Responsive transforms**: Mobile uses smaller scales/different positioning via Tailwind breakpoints (`md:`)

### Apple-Inspired Design System

**Typography Philosophy**: Simple, readable, system-native
- **Font stack**: `system-ui, -apple-system, BlinkMacSystemFont` (see `globals.css`)
- **Font smoothing**: `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` for crisp rendering
- **Explicit sizing**: Always use `font-[system-ui]` or rely on default system font
- **No custom fonts**: Embraces native OS typography for performance and familiarity

**Typography Scale & Usage**:
```tsx
// Hero/Display text
text-[4rem] md:text-[8rem] font-bold tracking-tighter  // "About me" split text
text-6xl md:text-8xl font-bold uppercase tracking-widest  // Section backgrounds

// Headlines
text-[48px] font-bold leading-tight tracking-tight  // Project detail titles
text-4xl md:text-5xl font-bold  // Section titles ("My Journey")
text-2xl md:text-3xl font-bold leading-tight  // Quote blocks

// Body text
text-[22px] font-bold leading-[1.4] tracking-tight  // Bio headline
text-[18px] leading-[1.6] font-[system-ui]  // Project descriptions
text-xl font-bold  // Info labels
text-lg font-medium  // Secondary info
text-[18px] leading-[22px]  // Navigation links (precise line height)

// Small text
text-sm font-bold uppercase tracking-wider  // Labels
text-xs font-bold  // Tooltips
```

**Color & Opacity System** (Apple's subtle hierarchy):
```tsx
// Text colors - never pure black, always softened
text-black          // Rare, only for highest emphasis
text-black/80       // Primary text (most body content)
text-black/70       // Navigation links, secondary actions
text-black/60       // Tertiary text, tech chips
text-black/50       // Metadata (age, location)
text-black/40       // Quotes, background text, labels
text-black/30       // Footer text
text-black/10       // Background typography (TECHSTACK)

// Accent color
text-[#EB3EA1]      // Brand pink for "Mobile" and "Python" highlights

// Backgrounds & borders
bg-white/50 backdrop-blur-[8px]   // Glassmorphism (project hover)
bg-white/40 backdrop-blur-md      // Tech stack icons
bg-white/90                       // Tooltips (more opaque)
border-black/5                    // Barely visible dividers
border-black/10                   // Subtle borders
border-white/20                   // Borders on semi-transparent elements
```

**Hover States** (Subtle, Apple-like feedback):
```tsx
hover:opacity-100        // Links start at 70% opacity, brighten to 100%
hover:opacity-50         // Navigation brand, dims on hover
hover:scale-110          // Tech icons (subtle growth)
hover:scale-105          // Job images (gentle zoom)
hover:bg-white/60        // Increase background opacity
group-hover:opacity-100  // Reveal tooltips from opacity-0
transition-opacity       // CSS transitions for hover
transition-transform duration-500  // Smooth transforms
transition-all          // Tech icons (opacity + transform)
```

**Border Radius System** (Rounded, friendly):
```tsx
rounded-[40px]   // Large elements (profile image, video previews)
rounded-[20px]   // Medium elements (project hover box)
rounded-2xl      // Tech stack icons (16px)
rounded-xl       // Cursor images, project detail video (12px)
rounded-full     // Pills (tech chips), circular images
```

**Shadows** (Soft, layered depth):
```tsx
shadow-2xl       // Deep shadows (profile image, video previews)
shadow-lg        // Medium shadows (cursor images, tech icons)
shadow-md        // Subtle shadows (job images, tooltips)
shadow-[0_10px_20px_2px_rgba(0,0,0,0.08)]  // Custom precise shadow (project hover)
```

**Background Animation**:
- 20-second infinite ease-in-out between warm (`#FFFCF5`) and cold (`#F0F6FF`) off-white
- Creates subtle, calming atmosphere shift
- Defined in `@keyframes bg-shift` in `globals.css`

**Spacing & Layout Rhythm**:
```tsx
// Vertical spacing (breathable layouts)
py-32, py-24      // Major section padding
space-y-24        // Large gaps between timeline items
space-y-12        // Medium gaps (quote blocks, tech sections)
mb-20, mt-30      // Specific large margins

// Horizontal spacing
px-6 md:px-24     // Page padding (mobile vs desktop)
gap-12            // Content columns
pl-6              // Quote border offset
```

**Interaction Principles**:
- **Precision**: Use exact pixel values for critical spacing (`text-[18px] leading-[22px]`)
- **Responsiveness**: Always provide mobile (`text-[4rem]`) and desktop (`md:text-[8rem]`) sizes
- **Subtlety**: Opacity changes more common than color changes
- **Physics**: Framer Motion spring animations, not linear transitions
- **Feedback**: Visual response to every interaction (hover, click)

**Anti-patterns to Avoid**:
- Never use pure `#000000` black or `#FFFFFF` white
- Don't use `transition: all` without specific property list (performance)
- Avoid sharp corners on interactive elements
- Don't use heavy shadows (keep rgba alpha < 0.1)
- Never use font weights other than `font-medium` or `font-bold`

### Path Aliases
- `@/` maps to `src/` (configured in `tsconfig.json`)
- Example: `import { PROJECTS } from '@/lib/data'`

## Development Workflow

### Commands
```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

### Adding New Projects
1. Add entry to `PROJECTS` array in `src/lib/data.ts` with required fields
2. Video should be hosted externally (CDN URLs used, not local files)
3. Specify `aspectRatio` to control video container dimensions in hover preview

### Creating New Scroll Sections (About page)
Follow the `SnapSection` pattern (lines 13-33 in `about/page.tsx`):
- Wrap content in ref-tracked section with `useInView` threshold 0.5
- Auto-scrolls to center when section becomes dominant view
- Use 200vh container for scroll-driven animations with sticky content

### Animation Performance
- Avoid animating `width`/`height` directly → use `scale` transform
- Use `will-change` sparingly (Framer Motion handles this)
- Lenis smooth scroll runs on RAF for 60fps consistency (see `smooth-scroll.tsx`)

## Critical Details

### Framer Motion LayoutId Behavior
When using `layoutId` for shared element transitions:
- Element must exist in both source/destination
- Wrap in `<AnimatePresence>` if conditionally rendered
- Avoid layout shift during transition by matching aspect ratios

### Tech Stack Icon Library
Uses `tech-stack-icons` package (line 6 in `about/page.tsx`):
```tsx
<StackIcon name="typescript" />
```
Available names match lowercase tech identifiers.

### Mobile Considerations
- Video previews disabled on mobile (too performance-intensive)
- Text size scales: `text-[4rem] md:text-[8rem]`
- Two-column layouts collapse to single column on small screens

## Common Pitfalls
- **Don't** use `router.push()` for About link — it's a hard navigation to reset scroll state
- **Don't** add scroll listeners — Lenis already intercepts all scrolling
- **Remember** `useTransform` hooks must be declared outside conditionals (React rules)
- **Avoid** relative imports outside `src/` directory due to path alias setup

## File Organization
```
src/
  app/           # Next.js routes (page.tsx, layout.tsx)
  components/    # Reusable UI (project-item, cursor-images, etc.)
  lib/           # Data & utilities (currently just data.ts)
public/          # Static assets (profile image, company logos)
```

When creating new components, default to `src/components/`. Use client components unless specifically implementing server-side features.
