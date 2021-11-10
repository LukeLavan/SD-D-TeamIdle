/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import Structures from '../structures';

//test when clicky with option to upgrade, Dance Floor upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelDanceFloor = '4';
  localStorage.levelDanceFloor = '1';

  const danceFloorDom = render(<Structures />);
  const upgradeButton = danceFloorDom.container.querySelector(
    '#DanceFloorUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const danceFloorLevel =
    danceFloorDom.container.querySelector('#DanceFloorLevel');
  const danceFloorNextLevelCost = danceFloorDom.container.querySelector(
    '#DanceFloorNextLevelCost'
  );

  expect(danceFloorLevel?.innerHTML).toBe('1');
  expect(danceFloorNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(danceFloorLevel?.innerHTML).toBe('2');
  expect(danceFloorNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Dance Floor does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelDanceFloor = '8';
  localStorage.levelDanceFloor = '2';

  const danceFloorDom = render(<Structures />);
  const upgradeButton = danceFloorDom.container.querySelector(
    '#DanceFloorUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const danceFloorLevel =
    danceFloorDom.container.querySelector('#DanceFloorLevel');
  const danceFloorNextLevelCost = danceFloorDom.container.querySelector(
    '#DanceFloorNextLevelCost'
  );

  expect(danceFloorLevel?.innerHTML).toBe('2');
  expect(danceFloorNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(danceFloorLevel?.innerHTML).toBe('2');
  expect(danceFloorNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
