/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from '../bees';
import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';

test('clicking plus button increases the number of scientists', () => {
  localStorage.levelLibrary = '3';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedLibrary = '0';

  const beesDOM = render(<Bees />);

  const scientistsPlusButton = beesDOM.container.querySelector(
    '#scientistsPlusButton'
  ) as TargetElement;
  const scientistsNumber = beesDOM.container.querySelector(
    '#scientistsAssigned'
  ) as Element;
  const workerNumber = beesDOM.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(scientistsNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');

  for (let i = 0; i < 3; i++) {
    userEvent.click(scientistsPlusButton);
  }

  expect(scientistsNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');
});

test('clicking minus button increases the number of scientists', () => {
  localStorage.levelLibrary = '3';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedLibrary = '3';

  const beesDOM = render(<Bees />);

  const scientistsMinusButton = beesDOM.container.querySelector(
    '#scientistsMinusButton'
  ) as TargetElement;
  const scientistsNumber = beesDOM.container.querySelector(
    '#scientistsAssigned'
  ) as Element;
  const workerNumber = beesDOM.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(scientistsNumber.innerHTML).toBe('3');
  expect(workerNumber.innerHTML).toBe('0');

  for (let i = 0; i < 3; i++) {
    userEvent.click(scientistsMinusButton);
  }

  expect(scientistsNumber.innerHTML).toBe('0');
  expect(workerNumber.innerHTML).toBe('3');
});

test('make sure scientists does not go over capacity', () => {
  localStorage.levelLibrary = '3';
  localStorage.idleWorkers = '4';
  localStorage.workersAssignedLibrary = '3';

  const beesDOM = render(<Bees />);
  const scientistsPlusButton = beesDOM.container.querySelector(
    '#scientistsPlusButton'
  ) as TargetElement;
  const scientistsNumber = beesDOM.container.querySelector(
    '#scientistsAssigned'
  ) as Element;

  expect(scientistsNumber.innerHTML).toBe('3');

  userEvent.click(scientistsPlusButton);

  expect(scientistsNumber.innerHTML).toBe('3');
});

test('make sure scientists does not go below zero', () => {
  localStorage.levelLibrary = '3';
  localStorage.idleWorkers = '4';
  localStorage.workersAssignedLibrary = '0';

  const beesDOM = render(<Bees />);

  const scientistsMinusButton = beesDOM.container.querySelector(
    '#scientistsMinusButton'
  ) as TargetElement;
  const scientistsNumber = beesDOM.container.querySelector(
    '#scientistsAssigned'
  ) as Element;

  expect(scientistsNumber.innerHTML).toBe('0');

  userEvent.click(scientistsMinusButton);

  expect(scientistsNumber.innerHTML).toBe('0');
});

test('make sure scientists does not incrase without workers', () => {
  localStorage.levelLibrary = '4';
  localStorage.idleWorkers = '0';
  localStorage.workersAssignedLibrary = '3';

  const beesDOM = render(<Bees />);

  const scientistsPlusButton = beesDOM.container.querySelector(
    '#scientistsPlusButton'
  ) as TargetElement;
  const scientistsNumber = beesDOM.container.querySelector(
    '#scientistsAssigned'
  ) as Element;

  expect(scientistsNumber.innerHTML).toBe('3');

  userEvent.click(scientistsPlusButton);

  expect(scientistsNumber.innerHTML).toBe('3');
});
