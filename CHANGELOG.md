# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Netlify continuous deployment configuration (`netlify.toml`) with build specifications, SPA rewrite redirects, and HTTP security headers.
- Netlify deployment guide and setup badge in `README.md`.

### Changed
- Standardized project package name and branding to **Castform Weather** (`castform-weather`).

### Security
- Removed hardcoded fallback OpenWeather API key from `weatherApi.js` to strictly enforce environment variables (`VITE_OPENWEATHER_API_KEY`).

## [1.0.0] - 2026-09-21

### Added
- Comprehensive and professional `README.md` with features overview, Castform companion mechanics, tech stack, architecture layout, and setup guides.
- Project governance and guidelines (`AGENTS.md`, `GEMINI.md`).
- Branching workflow and conventional commit standards.
- Centralized `weatherApi` service with secure API key access via `.env.local` and `.env.example` template.
- Debounced city autocomplete search (350ms) to protect free-tier API rate limits.
- Network and geolocation error feedback in `App` component.
- Complete redesign to **iOS 27 Glasses / visionOS** design system:
  - Atmospheric dynamic backgrounds with floating ambient light orbs reacting to weather conditions.
  - Frosted glass cards (`backdrop-filter: blur(32px) saturate(190%)`) with specular highlight edges and squircle borders.
  - Integrated **Hero Glass Card** with city, live date, feels-like indicator, and low/high arrow indicators (`↓` cyan / `↑` amber).
  - Balanced 2-column desktop dashboard layout with equalized column heights and responsive centered search capsule.
  - Native Apple Weather 7-day (1-week) forecast with continuous proportional temperature gradient bars and live indicator dot.
  - Hourly forecast rail with segmented toggle for 24-hour interactive luminous curve chart.
  - Frosted visionOS interactive chart tooltip with blur backdrop, clear typography, and formatted weather descriptions.
  - Fixed weekday labeling in forecast to show standard weekday abbreviations instead of informal names.
- Brand identity and dynamic mascot integration featuring **Castform (#351 - The Weather Pokémon)**:
  - Dynamic weather-driven transformations across 4 forms: **Sunny Form** (Fire 🔥), **Rainy Form** (Water 💧), **Snowy Form** (Ice ❄️), and **Normal Form** (Normal ☁️).
  - Smooth floating levitation keyframe animations with form-specific elemental aura halos.
  - Interactive dialogue speech bubble on click featuring Pokédex data, signature ability (*Forecast*), weather quotes, and comfort tips.
  - Dedicated Castform welcome badge on the initial landing view.
  - App rebranded to **Castform Weather** with high-contrast, scalable vector SVG favicon (`castform-favicon.svg`) and full metadata.
- **VisionOS Glassmorphic Pokédex Modal (#351)**:
  - Interactive **Carousel / Slider** showcase with chevron navigation buttons, touch swipe gestures, and keyboard arrow controls.
  - Form navigation slider dots with live weather synchronization (`LIVE` tag).
  - Official stats (Height: 0.3 m, Weight: 0.8 kg, Hoenn Weather Institute origin).
  - Dynamic **Weather Ball (Palla Clima)** move card showing real-time elemental alignment and doubled attack power (50 -> 100 ⚡) under live weather.
  - Accessible dialog controls with keyboard `Escape` dismiss and frosted backdrop.
- **Ambient Canvas Weather Particle Engine**:
  - High-performance HTML5 `<canvas>` rendering system running behind glass cards.
  - Dynamic particle behaviors customized per active weather condition: slanted raindrops with wind influence, drifting snow crystals, warm solar embers, misty cloud wisps, and twinkling night stars.
  - Full accessibility integration respecting `prefers-reduced-motion`.
- **Hero Card Improvements**:
  - Castform speech dialogue bubble kept expanded by default with immediate weather commentary and comfort tips.
  - Dedicated `[ 📖 Pokédex #351 ]` frosted glass pill trigger in the Hero footer.

### Fixed
- Fixed city name resolution: prevented OpenWeather weather station micro-localities (e.g. "Trevi" for Rome, "Horinouchi" for Tokyo) from overriding real city names across search suggestions, quick cities, and geolocation reverse-geocoding.
- Fixed hourly temperature trend chart header: flex-aligned title and constrained range badge (`.chart_range_badge`) to a compact inline pill on the right, eliminating full-width stretching and arrow edge clipping.
- Replaced dark opaque modal backdrop with translucent frosted glass (`backdrop-filter: blur(28px) saturate(180%)`), allowing the live weather app underneath to stay clearly visible and blurred.
- Fixed desktop Pokédex layout collision: moved 4-form switcher full-width above the two columns, preventing button text overflow and overlap with info cards.
- Eliminated browser default focus outlines, rings, and tap highlights when clicking buttons, cards, tabs, and interactive elements.
- Hidden scrollbars completely from the Pokédex modal card (`scrollbar-width: none`, Webkit scrollbar hidden) while keeping smooth native scrolling.
- Fixed Pokédex modal layout squishing: introduced balanced 2-column desktop grid with anti-squash showcase stage (`min-height: 220px`, `overflow: visible`) preventing artwork clipping.
- Chronological time order, dynamic temperature scaling, and gradient presentation in forecast chart.
- Prevented multiline text wrapping on day card temperatures and refined expand chevron indicator.
- Harmonized chart card styling with the application's light glassmorphic design system.

### Changed
- Reorganized codebase into a clean, modern layered architecture:
  - Centralized all styling under `src/styles/` (`index.sass`, `App.sass`, and domain partials).
  - Categorized UI components by functional domain (`src/components/layout/`, `src/components/weather/`, `src/components/castform/`).
  - Standardized helpers into `src/utils/` (`castformUtils.js`, `dateUtils.js`).
  - Purged dead legacy files (`Next5days.jsx`, `_nextdays.sass`, `Weather.jsx`, `_weather.sass`, `getDate.jsx`), reducing bundle weight.
- Upgraded core tooling and dependencies: Vite 6, TypeScript 5.7, Recharts 3, React 18.3, Sass 1.85.
- Resolved all 42 security vulnerabilities (0 vulnerabilities found in `yarn audit`).
- Removed bloated dependencies `moment` and `clsx` in favor of native JavaScript APIs and template literals, reducing bundle size by ~77 kB.
- Moved `sass` to devDependencies and purged unused `useFetchData` dead code.
