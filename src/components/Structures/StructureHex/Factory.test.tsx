/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import Structures from '../structures';

//test when clicky with option to upgrade, Factory upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelFactory = '4';
  localStorage.levelFactory = '1';

  const factoryDom = render(<Structures />);
  const upgradeButton = factoryDom.container.querySelector(
    '#FactoryUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const FactoryLevel = factoryDom.container.querySelector('#FactoryLevel');
  const FactoryNextLevelCost = factoryDom.container.querySelector(
    '#FactoryNextLevelCost'
  );

  expect(FactoryLevel?.innerHTML).toBe('1');
  expect(FactoryNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(FactoryLevel?.innerHTML).toBe('2');
  expect(FactoryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Factory does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelFactory = '8';
  localStorage.levelFactory = '2';

  const factoryDom = render(<Structures />);
  const upgradeButton = factoryDom.container.querySelector(
    '#FactoryUpgradeButton'
  )?.firstChild?.firstChild as TargetElement;
  expect(upgradeButton).toBeInTheDocument();

  const FactoryLevel = factoryDom.container.querySelector('#FactoryLevel');
  const FactoryNextLevelCost = factoryDom.container.querySelector(
    '#FactoryNextLevelCost'
  );

  expect(FactoryLevel?.innerHTML).toBe('2');
  expect(FactoryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(FactoryLevel?.innerHTML).toBe('2');
  expect(FactoryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
