/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Storage from './Storage';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test when clicky with option to upgrade, Storage upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelStorage = '4';
  localStorage.levelStorage = '1';

  const storageDom = render(<Storage />);
  const upgradeButton = storageDom.container.querySelector(
    '#upgradeStorageButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const storageLevel = storageDom.container.querySelector('#storageLevel');
  const storageNextLevelCost = storageDom.container.querySelector(
    '#storageNextLevelCost'
  );

  expect(storageLevel?.innerHTML).toBe('1');
  expect(storageNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(storageLevel?.innerHTML).toBe('2');
  expect(storageNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Storage does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelStorage = '8';
  localStorage.levelStorage = '2';

  const storageDom = render(<Storage />);
  const upgradeButton = storageDom.container.querySelector(
    '#upgradeStorageButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const storageLevel = storageDom.container.querySelector('#storageLevel');
  const storageNextLevelCost = storageDom.container.querySelector(
    '#storageNextLevelCost'
  );

  expect(storageLevel?.innerHTML).toBe('2');
  expect(storageNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(storageLevel?.innerHTML).toBe('2');
  expect(storageNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
