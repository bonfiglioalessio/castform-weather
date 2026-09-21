# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Fixed
- Chronological time order, dynamic temperature scaling, and gradient presentation in forecast chart.
- Prevented multiline text wrapping on day card temperatures and refined expand chevron indicator.
- Harmonized chart card styling with the application's light glassmorphic design system.

### Changed
- Upgraded core tooling and dependencies: Vite 6, TypeScript 5.7, Recharts 3, React 18.3, Sass 1.85.
- Resolved all 42 security vulnerabilities (0 vulnerabilities found in `yarn audit`).
- Removed bloated dependencies `moment` and `clsx` in favor of native JavaScript APIs and template literals, reducing bundle size by ~77 kB.
- Moved `sass` to devDependencies and purged unused `useFetchData` dead code.
