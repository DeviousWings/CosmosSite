# 🌌 The Cosmos Library

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-blueviolet?style=for-the-badge)](https://astro.build/)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge)](https://www.netlify.com/)

> "Exploration is really the essence of the human spirit." — Frank Borman

**The Cosmos Library** is a living space exploration portal — part portfolio, part resource hub, part personal archive. It pulls real-time data from NASA and space agencies to bring the cosmos to your browser. Built by a U.S. Army veteran and web developer with a lifelong obsession with what's out there.

Space has always fascinated me — the idea of exploration, of finding out what our cosmos really is, and how humanity fits into it. This site is where I collect that excitement in one place and share it.

---

## 🚀 Live Site

[🌐 View The Cosmos Library](https://cosmiclibrary.netlify.app/)

---

## ✨ Features

- 🌠 **Astronomy Picture of the Day (APOD)** — NASA's daily image or video with full description
- 🔭 **James Webb Space Telescope** — Latest JWST imagery from the NASA Images API
- ☄️ **Near Earth Objects (NEO)** — Today's closest asteroid approaches via NASA NeoWS
- 🚀 **Upcoming Rocket Launches** — Live launch schedule + countdown timers from The Space Devs API
- 🛸 **Space Events** — ISS events, spacecraft releases (including NG-23 Cygnus), and more
- 📰 **Latest Space News** — Headlines from the Spaceflight News API
- ☄️ **Comet C/2026 A1 (ATLAS)** — Dedicated tracking page with orbital data, visibility guide, and solar system map
- 🕐 **Live UTC + Local Time Widget** — Always-on clock in the navbar
- 📝 **Personal Blog** — Space thoughts, research, and mission breakdowns via Substack
- 📱 **Fully Responsive** — Mobile-first layout that works on any screen size
- ⚙️ **Resilient API Handling** — Every API call has try/catch so one failure never breaks the page

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Framework** | [Astro.js](https://astro.build/) v5 (SSR) |
| **Styling** | Custom SCSS / CSS (no Tailwind) |
| **APIs** | NASA APOD, NASA Images (JWST), NeoWS, The Space Devs (LL2), Spaceflight News API, JPL SBDB |
| **Deployment** | [Netlify](https://www.netlify.com/) |
| **Blog** | Substack integration |

---

## 📡 APIs Used

| API | Purpose | Docs |
|:----|:--------|:-----|
| NASA APOD | Astronomy Picture of the Day | [api.nasa.gov](https://api.nasa.gov/) |
| NASA Images API | JWST imagery | [images.nasa.gov](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf) |
| NASA NeoWS | Near Earth Object data | [api.nasa.gov](https://api.nasa.gov/) |
| The Space Devs LL2 | Upcoming launches & space events | [thespacedevs.com](https://thespacedevs.com/) |
| Spaceflight News API | Space news headlines | [spaceflightnewsapi.net](https://www.spaceflightnewsapi.net/) |
| JPL Small Body Database | Comet & asteroid orbital elements | [ssd.jpl.nasa.gov](https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html) |

---

## 🗺️ Roadmap

| Phase | Description | Status |
|:------|:------------|:-------|
| **Phase 1** | Core API Integration (APOD, JWST, NEO) | ✅ Complete |
| **Phase 2** | Personal Blog System | ✅ Complete |
| **Phase 3** | Library Expansion (Launches, Events, News) | ✅ Complete |
| **Phase 4** | UI/UX Polish + Mobile Responsive | ✅ Complete |
| **Phase 5** | Hosting & Deployment (Netlify) | ✅ Live |
| **Phase 6** | Launch Countdown Timers + Nav Dropdown | ✅ Complete |
| **Phase 7** | Featured Object Pages (Comet C/2026 A1) | ✅ Complete |
| **Stretch** | Dark/Light Mode, AI integrations, Orbital tracker, More deep-dive pages | 🌟 Dream Stage |
| **Stretch** | Add Sun news from 

---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js 18+
- A free [NASA API key](https://api.nasa.gov/)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/DeviousWings/cosmossite.git
cd cosmossite

# Install dependencies
npm install

# Add your NASA API key
echo "PUBLIC_NASA_API_KEY=your_key_here" > .env

# Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the root:

```env
PUBLIC_NASA_API_KEY=your_nasa_api_key_here
```

No API key is needed for The Space Devs, Spaceflight News, or JPL SBDB — they are open APIs.

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── index.astro          # Home page
│   ├── library.astro        # Main library (APOD, JWST, NEO, News)
│   ├── blog.astro           # Blog (Substack integration)
│   ├── aboutme.astro        # About page
│   └── library/
│       └── comet-c2026a1.astro  # Comet C/2026 A1 tracking page
├── components/
│   ├── Footer.astro
│   └── BlogList.astro
├── layouts/
│   └── Layout.astro         # Global layout + navbar + time widget
└── utils/
    ├── fetchNasaAPOD.js
    ├── fetchJWSTData.js
    ├── fetchMarsRoverPhotos.js  # Repurposed → NeoWS
    ├── fetchSpaceNews.js
    ├── fetchUpcomingLaunches.js
    ├── fetchUpcomingEvents.js
    └── fetchCometData.js    # JPL SBDB orbital data
public/
└── styles/
    └── main.css             # All compiled styles (edit this directly)
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📡 Connect

- 🌐 [Portfolio](https://deviouswings.github.io/PortDev/)
- 📰 [Substack](https://substack.com/@YOUR_SUBSTACK) — space writing & ideas
- 💻 [GitHub](https://github.com/DeviousWings)
- 🔗 [LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN)
- ✉️ [nskingdev@gmail.com](mailto:nskingdev@gmail.com)
- ☕ [Buy Me a Coffee](https://buymeacoffee.com/deviouswings)

---

*Built with curiosity, caffeine, and a deep belief that humanity's future is out there.*
