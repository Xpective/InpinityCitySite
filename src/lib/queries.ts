export const DASHBOARD_QUERY = `
  query DashboardQuery {
    _meta {
      block {
        number
      }
    }

    weaponDefinitions(first: 12, orderBy: weaponDefinitionId, orderDirection: asc) {
      id
      weaponDefinitionId
      name
      classId
      damageTypeId
      techTier
      requiredLevel
      minDamage
      maxDamage
      attackSpeed
      maxDurability
      enchantmentSlots
      materiaSlots
      enabled
    }

    weaponInstances(first: 12, orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      rarityTier
      frameTier
      durability
      upgradeLevel
      originPlotId
      originFaction
      originDistrictKind
      craftedAt
      resonanceType
      usedAether
      owner {
        id
      }
      weaponDefinition {
        id
        name
      }
    }

    materiaDefinitions(first: 12, orderBy: materiaId, orderDirection: asc) {
      id
      materiaId
      name
      categoryRaw
      categoryLabel
      elementRaw
      elementLabel
      rarityTier
      maxLevel
      enabled
    }

    plots(first: 12, orderBy: plotId, orderDirection: asc) {
      id
      plotId
      plotType
      faction
      status
      width
      height
      createdAt
      exists
      owner {
        id
      }
    }

    players(first: 12, orderBy: id, orderDirection: asc) {
      id
      cityKeyTokenId
      faction
      personalPlotCount
      craftedWeapons
    }
  }
`;