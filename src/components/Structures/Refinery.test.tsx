/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Refinery from './Refinery';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test when clicky with option to upgrade, Refinery upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelRefinery = '4';
  localStorage.levelRefinery = '1';

  const refineryDom = render(<Refinery />);
  const upgradeButton = refineryDom.container.querySelector(
    '#upgradeRefineryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const refineryLevel = refineryDom.container.querySelector('#refineryLevel');
  const refineryNextLevelCost = refineryDom.container.querySelector(
    '#refineryNextLevelCost'
  );

  expect(refineryLevel?.innerHTML).toBe('1');
  expect(refineryNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(refineryLevel?.innerHTML).toBe('2');
  expect(refineryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Refinery does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelRefinery = '8';
  localStorage.levelRefinery = '2';

  const refineryDom = render(<Refinery />);
  const upgradeButton = refineryDom.container.querySelector(
    '#upgradeRefineryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const refineryLevel = refineryDom.container.querySelector('#refineryLevel');
  const refineryNextLevelCost = refineryDom.container.querySelector(
    '#refineryNextLevelCost'
  );

  expect(refineryLevel?.innerHTML).toBe('2');
  expect(refineryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(refineryLevel?.innerHTML).toBe('2');
  expect(refineryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
