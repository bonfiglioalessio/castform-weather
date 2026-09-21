# 🌤️ Weather App & Castform Companion

Una moderna web application per il meteo in tempo reale, ispirata all'interfaccia di Apple Weather, con design glassmorphic premium, grafici orari interattivi, previsioni a 7 giorni e una simpatica mascotte interattiva Pokémon: **Castform**!

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.85-CC6699?style=flat-square&logo=sass&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3.10-22B5BF?style=flat-square)
![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap-EB6E4B?style=flat-square&logo=openweathermap&logoColor=white)

---

## ✨ Funzionalità Principali

### 🌦️ Meteo in Tempo Reale & Dettagli Atmosferici
- **Condizioni attuali**: temperatura attuale, percepita, minima e massima del giorno.
- **Griglia dettagli**: umidità, velocità e direzione del vento, visibilità (km), pressione atmosferica, orari esatti di alba e tramonto.
- **Geolocalizzazione browser**: pulsante one-click per rilevare la posizione GPS attuale dell'utente tramite `navigator.geolocation`.
- **Ricerca città & Quick Cities**: autocomplete con geocoding diretto su OpenWeatherMap e pulsanti rapidi per le principali metropoli (Milano, Roma, Londra, Tokyo, New York, Parigi).

### 📈 Grafico Orario Interattivo (24h)
- Visualizzazione grafica oraria delle temperature e delle probabilità di pioggia realizzata con **Recharts**.
- Curve animate smussate (*monotone curve*), gradienti cromatici personalizzati e tooltip interattivo con valori precisi per ogni fascia oraria.

### 📅 Previsioni a 7 Giorni (Stile Apple Weather)
- Elenco dettagliato giorno per giorno con condizioni meteo e percentuali di precipitazione.
- **Barre grafiche di escursione termica**: indicatore visivo proporzionale min/max con gradiente dinamico per confrontare le variazioni di temperatura della settimana.

### 🔮 Mascotte Interattiva Castform & Pokédex Integrato
- **Adattamento meteorologico**: Castform cambia forma e tipo in tempo reale in base alle condizioni meteo della città selezionata:
  - ⛅ **Forma Normale** (Sereno / Nuvoloso)
  - ☀️ **Forma Sole** (Meteo limpido e soleggiato)
  - 🌧️ **Forma Pioggia** (Pioggia / Temporale)
  - ❄️ **Forma Neve** (Nevicate / Gelo)
- **Particelle meteo dinamiche**: effetti visivi ambientali in sovrimpressione (gocce di pioggia, fiocchi di neve fluttuanti, fasci di luce solare, pulviscolo di vento).
- **Scheda Pokédex**: cliccando sulla Pokéball o sulla mascotte, si apre un modal glassmorphic con statistiche, scheda descrittiva, citazioni contestuali ed effetti sonori sintetizzati tramite Web Audio API.

---

## 🎨 UI & Design System
- **Design Glassmorphic**: schede semitrasparenti con `backdrop-filter: blur`, bordi luminosi sfumati e ombreggiature morbide.
- **Palette colori adattiva**: gradiente di sfondo e tonalità che variano armoniosamente in base alle condizioni meteo (azzurro soleggiato, blu pioggia profondo, grigio ghiaccio).
- **Totalmente Responsive**: layout flessibile ottimizzato per schermi mobile, tablet e desktop widescreen.

---

## 🛠️ Stack Tecnologico

| Tecnologia | Scopo |
| :--- | :--- |
| **React 18** | Libreria per interfacce utente basata su componenti funzionali |
| **Vite** (con SWC) | Build tool e dev server ultra-veloce |
| **TypeScript** | Type checking statico e standard di qualità del codice |
| **Sass (SCSS)** | Preprocessore CSS per modularità stilistica, variabili e mixin |
| **Recharts** | Rendering di grafici SVG reattivi e personalizzabili |
| **OpenWeatherMap API** | Fornitura dati meteo in tempo reale, previsioni a 5 giorni / 3 ore e Geocoding |

---

## 📂 Architettura del Progetto

La codebase è strutturata per domini funzionali, mantenendo una netta separazione delle responsabilità:

```text
weather-app/
├── public/                 # Asset statici (immagini, sprite Pokémon, icone)
├── src/
│   ├── components/
│   │   ├── castform/       # Componenti mascotte e particelle
│   │   │   ├── CastformMascot.jsx
│   │   │   ├── PokedexModal.jsx
│   │   │   └── WeatherParticles.jsx
│   │   ├── layout/         # Componenti strutturali
│   │   │   └── Navbar.jsx
│   │   └── weather/        # Componenti visualizzazione meteo
│   │       ├── Card.jsx
│   │       ├── Chart.jsx
│   │       ├── DailyForecast.jsx
│   │       ├── Forecast.jsx
│   │       └── Hero.jsx
│   ├── styles/             # Fogli di stile Sass e moduli grafici
│   │   ├── _card.sass
│   │   ├── _forecast.sass
│   │   ├── _hero.sass
│   │   ├── _navbar.sass
│   │   ├── _pokedex.sass
│   │   ├── App.sass
│   │   └── index.sass
│   ├── utils/              # Funzioni di utilità e logica pura
│   │   ├── castformUtils.js
│   │   └── dateUtils.js
│   ├── App.jsx             # Orchestratore principale e gestione dello stato
│   ├── main.tsx            # Entry point dell'applicazione React
│   └── vite-env.d.ts
├── .env.local              # Variabili d'ambiente (non tracciato da git)
├── CHANGELOG.md            # Cronologia versioni e rilasci
├── package.json
└── vite.config.ts
```

---

## 🚀 Guida all'Avvio e Installazione

### Prerequisiti
- [Node.js](https://nodejs.org/) (versione 18 o superiore)
- [Yarn](https://yarnpkg.com/) (consigliato) oppure `npm`

### 1. Clonazione del Repository
```bash
git clone https://github.com/bonfiglioalessio/weather-app.git
cd weather-app
```

### 2. Installazione delle Dipendenze
```bash
yarn install
```

### 3. Configurazione dell'API Key
L'applicazione richiede una chiave API gratuita di **[OpenWeatherMap](https://openweathermap.org/api)**.

Crea un file `.env.local` nella cartella radice del progetto:
```bash
touch .env.local
```

Aggiungi la tua chiave API:
```env
VITE_OPENWEATHER_API_KEY=la_tua_api_key_qui
```

### 4. Avvio dell'Ambiente di Sviluppo
```bash
yarn dev
```
L'applicazione sarà disponibile su `http://localhost:5173/`.

---

## 📦 Comandi Disponibili

| Comando | Descrizione |
| :--- | :--- |
| `yarn dev` | Avvia il server di sviluppo locale con Hot Module Replacement (Vite) |
| `yarn build` | Esegue il controllo dei tipi (`tsc`) e compila il bundle di produzione in `dist/` |
| `yarn preview` | Avvia un server locale per visualizzare in anteprima la build di produzione |

---

## 🌿 Git Flow & Regole di Contribuzione

Il repository segue uno standard rigoroso di sviluppo e rilascio:
- **`main`**: branch protetto, dedicato esclusivamente alle versioni stabili e ai rilasci di produzione.
- **`develop`**: branch principale per l'integrazione e lo sviluppo continuo.
- **Feature/Fix/Docs Branches**: i branch dedicati (es. `feat/...`, `fix/...`, `docs/...`) vengono aperti da `develop` e integrati con merge diretto una volta verificati.
- **Conventional Commits**: i messaggi di commit sono in lingua inglese, a riga singola (es. `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`).

---

## 📄 Licenza
Distribuito sotto licenza MIT. Consulta il file `LICENSE` per ulteriori informazioni.
