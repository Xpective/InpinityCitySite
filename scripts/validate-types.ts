#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message: string, color: string = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function checkFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) {
    log(`❌ Datei nicht gefunden: ${filePath}`, COLORS.red);
    return false;
  }
  log(`✅ Datei existiert: ${filePath}`, COLORS.green);
  return true;
}

function checkType(filePath: string, typeName: string, expectedFields: string[]): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const typeRegex = new RegExp(`export type ${typeName}\\s*=\\s*{([^}]+)}`, 's');
    const match = content.match(typeRegex);
    
    if (!match) {
      log(`❌ Typ ${typeName} nicht gefunden in ${filePath}`, COLORS.red);
      return false;
    }

    const fields = match[1];
    const missingFields = expectedFields.filter(field => !fields.includes(field));
    
    if (missingFields.length > 0) {
      log(`❌ Fehlende Felder in ${typeName}: ${missingFields.join(', ')}`, COLORS.red);
      return false;
    }
    
    log(`✅ Typ ${typeName} hat alle erwarteten Felder`, COLORS.green);
    return true;
  } catch (error) {
    log(`❌ Fehler beim Lesen von ${filePath}: ${error}`, COLORS.red);
    return false;
  }
}

function runTypeCheck(): boolean {
  log('\n📦 Prüfe TypeScript-Konfiguration...', COLORS.blue);
  try {
    execSync('npx tsc --noEmit', { stdio: 'ignore' });
    log('✅ TypeScript-Check erfolgreich', COLORS.green);
    return true;
  } catch {
    log('❌ TypeScript-Fehler gefunden', COLORS.red);
    return false;
  }
}

function main() {
  log('\n🔍 STARTE VALIDIERUNG DES PROJEKTS\n', COLORS.blue);

  // 1. Prüfe wichtige Dateien
  const files = [
    'src/types/infinity.ts',
    'src/types/city.ts',
    'src/lib/city-map-merge.ts',
    'src/lib/infinity-layout.ts',
    'src/App.tsx',
    'src/lib/queries.ts',
  ];

  let allFilesExist = true;
  files.forEach(file => {
    if (!checkFile(file)) allFilesExist = false;
  });

  if (!allFilesExist) {
    log('\n❌ Bitte fehlende Dateien wiederherstellen', COLORS.red);
    process.exit(1);
  }

  // 2. Prüfe Typen-Konsistenz
  log('\n📐 Prüfe Typ-Definitionen...', COLORS.blue);
  
  const infinityTypeCheck = checkType('src/types/infinity.ts', 'InfinityPlot', [
    'id', 'index', 'x', 'y', 'width', 'height', 'lane', 'side', 
    'distanceToNexus', 'rarity', 'faction', 'status', 'label', 
    'plotKind', 'priceEstimate', 'plotId?', 'owner?', 'createdAt?',
    'exists?', 'provenance?', 'statusInfo?'
  ]);

  // 3. Prüfe ob generated Ordner existiert
  log('\n📁 Prüfe generated Types...', COLORS.blue);
  
  const generatedDir = 'src/types/generated';
  if (!fs.existsSync(generatedDir)) {
    log('⚠️  generated Ordner nicht gefunden - Bitte führe `npm run codegen` aus', COLORS.yellow);
  } else {
    const files = fs.readdirSync(generatedDir);
    if (files.length > 0) {
      log(`✅ generated Ordner enthält ${files.length} Dateien`, COLORS.green);
    } else {
      log('⚠️  generated Ordner ist leer - Bitte führe `npm run codegen` aus', COLORS.yellow);
    }
  }

  // 4. Führe TypeScript-Check durch
  const tsPassed = runTypeCheck();

  // 5. Zusammenfassung
  log('\n📊 ZUSAMMENFASSUNG', COLORS.blue);
  log('────────────────', COLORS.blue);
  
  if (tsPassed && infinityTypeCheck) {
    log('✨ ALLE PRÜFUNGEN BESTANDEN!', COLORS.green);
    log('   Das Projekt ist bereit für den Build.', COLORS.green);
  } else {
    log('⚠️  EINIGE PRÜFUNGEN FEHLGESCHLAGEN', COLORS.yellow);
    log('   Bitte die markierten Probleme beheben.', COLORS.yellow);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}