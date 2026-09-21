# Regole di Progetto e Linee Guida di Sviluppo

## 1. ⚙️ Stack Tecnologico & Architettura
- **Framework & Runtime**: **React** (v18+) con **Vite** e **TypeScript**.
- **Filosofia dell'Applicazione**:
  - *Weather Web App*: consultazione meteo in tempo reale, previsioni a 5 giorni, grafici orari/giornalieri e dettagli atmosferici (visibilità, umidità, vento).
  - *Ricerca & Geolocalizzazione*: supporto alla geolocalizzazione del browser (`navigator.geolocation`) e ricerca città tramite autocomplete/geocoding.
  - *API Meteo*: OpenWeatherMap API (Current Weather, 5-Day Forecast, Direct Geocoding). Tutte le chiavi API devono risiedere in variabili d'ambiente protette (`.env.local` con prefisso `VITE_`), mai hardcoded nel codice sorgente.
- **UI & Design System**:
  - Design premium, moderno, reattivo, con layout card, glassmorphism e palette colori armoniosa e dinamica.
  - Visualizzazione dati con grafici interattivi (**Recharts**).
  - Componenti modulari e tipizzati in TypeScript (`.tsx`).
- **Data & State Management**:
  - Gestione dello stato con React hooks (o lightweight store come Zustand se necessario).
  - Caching o debounce sulle chiamate API per evitare throttling e chiamate ridondanti.

---

## 2. 🤖 Regole di Collaborazione con l'AI
- **Prima il Plan, poi il codice**: stilare sempre prima la pianificazione dettagliata e la TODO list.
- **Zero codice senza approvazione**: non scrivere o modificare file senza l'esplicito ok dell'utente.
- **Zero commit/push senza approvazione**: non eseguire alcun `git commit` o `git push` senza l'esplicita autorizzazione dell'utente.
- **Approccio a piccoli passi (Step-by-Step)**: un task alla volta, verificabile e testabile.

---

## 3. 🌿 Git Flow, Commit & Release Standards
- **Branch Strategy**:
  - `main` (bloccato/protetto, solo per release e deploy di produzione).
  - `develop` (default branch di sviluppo e integrazione).
  - Feature branches dedicati (es. `feat/...`, `fix/...`, `chore/...`, `refactor/...`) creati a partire da `develop`.
- **Branch Lifecycle & Merge**: niente Pull Request. I feature branch vengono sviluppati, verificati e poi uniti con merge diretto in `develop`.
- **Conventional Commits**:
  - Messaggi strettamente in **inglese** (`feat: ...`, `chore: ...`, `style: ...`, `fix: ...`, `refactor: ...`).
  - **Singola riga** (nessun body/descrizione lunga).
  - **Nessun footer `Co-authored-by`**.
  - Commit atomici e granulari per singola modifica/funzionalità.
- **Automated / Maintained Changelog**: aggiornamento del `CHANGELOG.md` prima di ogni rilascio da `develop` verso `main`.
- **GitHub Release Template**: per ogni rilascio su GitHub, formattare le release notes con la seguente struttura (punti con nome componente/feature in grassetto e descrizione in italiano):
  ```markdown
  ## Release vX.Y.Z

  ### Features
  * **Nome Componente / Feature**: descrizione sintetica...

  ### Bug Fixes
  * **Nome Componente / Bug**: descrizione della correzione...
  ```

---

## 4. 🛠️ Code Quality & DevOps
- **Linter & Formatter**: ESLint + Prettier / TypeScript strict checks.
- **Testing & Esecuzione**:
  - Installazione dipendenze: `yarn install`
  - Sviluppo locale: `yarn dev`
  - Build & Typecheck: `yarn build` (`tsc && vite build`)
