/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const variableDefaults = {
  honey: 0,
  bees: 0,
  drones: 1,
  idleWorkers: 0,
  pupae: 0,
  larvae: 0,
  costOfNextBeeHoney: 1,
  costOfNextBeeRoyalJelly: 0,
  nectar: 0,
  royalJelly: 0,
  honeycomb: 0,
  structureLevels: {
    DanceFloor: 0,
    Refinery: 1,
    Homes: 2,
    Hatchery: 0,
    Factory: 1,
    Library: 0,
    Storage: 1
  },
  structureCosts: {
    DanceFloor: 2,
    Refinery: 2,
    Homes: 2,
    Hatchery: 2,
    Factory: 2,
    Library: 2,
    Storage: 2
  },
  assignedWorkers: {
    DanceFloor: 0,
    Refinery: 1,
    Hatchery: 0,
    Factory: 0,
    Library: 0
  },
  capacities: {
    nectar: 10,
    honey: 20,
    honeycomb: 5,
    royalJelly: 5
  },
  ticksNextEgg: -1,
  eggReady: false,
  broodcells: [
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    },
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    },
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    },
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    },
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    },
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    },
    {
      type: 'none',
      destiny: 'none',
      ticksLeft: -1
    }
  ],
  weather: {
    month: 0,
    day: 1,
    counter: 1,
    nectarBonus: 1,
    thunder: false,
    royalJellyBonus: 1,
    season: 'winter',
    weather: 'CLOUDY'
  },
  techEnabled: {
    honey1: false,
    honey2: false,
    honey3: false,
    drone: false,
    nurse: false,
    honeyConversion: false
  },
  currentResearch: 'none',
  researchProgress: 0,
  researchMax: 0,
  techHoneyMultiplier: 1,
  techDroneMultiplier: 1,
  techRoyalJellyMultiplier: 1,
  techHoneyConversionReducer: 0
};

const staticConstants = {
  NECTAR_BY_BEE: 3,
  ROYAL_JELLY_BY_BEE: 0.03,
  NECTAR_TO_HONEY_COST: 5,
  HONEY_TO_HONEYCOMB_COST: 5,
  WORKER_COST_ROYAL_JELLY: 5,
  STRUCTURE_SCALING: {
    DanceFloor: 2,
    Refinery: 2,
    Homes: 2,
    Hatchery: 2,
    Factory: 2,
    Library: 2,
    Storage: 2
  },
  STORAGE_SCALING: {
    nectar: variableDefaults.capacities.nectar,
    honey: variableDefaults.capacities.honey,
    honeycomb: variableDefaults.capacities.honeycomb,
    royalJelly: variableDefaults.capacities.royalJelly
  },
  TECH_VALUE: {
    honey1: 1,
    honey2: 2,
    honey3: 4,
    drone: 1,
    nurse: 1,
    honeyConversion: 1
  },
  TECH_COST: {
    honey1: 500,
    honey2: 1000,
    honey3: 5000,
    drone: 2000,
    nurse: 500,
    honeyConversion: 4000
  }
};

const pageIds = {
  BEEHIVE_ID: 1,
  HATCHERY_ID: 2,
  UPGRADE_ID: 3,
  TECH_TREE_ID: 4,
  STATISTICS_ID: 5,
  SETTINGS_ID: 6
};

export { variableDefaults, staticConstants, pageIds };
