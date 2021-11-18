/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import Structures from '../structures';

//test when clicky with option to upgrade, Refinery upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelRefinery = '4';
  localStorage.levelRefinery = '1';

  const refineryDom = render(<Structures />);
  const upgradeButton = refineryDom.container.querySelector(
    '#RefineryUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const RefineryLevel = refineryDom.container.querySelector('#RefineryLevel');
  const RefineryNextLevelCost = refineryDom.container.querySelector(
    '#RefineryNextLevelCost'
  );

  expect(RefineryLevel?.innerHTML).toBe('1');
  expect(RefineryNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(RefineryLevel?.innerHTML).toBe('2');
  expect(RefineryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Refinery does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelRefinery = '8';
  localStorage.levelRefinery = '2';

  const refineryDom = render(<Structures />);
  const upgradeButton = refineryDom.container.querySelector(
    '#RefineryUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const RefineryLevel = refineryDom.container.querySelector('#RefineryLevel');
  const RefineryNextLevelCost = refineryDom.container.querySelector(
    '#RefineryNextLevelCost'
  );

  expect(RefineryLevel?.innerHTML).toBe('2');
  expect(RefineryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(RefineryLevel?.innerHTML).toBe('2');
  expect(RefineryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
