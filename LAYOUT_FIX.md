# Layout Fix - Sidebar Not Blocking Content

## Problem
The sidebar was getting in the way of content and pushing it down on initial page load on some pages.

## Root Cause
1. **Old Float-based Grid**: The Susy grid system uses floats which can cause content to wrap unexpectedly
2. **Margin Issues**: Sidebar had `margin-top: 2em` on desktop which pushed content down
3. **No Flex Container**: Content wasn't properly aligned side-by-side

## Solution

### 1. Switched to Flexbox Layout
Changed `#main` container to use flexbox on desktop:
```scss
@include breakpoint($large) {
  display: flex;
  gap: 3em;
  align-items: flex-start;
}
```

### 2. Fixed Sidebar Positioning
- Removed `margin-top` on desktop (only needed on mobile)
- Set sticky position relative to navigation: `top: 5.5em` (was `top: 2em`)
- Added `align-self: start` to prevent stretching
- Width: `calc((2.5 / 12) * 100%)` with max-width on XL screens

### 3. Fixed Content Area
- Removed margins on desktop: `margin-top: 0`
- Removed padding on large screens
- Set `flex: 1` to fill available space
- Max-width: 900px for optimal reading

### 4. Added Flexbox Overrides
Created specific overrides to work with Susy grid:
```scss
#main > .sidebar {
  flex-shrink: 0;
  float: none;
  width: calc((2.5 / 12) * 100%);
}

#main > .page {
  flex: 1;
  float: none;
  width: auto;
  max-width: 900px;
}
```

### 5. Fixed Archive Pages
Updated `.archive` to work with flexbox:
```scss
@include breakpoint($large) {
  flex: 1;
  float: none;
  width: auto;
  max-width: 900px;
}
```

## Results

### Before
- ❌ Sidebar pushed content down 2em
- ❌ Content wrapped awkwardly on some pages
- ❌ Inconsistent spacing
- ❌ Layout shifts on load

### After
- ✅ Sidebar and content aligned at top
- ✅ Proper side-by-side layout
- ✅ Consistent spacing
- ✅ No layout shifts
- ✅ Responsive gap between elements

## Layout Specifications

### Desktop (≥925px)
- Container: Flexbox with `gap: 3em`
- Sidebar: 2.5 columns (~20.8%)
- Content: Flex 1, max 900px
- Top padding: 3em

### XL Screens (≥1280px)
- Gap: 4em
- Sidebar: 2.75 columns, max 300px
- Content: Same (900px max)

### Mobile (<925px)
- Stack vertically (no flexbox)
- Sidebar: Full width
- Content: Full width

## Files Modified
1. `_sass/_page.scss` - Flexbox container + overrides
2. `_sass/_sidebar.scss` - Positioning fixes
3. `_sass/_archive.scss` - Archive layout fixes

## Testing Checklist
- [x] Homepage loads properly
- [x] Publications page works
- [x] Individual post pages work
- [x] Archive pages work
- [x] No content push-down
- [x] Sidebar stays in place
- [x] Responsive on all breakpoints

---

**Status**: ✅ Fixed
**Date**: November 17, 2025
