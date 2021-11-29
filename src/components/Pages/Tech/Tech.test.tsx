/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import FrontPage from '../../FrontPage/FrontPage';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  staticConstants,
  variableDefaults
} from '../../../constants/constants';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('increments researchProgress linearly with researcher bees', () => {
  localStorage.levelLibrary = '2';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedLibrary = '1';

  const frontPageDom = render(<FrontPage />);

  userEvent.click(frontPageDom.getByText('Tech Tree'));
  userEvent.click(frontPageDom.getByText('research nectar efficiency 1!'));
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(localStorage.researchProgress).toBe((4 * 1).toString());

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('honey1Multiplier is set when researchProgress hits max for honey1', () => {
  localStorage.levelLibrary = '2';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedLibrary = '1';

  const frontPageDom = render(<FrontPage />);

  userEvent.click(frontPageDom.getByText('Tech Tree'));
  userEvent.click(frontPageDom.getByText('research nectar efficiency 1!'));

  act(() => {
    jest.advanceTimersByTime(1000000);
  });
  expect(localStorage.techHoneyMultiplier).toBe(
    (
      variableDefaults.techHoneyMultiplier + staticConstants.TECH_VALUE.honey1
    ).toString()
  );

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('honey2ResearchButton is unlocked when honey1 is finished researching', () => {
  localStorage.levelLibrary = '2';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedLibrary = '1';

  const frontPageDom = render(<FrontPage />);

  userEvent.click(frontPageDom.getByText('Tech Tree'));
  userEvent.click(frontPageDom.getByText('research nectar efficiency 1!'));

  userEvent.click(frontPageDom.getByText('research nectar efficiency 2!'));
  expect(localStorage.currentResearch).toBe('"honey1"');

  act(() => {
    jest.advanceTimersByTime(1000000);
  });

  userEvent.click(frontPageDom.getByText('research nectar efficiency 2!'));
  expect(localStorage.currentResearch).toBe('"honey2"');

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('clicking new research resets research progress back to 0', () => {
  localStorage.levelLibrary = '2';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedLibrary = '1';

  const frontPageDom = render(<FrontPage />);

  userEvent.click(frontPageDom.getByText('Tech Tree'));
  userEvent.click(frontPageDom.getByText('research nectar efficiency 1!'));

  act(() => {
    jest.advanceTimersByTime(1000000);
  });

  userEvent.click(frontPageDom.getByText('research nectar efficiency 2!'));
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  userEvent.click(frontPageDom.getByText('research material efficiency!'));
  expect(localStorage.researchProgress).toBe('0');

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});
