# Lenis Smooth Scroll Setup - Complete Guide

## ✅ What's Installed

Your portfolio now has smooth scrolling implemented using **Lenis** (a modern, performant smooth scroll library) with optional **GSAP ScrollTrigger** integration for advanced scroll animations.

---

## 📁 File Structure

```
project-root/
├── providers/
│   ├── LenisProvider.tsx          # Main Lenis initialization
│   └── setupScrollTrigger.tsx     # Optional GSAP ScrollTrigger setup
├── custom-hooks/
│   └── useLenis.tsx               # Hook for scroll interactions
├── components/
│   └── providers.tsx              # Wrapped providers (Theme + Lenis)
└── app/
    └── layout.tsx                 # Already has ThemeProvider (includes Lenis)
```

---

## 🚀 How It Works

### 1. **LenisProvider** (`providers/LenisProvider.tsx`)
- Initializes Lenis on app load
- Runs animation loop with `requestAnimationFrame`
- Handles cleanup on unmount
- No manual configuration needed - it "just works"

**Config Options:**
```js
{
  duration: 1.2,              // Scroll smoothness (1-2 recommended)
  easing: (t) => {...},       // Custom easing function
  smoothWheel: true,          // Smooth mouse wheel scrolling
  smoothTouchpad: true,       // Smooth touchpad scrolling
  touchMultiplier: 2,         // Touch scroll multiplier
}
```

### 2. **Global Integration** (`components/providers.tsx`)
- Lenis is wrapped AROUND ThemeProvider
- This ensures Lenis is initialized before anything else
- Both providers work together seamlessly

### 3. **useLenis Hook** (`custom-hooks/useLenis.tsx`)
- Simple hook for scroll interactions in components
- Use for scroll-to functionality

---

## 💻 Usage Examples

### Example 1: Scroll to Element
```tsx
import { useLenis } from "@/custom-hooks/useLenis";

export function MyComponent() {
  const { scroll } = useLenis();
  
  const handleScroll = () => {
    const element = document.getElementById("footer");
    scroll(element); // Smooth scroll to element
  };
  
  return <button onClick={handleScroll}>Scroll to Footer</button>;
}
```

### Example 2: Scroll to Position
```tsx
import { useLenis } from "@/custom-hooks/useLenis";

export function MyComponent() {
  const { scroll } = useLenis();
  
  return <button onClick={() => scroll(800)}>Scroll 800px Down</button>;
}
```

### Example 3: GSAP ScrollTrigger Animation (Optional)
If you want scroll-triggered animations:

```tsx
"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimatedElement() {
  useEffect(() => {
    gsap.to(".fade-in-element", {
      scrollTrigger: {
        trigger: ".fade-in-element",
        start: "top center",
        end: "bottom center",
      },
      duration: 1,
      opacity: 1,
      y: 0,
    });
  }, []);
  
  return <div className="fade-in-element opacity-0 translate-y-10">Content</div>;
}
```

---

## 🎨 Customization

### 1. Adjust Scroll Speed
Edit `providers/LenisProvider.tsx`:
```tsx
const lenis = new Lenis({
  duration: 1.5, // Increase for slower, smoother scroll (0.8-2 range)
  // ...
});
```

### 2. Customize Easing Function
```tsx
// Linear easing (very smooth)
easing: (t) => t,

// Ease-out (faster start, slow end)
easing: (t) => 1 - Math.pow(1 - t, 3),

// Custom cubic bezier effect
easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
```

### 3. Only Enable Wheel Scrolling (Desktop)
```tsx
const lenis = new Lenis({
  smoothWheel: true,      // Desktop wheel
  smoothTouchpad: false,  // Disable touchpad
});
```

---

## 🔧 Troubleshooting

### Issue: Scrolling feels laggy
- ❌ Don't use: `duration: 0.5` (too fast)
- ✅ Use: `duration: 1.2-1.5` (optimal range)

### Issue: Scroll jitter on mobile
- Check if `touchMultiplier: 2` needs adjustment
- Try reducing to `touchMultiplier: 1.5`

### Issue: Conflicts with other scroll libraries
- Ensure no other smooth scroll library is installed
- Lenis should be the only one handling scroll

### Issue: CSS `scroll-behavior: smooth` conflicts
- Remove `scroll-behavior: smooth;` from `globals.css`
- Lenis handles all scrolling now

---

## 📊 Performance Notes

✅ **Optimized for:**
- 60 FPS smooth scrolling
- Low CPU usage (RAF-based animation loop)
- Mobile-friendly (tested on iOS/Android)
- Responsive design (works on all screen sizes)

⚠️ **Not recommended with:**
- Other smooth scroll libraries (Smooth Scroll, Locomotive Scroll)
- Heavy JavaScript on page (may cause jank)

---

## 🆘 Need Help?

If scrolling doesn't work:

1. **Check console for errors:**
   ```js
   // In browser console
   console.log(window.Lenis) // Should exist
   ```

2. **Verify providers are loaded:**
   - Check that `layout.tsx` includes `<ThemeProvider>`
   - Ensure it's a `"use client"` component

3. **Clear cache and rebuild:**
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## 📚 Resources

- [Lenis Docs](https://lenis.studiofreight.com/)
- [GSAP Docs](https://gsap.com/)
- [ScrollTrigger Guide](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

---

**You're all set! Your portfolio now has modern, smooth scrolling like piyush.sparkstudio.co.in 🎉**
