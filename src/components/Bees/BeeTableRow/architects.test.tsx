/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from '../bees';
import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';

test('clicking plus button increases the number of architects', () => {
  localStorage.levelFactory = '3';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedFactory = '0';

  const beesDOM = render(<Bees />);

  const architectsPlusButton = beesDOM.container.querySelector(
    '#architectsPlusButton'
  ) as TargetElement;
  const architectsNumber = beesDOM.container.querySelector(
    '#architectsAssigned'
  ) as Element;
  const workerNumber = beesDOM.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(architectsNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');

  for (let i = 0; i < 3; i++) {
    userEvent.click(architectsPlusButton);
  }

  expect(architectsNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');
});

test('clicking minus button decreases the number of architects', () => {
  localStorage.levelFactory = '3';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedFactory = '3';

  const beesDOM = render(<Bees />);

  const architectsMinusButton = beesDOM.container.querySelector(
    '#architectsMinusButton'
  ) as TargetElement;
  const architectsNumber = beesDOM.container.querySelector(
    '#architectsAssigned'
  ) as Element;
  const workerNumber = beesDOM.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(architectsNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');

  for (let i = 0; i < 3; i++) {
    userEvent.click(architectsMinusButton);
  }

  expect(architectsNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');
});

test('make sure architects does not go above capacity', () => {
  localStorage.levelFactory = '3';
  localStorage.idleWorkers = '1';
  localStorage.workersAssignedFactory = '3';

  const beesDOM = render(<Bees />);

  const architectsPlusButton = beesDOM.container.querySelector(
    '#architectsPlusButton'
  ) as TargetElement;
  const architectsNumber = beesDOM.container.querySelector(
    '#architectsAssigned'
  ) as Element;

  expect(architectsNumber.innerHTML).toBe('3');

  userEvent.click(architectsPlusButton);

  expect(architectsNumber.innerHTML).toBe('3');
});

test('make sure architects does not go below zero', () => {
  localStorage.levelFactory = '3';
  localStorage.idleWorkers = '1';
  localStorage.workersAssignedFactory = '0';

  const beesDOM = render(<Bees />);

  const architectsMinusButton = beesDOM.container.querySelector(
    '#architectsMinusButton'
  ) as TargetElement;
  const architectsNumber = beesDOM.container.querySelector(
    '#architectsAssigned'
  ) as Element;

  expect(architectsNumber.innerHTML).toBe('0');

  userEvent.click(architectsMinusButton);

  expect(architectsNumber.innerHTML).toBe('0');
});

test('make sure you cannot gain architects without workers', () => {
  localStorage.levelFactory = '4';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedFactory = '3';

  const beesDOM = render(<Bees />);

  const architectsPlusButton = beesDOM.container.querySelector(
    '#architectsPlusButton'
  ) as TargetElement;
  const architectsNumber = beesDOM.container.querySelector(
    '#architectsAssigned'
  ) as Element;

  expect(architectsNumber.innerHTML).toBe('3');

  userEvent.click(architectsPlusButton);

  expect(architectsNumber.innerHTML).toBe('3');
});
