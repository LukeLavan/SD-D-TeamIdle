/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const variableDefaults = {
  honey: 0,
  bees: 0,
  costOfNextBeeHoney: 1,
  costOfNextBeeRoyalJelly: 0,
  nectar: 0,
  royalJelly: 0,
  honeycomb: 0
};

const staticConstants = {
  NECTAR_BY_BEE: 3,
  ROYAL_JELLY_BY_BEE: 0.27,
  NECTAR_TO_HONEY_COST: 5,
  HONEY_TO_HONEYCOMB_COST: 5
};

const resourceCapacities = {
  // nectarCap: 100,
  honeyCap: 100,
  beeCap: 10,
  honeycombCap: 100
  // royalJellyCap: 100
};

export { variableDefaults, staticConstants, resourceCapacities };
