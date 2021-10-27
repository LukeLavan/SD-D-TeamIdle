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
    Factory: 0
  },
  capacities: {
    nectar: 20,
    honey: 10,
    honeycomb: 5,
    royalJelly: 10
  },
  weather: {
    month: 0,
    day: 1,
    counter: 1,
    nectarBonus: 1,
    thunder: false,
    royalJellyBonus: 1,
    season: 'winter',
    weather: 'CLOUDY'
  }
};

const staticConstants = {
  NECTAR_BY_BEE: 3,
  ROYAL_JELLY_BY_BEE: 0.27,
  NECTAR_TO_HONEY_COST: 5,
  HONEY_TO_HONEYCOMB_COST: 5,
  PUPAE_BY_DRONE: 0.1,
  PUPAE_TO_LARVAE_COST: 5,
  LARVAE_TO_BEE_COST: 5,
  STRUCTURE_SCALING: {
    DanceFloor: 2,
    Refinery: 2,
    Homes: 2,
    Hatchery: 2,
    Factory: 2,
    Library: 2,
    Storage: 2
  }
};

export { variableDefaults, staticConstants };
