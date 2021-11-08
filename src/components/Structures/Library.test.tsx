/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Library from './Library';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//test when clicky with option to upgrade, Library upgrades correctly
test('clicking button upgrades structure when user has ability to upgrade', () => {
  localStorage.honeycomb = '4';
  localStorage.costNextLevelLibrary = '4';
  localStorage.levelLibrary = '1';

  const libraryDom = render(<Library />);
  const upgradeButton = libraryDom.container.querySelector(
    '#upgradeLibraryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const libraryLevel = libraryDom.container.querySelector('#libraryLevel');
  const libraryNextLevelCost = libraryDom.container.querySelector(
    '#libraryNextLevelCost'
  );

  expect(libraryLevel?.innerHTML).toBe('1');
  expect(libraryNextLevelCost?.innerHTML).toBe('4');
  expect(localStorage.honeycomb).toBe('4');

  userEvent.click(upgradeButton);

  expect(libraryLevel?.innerHTML).toBe('2');
  expect(libraryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('0');
});

//test when clicky without upgrade ability, Library does not upgrade
test('clicking button does not upgrade structure when user cannot upgrade', () => {
  localStorage.honeycomb = '5';
  localStorage.costNextLevelLibrary = '8';
  localStorage.levelLibrary = '2';

  const libraryDom = render(<Library />);
  const upgradeButton = libraryDom.container.querySelector(
    '#upgradeLibraryButton'
  )?.firstChild?.firstChild;
  expect(upgradeButton).toBeInTheDocument();

  const libraryLevel = libraryDom.container.querySelector('#libraryLevel');
  const libraryNextLevelCost = libraryDom.container.querySelector(
    '#libraryNextLevelCost'
  );

  expect(libraryLevel?.innerHTML).toBe('2');
  expect(libraryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');

  userEvent.click(upgradeButton);

  expect(libraryLevel?.innerHTML).toBe('2');
  expect(libraryNextLevelCost?.innerHTML).toBe('8');
  expect(localStorage.honeycomb).toBe('5');
});
