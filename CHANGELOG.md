# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Project governance and guidelines (`AGENTS.md`, `GEMINI.md`).
- Branching workflow and conventional commit standards.

### Fixed
- Chronological time order, dynamic temperature scaling, and gradient presentation in forecast chart.
- Prevented multiline text wrapping on day card temperatures and refined expand chevron indicator.
- Harmonized chart card styling with the application's light glassmorphic design system.

### Changed
- Upgraded core tooling and dependencies: Vite 6, TypeScript 5.7, Recharts 3, React 18.3, Sass 1.85.
- Resolved all 42 security vulnerabilities (0 vulnerabilities found in `yarn audit`).
- Removed bloated dependencies `moment` and `clsx` in favor of native JavaScript APIs and template literals, reducing bundle size by ~77 kB.
- Moved `sass` to devDependencies and purged unused `useFetchData` dead code.
