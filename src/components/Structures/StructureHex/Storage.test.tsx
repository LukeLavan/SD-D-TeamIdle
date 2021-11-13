/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import Structures from '../structures';

//test when clicky with option to upgrade, Storage upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelStorage = '4';
  localStorage.levelStorage = '1';

  const storageDom = render(<Structures />);
  const upgradeButton = storageDom.container.querySelector(
    '#StorageUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const StorageLevel = storageDom.container.querySelector('#StorageLevel');
  const StorageNextLevelCost = storageDom.container.querySelector(
    '#StorageNextLevelCost'
  );

  expect(StorageLevel?.innerHTML).toBe('1');
  expect(StorageNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(StorageLevel?.innerHTML).toBe('2');
  expect(StorageNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Storage does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelStorage = '8';
  localStorage.levelStorage = '2';

  const storageDom = render(<Structures />);
  const upgradeButton = storageDom.container.querySelector(
    '#StorageUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const StorageLevel = storageDom.container.querySelector('#StorageLevel');
  const StorageNextLevelCost = storageDom.container.querySelector(
    '#StorageNextLevelCost'
  );

  expect(StorageLevel?.innerHTML).toBe('2');
  expect(StorageNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(StorageLevel?.innerHTML).toBe('2');
  expect(StorageNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
