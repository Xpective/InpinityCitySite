# Inpinity City Site

Frontend for the **Inpinity City** map, registry flow, and Qubiq build terminal.  
Built with **React + TypeScript + Vite** and connected to the live **Base** contracts and the city subgraph proxy.

---

## Current Scope

This app currently combines:

- **Infinity-shaped city map UI**
- **Live subgraph hydration** on top of the visual city layout
- **Wallet-aware registry flow**
- **City Key selection**
- **Faction-aware personal plot flow**
- **Qubiq contribution preparation**
- **Live plot + Qubiq readouts**
- **Mobile-friendly map scrolling and zoom controls**
- **Historical / district / validation details per plot**

---

## Live Stack

### Chain
- **Base Mainnet**
- **Chain ID:** `8453`

### Subgraph Proxy
- `https://api.city.inpinity.online/graphql`

### Core Contracts
- **CityRegistry:** `0x5d3269813Fea0C0F487A21cBf9992b95008558BF`
- **CityLand:** `0x0547a35c2Ff215004A2EBfe2Be5f3A8EeE6A5323`
- **CityConfig:** `0x565076216ec76E7Af61BafBE22D8EA7C1C8DF691`
- **CityStatus:** `0x28AfE371044e9AcD4C99Bef3F5FbBe2431cF04C0`
- **CityDistricts:** `0xB3cFaeDA09FB5ee84C3c26F276980773197af113`
- **CityHistory:** `0x6C83aC3E4C58c493e3116E31cF7e32935497Af3c`
- **CityValidation:** `0x77BBd6850C2780055c4C20008145E9E5dEC20332`
- **InpinityNFT / City Key source:** `0x277a0D5864293C78d7387C54B48c35D5E9578Ab1`

---

## Main Features

### 1. Infinity City Map
The map uses a visual **∞ layout** and merges live subgraph data into a curated city layout.

Supported plot groups:
- Personal 5x5 plots
- Community 25x25 plots
- Borderline 25x25 plots
- Nexus core plots

### 2. Plot Hydration
Mock/layout plots are enriched with live data:
- plot ownership
- status info
- provenance
- value estimates
- district/history/status overlays

### 3. Build Terminal
The right-side panel currently supports:
- wallet connection
- City Key selection
- faction-aware build flow
- personal plot reservation
- ERC1155 approval step
- Qubiq contribution step
- live completion %
- live Qubiq state per cell
- completed / in-progress cell visualization

### 4. Plot Detail Panel
Per plot, the UI can show:
- policy and role
- historical signals
- district information
- validation snapshot
- maintenance/activity information
- value model
- live status / provenance

### 5. Mobile Improvements
The current frontend includes:
- horizontal map scrolling on small screens
- zoom buttons for the map
- sticky map toolbar area
- responsive cards/panels
- safer overflow handling

---

## Qubiq Flow Order

The intended flow is:

1. **Connect Wallet**
2. **Set City Key**
3. **Choose Faction**
4. **Reserve Plot**
5. **Approve Resources**
6. **Contribute Qubiq**
7. Repeat contributions until the plot reaches **25 / 25**

---

## Project Structure


src/
├─ components/
│  ├─ city/
│  │  ├─ CityStats.tsx
│  │  ├─ CityToolbar.tsx
│  │  ├─ InfinityMap.tsx
│  │  ├─ MintPreparationPanel.tsx
│  │  └─ PlotDetails.tsx
│  └─ common/
│     ├─ ErrorBoundary.tsx
│     ├─ ErrorMessage.tsx
│     └─ LoadingSpinner.tsx
├─ hooks/
│  └─ useLivePlotProgress.ts
├─ lib/
│  ├─ city-config.ts
│  ├─ city-districts.ts
│  ├─ city-history.ts
│  ├─ city-key.ts
│  ├─ city-land.ts
│  ├─ city-map-merge.ts
│  ├─ city-qubiq-flow.ts
│  ├─ city-registry.ts
│  ├─ city-status.ts
│  ├─ city-validation.ts
│  ├─ eligibility.ts
│  ├─ errorHandling.ts
│  ├─ favorites.ts
│  ├─ graphql.ts
│  ├─ infinity-layout.ts
│  ├─ queries.ts
│  └─ resource-check.ts
├─ styles/
│  └─ global.css
├─ types/
│  ├─ city.ts
│  └─ infinity.ts
└─ App.tsx