/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Refiners from './refiners';
import Bees from './bees';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('clicking plus button increases the number of refiners', () => {
  localStorage.levelRefinery = '3';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedRefinery = '0';

  const refinerDom = render(<Refiners />);
  const refinersPlusButton = refinerDom.container.querySelector(
    '#refinersPlusButton'
  );
  const refinerNumber = refinerDom.container.querySelector(
    '#refinersAssignedRefinery'
  );

  const beesDom = render(<Bees />);
  const workerNumber = beesDom.container.querySelector('#numOfWorkers');

  expect(refinerNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');

  for (let i = 0; i < 3; i++) {
    userEvent.click(refinersPlusButton);
  }

  expect(refinerNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');
});

test('clicking minus button decreases the number of refiners', () => {
  localStorage.levelRefinery = '3';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedRefinery = '3';

  const refinerDom = render(<Refiners />);
  const refinersMinusButton = refinerDom.container.querySelector(
    '#refinersMinusButton'
  );
  const refinerNumber = refinerDom.container.querySelector(
    '#refinersAssignedRefinery'
  );

  const beesDom = render(<Bees />);
  const workerNumber = beesDom.container.querySelector('#numOfWorkers');

  expect(refinerNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');

  for (let i = 0; i < 3; i++) {
    userEvent.click(refinersMinusButton);
  }

  expect(refinerNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');
});

test('make sure refiners stay below capacity', () => {
  localStorage.levelRefinery = '3';
  localStorage.workersAssignedRefinery = '3';

  const refinerDom = render(<Refiners />);
  const refinersPlusButton = refinerDom.container.querySelector(
    '#refinersPlusButton'
  );
  const refinerNumber = refinerDom.container.querySelector(
    '#refinersAssignedRefinery'
  );

  expect(refinerNumber.innerHTML).toBe('3');

  userEvent.click(refinersPlusButton);

  expect(refinerNumber.innerHTML).toBe('3');
});

test('make sure refiners cannot go below zero', () => {
  localStorage.workersAssignedRefinery = '0';

  const refinerDom = render(<Refiners />);
  const refinersMinusButton = refinerDom.container.querySelector(
    '#refinersMinusButton'
  );
  const refinerNumber = refinerDom.container.querySelector(
    '#refinersAssignedRefinery'
  );

  expect(refinerNumber.innerHTML).toBe('0');

  userEvent.click(refinersMinusButton);

  expect(refinerNumber.innerHTML).toBe('0');
});

test('make sure refiners cannot increase if no workers', () => {
  localStorage.idleWorkers = '0';
  localStorage.levelRefinery = '10';
  localStorage.workersAssignedRefinery = '0';

  const refinerDom = render(<Refiners />);
  const refinersPlusButton = refinerDom.container.querySelector(
    '#refinersPlusButton'
  );
  const refinerNumber = refinerDom.container.querySelector(
    '#refinersAssignedRefinery'
  );

  expect(refinerNumber.innerHTML).toBe('0');

  userEvent.click(refinersPlusButton);

  expect(refinerNumber.innerHTML).toBe('0');
});
