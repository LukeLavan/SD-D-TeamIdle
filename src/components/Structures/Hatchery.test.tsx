/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Hatchery from './Hatchery';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test when clicky with option to upgrade, Hatchery upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelHatchery = '4';
  localStorage.levelHatchery = '1';

  const hatcheryDom = render(<Hatchery />);
  const upgradeButton = hatcheryDom.container.querySelector(
    '#upgradeHatcheryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const hatcheryLevel = hatcheryDom.container.querySelector('#hatcheryLevel');
  const hatcheryNextLevelCost = hatcheryDom.container.querySelector(
    '#hatcheryNextLevelCost'
  );

  expect(hatcheryLevel?.innerHTML).toBe('1');
  expect(hatcheryNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(hatcheryLevel?.innerHTML).toBe('2');
  expect(hatcheryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Hatchery does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelHatchery = '8';
  localStorage.levelHatchery = '2';

  const hatcheryDom = render(<Hatchery />);
  const upgradeButton = hatcheryDom.container.querySelector(
    '#upgradeHatcheryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const hatcheryLevel = hatcheryDom.container.querySelector('#hatcheryLevel');
  const hatcheryNextLevelCost = hatcheryDom.container.querySelector(
    '#hatcheryNextLevelCost'
  );

  expect(hatcheryLevel?.innerHTML).toBe('2');
  expect(hatcheryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(hatcheryLevel?.innerHTML).toBe('2');
  expect(hatcheryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
