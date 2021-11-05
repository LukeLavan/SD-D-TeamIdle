/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Factory from './Factory';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test when clicky with option to upgrade, Factory upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelFactory = '4';
  localStorage.levelFactory = '1';

  const factoryDom = render(<Factory />);
  const upgradeButton = factoryDom.container.querySelector(
    '#upgradeFactoryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const factoryLevel = factoryDom.container.querySelector('#factoryLevel');
  const factoryNextLevelCost = factoryDom.container.querySelector(
    '#factoryNextLevelCost'
  );

  expect(factoryLevel?.innerHTML).toBe('1');
  expect(factoryNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(factoryLevel?.innerHTML).toBe('2');
  expect(factoryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Factory does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelFactory = '8';
  localStorage.levelFactory = '2';

  const factoryDom = render(<Factory />);
  const upgradeButton = factoryDom.container.querySelector(
    '#upgradeFactoryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const factoryLevel = factoryDom.container.querySelector('#factoryLevel');
  const factoryNextLevelCost = factoryDom.container.querySelector(
    '#factoryNextLevelCost'
  );

  expect(factoryLevel?.innerHTML).toBe('2');
  expect(factoryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(factoryLevel?.innerHTML).toBe('2');
  expect(factoryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
