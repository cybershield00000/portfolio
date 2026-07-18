---
name: ui-ux-pro-max
description: Pro-Max UI/UX Guidelines for building highly interactive, premium, "Liquid Glassmorphism" web applications.
---

# UI/UX Pro Max Skill

This skill provides the ultimate guidelines for creating premium, highly interactive web applications using Next.js, Tailwind CSS, and Framer Motion.

## Core Philosophy
1. **Clean White Premium Editorial**: The base aesthetic should be incredibly clean, mimicking high-end editorial magazines.
2. **Liquid Glassmorphism**: Overlays and cards should use subtle frosted glass effects, blending seamlessly with the background.
3. **Dynamic Backgrounds**: Use slow-moving, breathing mesh gradients (e.g., pure white with `#F4D8D8` and `#BEA8A7`).
4. **Typography**: Playfair Display (or similar Serif) for headings (English), Tajawal for Arabic. Highly readable, generous line height.
5. **Micro-interactions**: Everything should feel alive. Use magnetic cursors, scroll hijacking for smooth page transitions, and subtle hover effects on all interactive elements.

## Implementation Details

### Colors
- **Primary Text**: `#2A0800` (Deep burnt brown/black)
- **Secondary Text**: `#775144` (Mid-tone warm grey)
- **Mid-tone Accents**: `#C09891` (Dusty rose)
- **Glass Borders**: `rgba(190, 168, 167, 0.4)`
- **Highlights**: `#F4D8D8`

### Glassmorphism CSS
```css
.glass-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(190, 168, 167, 0.4);
  box-shadow: 0 8px 32px rgba(190, 168, 167, 0.1);
}
```

### Animations (Framer Motion)
- **Staggered Reveals**: Elements should stagger in on scroll.
- **Spring Physics**: Use spring animations (`type: 'spring', damping: 12`) for natural, physical movement.
- **Magnetic Elements**: Use a custom magnetic cursor that snaps to interactive elements using a `data-magnetic` attribute.

### Layout
- Full-screen sections (`min-h-screen`) snapping or transitioning smoothly.
- Asymmetrical grids and overlapping elements for a modern feel.
- High-quality, carefully masked images.

When this skill is invoked, ensure all UI components adhere strictly to these guidelines.
