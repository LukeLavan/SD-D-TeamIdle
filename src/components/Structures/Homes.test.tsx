/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Homes from './Homes';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test when clicky with option to upgrade, Homes upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelHomes = '4';
  localStorage.levelHomes = '1';

  const homesDom = render(<Homes />);
  const upgradeButton = homesDom.container.querySelector('#upgradeHomesButton')
    ?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const homesLevel = homesDom.container.querySelector('#homesLevel');
  const homesNextLevelCost = homesDom.container.querySelector(
    '#homesNextLevelCost'
  );

  expect(homesLevel?.innerHTML).toBe('1');
  expect(homesNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(homesLevel?.innerHTML).toBe('2');
  expect(homesNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Homes does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelHomes = '8';
  localStorage.levelHomes = '2';

  const homesDom = render(<Homes />);
  const upgradeButton = homesDom.container.querySelector('#upgradeHomesButton')
    ?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const homesLevel = homesDom.container.querySelector('#homesLevel');
  const homesNextLevelCost = homesDom.container.querySelector(
    '#homesNextLevelCost'
  );

  expect(homesLevel?.innerHTML).toBe('2');
  expect(homesNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(homesLevel?.innerHTML).toBe('2');
  expect(homesNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
