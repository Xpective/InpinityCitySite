/**
 * Inpinity Unified Theme — TypeScript design tokens
 * Brücke zwischen inpinity.online · phircle · city.inpinity.online
 *
 * ÄNDERUNG: Neue Datei. Wird von allen Komponenten importiert.
 */

export const colors = {
  // Backgrounds
  bg: '#000000',
  bgSoft: '#080810',
  bgCard: 'rgba(8, 8, 16, 0.92)',
  bgElevated: 'rgba(8, 8, 16, 0.98)',
  bgGlass: 'rgba(8, 8, 16, 0.72)',

  // Primary (Phircle-Gold)
  primary: '#ffcc00',
  primaryDim: '#ffaa00',
  primaryDeep: '#cc8800',
  primaryGlow: 'rgba(255, 204, 0, 0.35)',

  // Semantics
  success: '#00ff88',
  successDim: '#00aa55',
  info: '#00e5ff',
  infoDim: '#0099aa',
  warning: '#ff8800',
  danger: '#ff3333',
  dangerDim: '#cc0000',
  partner: '#c060ff',

  // Text
  text: '#e0e0e0',
  textDim: '#888888',
  textFaint: '#666666',
  textGhost: '#444444',

  // Borders
  border: '#333333',
  borderSoft: '#1a1a1a',
  borderBright: '#444444',
} as const;

export const rarity = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffcc00',
  platinum: '#e5e4e2',
  diamond: '#b9f2ff',
} as const;

export type RarityName = keyof typeof rarity;

export const fontSize = {
  xs: '9px',
  sm: '10px',
  base: '11px',
  md: '12px',
  lg: '14px',
  xl: '17px',
  '2xl': '20px',
  '3xl': '28px',
  '4xl': '42px',
  '5xl': '56px',
} as const;

export const letterSpacing = {
  tight: '0.5px',
  base: '1px',
  wide: '2px',
  wider: '3px',
} as const;

export const spacing = {
  '1': '4px',
  '2': '6px',
  '3': '8px',
  '4': '12px',
  '5': '16px',
  '6': '20px',
  '7': '24px',
  '8': '32px',
  '9': '48px',
  '10': '64px',
} as const;

export const radius = {
  sm: '3px',
  md: '4px',
  lg: '6px',
  xl: '12px',
  '2xl': '18px',
  pill: '999px',
} as const;

export const shadow = {
  sm: '0 4px 10px rgba(0, 0, 0, 0.5)',
  md: '0 4px 15px rgba(0, 0, 0, 0.6)',
  lg: '0 4px 20px rgba(0, 0, 0, 0.6)',
  glowPrimary: '0 0 25px rgba(255, 204, 0, 0.35)',
  glowPrimaryStrong: '0 0 40px rgba(255, 204, 0, 0.55)',
  glowSuccess: '0 0 25px rgba(0, 255, 136, 0.35)',
  glowInfo: '0 0 25px rgba(0, 229, 255, 0.35)',
  glowDanger: '0 0 25px rgba(255, 51, 51, 0.4)',
} as const;

export const transition = {
  fast: '0.15s ease',
  base: '0.2s ease',
  slow: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
} as const;

export const zIndex = {
  base: 10,
  prominent: 12,
  hud: 15,
  sidebar: 20,
  tooltip: 50,
  toast: 100,
  modal: 150,
  modalTop: 180,
  tutorial: 200,
  loading: 300,
} as const;

// ============================================================
// Qubiq-Flow Metadaten (7 Schritte)
// ============================================================
export const qubiqSteps = [
  {
    id: 'wallet',
    label: 'Wallet verbinden',
    description: 'Verbinde dein Wallet mit Base (Chain ID 8453)',
    icon: '🔌',
    requiresFaction: false,
  },
  {
    id: 'key',
    label: 'City Key setzen',
    description: 'Dein NFT-basierter Zugang zur Stadt',
    icon: '🗝️',
    requiresFaction: false,
  },
  {
    id: 'faction',
    label: 'Fraktion wählen',
    description: 'Inpinity oder Inphinity — deine ewige Allianz',
    icon: '⚔️',
    requiresFaction: false,
  },
  {
    id: 'plot',
    label: 'Plot reservieren',
    description: 'Reserviere dein Grundstück im Nexus',
    icon: '🏙️',
    requiresFaction: true,
  },
  {
    id: 'approve',
    label: 'Ressourcen genehmigen',
    description: 'INPI, PITRONE & Qubiq-Ressourcen freigeben',
    icon: '✅',
    requiresFaction: true,
  },
  {
    id: 'qubiq',
    label: 'Qubiq beitragen',
    description: 'Sammle Qubiq bis 25/25 und schließe dein Plot ab',
    icon: '⚡',
    requiresFaction: true,
  },
  {
    id: 'built',
    label: 'Gebäude errichten',
    description: 'Dein persönlicher Bau beginnt — wähle Gebäudetyp',
    icon: '🏗️',
    requiresFaction: true,
  },
] as const;

export type QubiqStepId = typeof qubiqSteps[number]['id'];

export const factions = [
  { id: 'inpinity', label: 'Inpinity', color: colors.primary },
  { id: 'inphinity', label: 'Inphinity', color: colors.partner },
] as const;

export type FactionId = typeof factions[number]['id'];

// ============================================================
// Plot-Status Farben (on-chain status → color)
// ============================================================
export const plotStatusColors = {
  free: { color: colors.textGhost, label: 'Verfügbar', dim: true },
  reserved: { color: colors.warning, label: 'Reserviert', dim: false },
  owned: { color: colors.success, label: 'Deins', dim: false },
  active: { color: colors.success, label: 'Aktiv', dim: false },
  dormant: { color: colors.textFaint, label: 'Ruhend', dim: true },
  decayed: { color: colors.danger, label: 'Verfallen', dim: true },
  nexus: { color: colors.primary, label: 'Nexus', dim: false },
  selected: { color: colors.info, label: 'Ausgewählt', dim: false },
} as const;

export type PlotStatus = keyof typeof plotStatusColors;