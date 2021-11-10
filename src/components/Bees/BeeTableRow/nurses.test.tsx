/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from '../bees';
import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';

test('clicking plus button increases the number of nurses', () => {
  localStorage.levelHatchery = '3';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedHatchery = '0';

  const beesDOM = render(<Bees />);

  const nursesPlusButton = beesDOM.container.querySelector(
    '#nursesPlusButton'
  ) as TargetElement;
  const nursesNumber = beesDOM.container.querySelector(
    '#nursesAssigned'
  ) as Element;
  const workerNumber = beesDOM.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(nursesNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');

  for (let i = 0; i < 3; i++) {
    userEvent.click(nursesPlusButton);
  }

  expect(nursesNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');
});

test('clicking minus button increases the number of nurses', () => {
  localStorage.levelHatchery = '3';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedHatchery = '3';

  const beesDOM = render(<Bees />);

  const nursesMinusButton = beesDOM.container.querySelector(
    '#nursesMinusButton'
  ) as TargetElement;
  const nursesNumber = beesDOM.container.querySelector(
    '#nursesAssigned'
  ) as Element;
  const workerNumber = beesDOM.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(nursesNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');

  for (let i = 0; i < 3; i++) {
    userEvent.click(nursesMinusButton);
  }

  expect(nursesNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');
});

test('make sure nurses does not go over capacity', () => {
  localStorage.levelHatchery = '3';
  localStorage.idleWorkers = '4';
  localStorage.workersAssignedHatchery = '3';

  const beesDOM = render(<Bees />);
  const nursesPlusButton = beesDOM.container.querySelector(
    '#nursesPlusButton'
  ) as TargetElement;
  const nursesNumber = beesDOM.container.querySelector(
    '#nursesAssigned'
  ) as Element;

  expect(nursesNumber.innerHTML).toBe('3');

  userEvent.click(nursesPlusButton);

  expect(nursesNumber.innerHTML).toBe('3');
});

test('make sure nurses does not go below zero', () => {
  localStorage.levelHatchery = '3';
  localStorage.idleWorkers = '4';
  localStorage.workersAssignedHatchery = '0';

  const beesDOM = render(<Bees />);

  const nursesMinusButton = beesDOM.container.querySelector(
    '#nursesMinusButton'
  ) as TargetElement;
  const nursesNumber = beesDOM.container.querySelector(
    '#nursesAssigned'
  ) as Element;

  expect(nursesNumber.innerHTML).toBe('0');

  userEvent.click(nursesMinusButton);

  expect(nursesNumber.innerHTML).toBe('0');
});

test('make sure nurses does not incrase without workers', () => {
  localStorage.levelHatchery = '4';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedHatchery = '3';

  const beesDOM = render(<Bees />);

  const nursesPlusButton = beesDOM.container.querySelector(
    '#nursesPlusButton'
  ) as TargetElement;
  const nursesNumber = beesDOM.container.querySelector(
    '#nursesAssigned'
  ) as Element;

  expect(nursesNumber.innerHTML).toBe('3');

  userEvent.click(nursesPlusButton);

  expect(nursesNumber.innerHTML).toBe('3');
});
