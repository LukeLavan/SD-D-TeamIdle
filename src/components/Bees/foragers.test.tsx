/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Foragers from './foragers';
import Bees from './bees';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('clicking plus button increases the number of foragers', () => {
  localStorage.levelDanceFloor = '3';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedDanceFloor = '0';

  const foragerDom = render(<Foragers />);
  const foragersPlusButton = foragerDom.container.querySelector(
    '#foragersPlusButton'
  );
  const foragerNumber = foragerDom.container.querySelector(
    '#foragersAssignedDanceFloor'
  );

  const beesDom = render(<Bees />);
  const workerNumber = beesDom.container.querySelector('#numOfWorkers');

  expect(foragerNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');

  for (let i = 0; i < 3; i++) {
    userEvent.click(foragersPlusButton);
  }

  expect(foragerNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');
});

test('clicking minus button decreases the number of foragers', () => {
  localStorage.workersAssignedDanceFloor = '3';
  localStorage.levelDanceFloor = '3';
  localStorage.idleWorkers = '0';

  const foragerDom = render(<Foragers />);
  const foragersMinusButton = foragerDom.container.querySelector(
    '#foragersMinusButton'
  );
  const foragerNumber = foragerDom.container.querySelector(
    '#foragersAssignedDanceFloor'
  );

  const beesDom = render(<Bees />);
  const workerNumber = beesDom.container.querySelector('#numOfWorkers');

  expect(foragerNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');

  for (let i = 0; i < 3; i++) {
    userEvent.click(foragersMinusButton);
  }

  expect(foragerNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');
});

test('make sure the number of foragers stays below the capacity', () => {
  localStorage.workersAssignedDanceFloor = '3';
  localStorage.levelDanceFloor = '3';

  const foragerDom = render(<Foragers />);
  const foragersPlusButton = foragerDom.container.querySelector(
    '#foragersPlusButton'
  );
  const foragerNumber = foragerDom.container.querySelector(
    '#foragersAssignedDanceFloor'
  );

  expect(foragerNumber.innerHTML).toBe('3');
  userEvent.click(foragersPlusButton);
  expect(foragerNumber.innerHTML).toBe('3');
});

test('make sure the number of foragers cannot go below zero', () => {
  localStorage.workersAssignedDanceFloor = '0';

  const foragerDom = render(<Foragers />);
  const foragersMinusButton = foragerDom.container.querySelector(
    '#foragersMinusButton'
  );
  const foragerNumber = foragerDom.container.querySelector(
    '#foragersAssignedDanceFloor'
  );

  expect(foragerNumber.innerHTML).toBe('0');
  userEvent.click(foragersMinusButton);
  expect(foragerNumber.innerHTML).toBe('0');
});

test('make sure that there must be workers to get foragers', () => {
  localStorage.workersAssignedDanceFloor = '1';
  localStorage.idleWorkers = '0';
  const foragerDom = render(<Foragers />);
  const foragersPlusButton = foragerDom.container.querySelector(
    '#foragersPlusButton'
  );
  const foragerNumber = foragerDom.container.querySelector(
    '#foragersAssignedDanceFloor'
  );

  expect(foragerNumber.innerHTML).toBe('1');
  userEvent.click(foragersPlusButton);
  expect(foragerNumber.innerHTML).toBe('1');
});
