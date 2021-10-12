/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const variableDefaults = {
  honey: 0,
  bees: 0,
  drones: 0,
  workers: 0,
  pupae: 0,
  larvae: 0,
  costOfNextBeeHoney: 1,
  costOfNextBeeRoyalJelly: 0,
  nectar: 0,
  royalJelly: 0,
  honeycomb: 0
};

const staticConstants = {
  NECTAR_BY_BEE: 3,
  NECTAR_TO_HONEY_COST: 5,
  HONEY_TO_HONEYCOMB_COST: 5,
  PUPAE_BY_DRONE: 0.1,
  PUPAE_TO_LARVAE_COST: 5,
  LARVAE_TO_BEE_COST: 5
};

export { variableDefaults, staticConstants };
