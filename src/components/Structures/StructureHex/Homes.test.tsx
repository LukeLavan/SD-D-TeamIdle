/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import Structures from '../structures';

//test when clicky with option to upgrade, Homes upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelHomes = '4';
  localStorage.levelHomes = '1';

  const homesDom = render(<Structures />);
  const upgradeButton = homesDom.container.querySelector('#HomesUpgradeButton')
    ?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const HomesLevel = homesDom.container.querySelector('#HomesLevel');
  const HomesNextLevelCost = homesDom.container.querySelector(
    '#HomesNextLevelCost'
  );

  expect(HomesLevel?.innerHTML).toBe('1');
  expect(HomesNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(HomesLevel?.innerHTML).toBe('2');
  expect(HomesNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Homes does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelHomes = '8';
  localStorage.levelHomes = '2';

  const homesDom = render(<Structures />);
  const upgradeButton = homesDom.container.querySelector('#HomesUpgradeButton')
    ?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const HomesLevel = homesDom.container.querySelector('#HomesLevel');
  const HomesNextLevelCost = homesDom.container.querySelector(
    '#HomesNextLevelCost'
  );

  expect(HomesLevel?.innerHTML).toBe('2');
  expect(HomesNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(HomesLevel?.innerHTML).toBe('2');
  expect(HomesNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
