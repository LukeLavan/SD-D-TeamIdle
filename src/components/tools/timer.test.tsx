/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import FrontPage from '../FrontPage/FrontPage';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { staticConstants, variableDefaults } from '../../constants/constants';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('increments nectar linearly with dance floor bees', () => {
  localStorage.workersAssignedRefinery = '0';
  localStorage.levelDanceFloor = '2';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedDanceFloor = '1';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(localStorage.nectar).toBe(
    (3 * staticConstants.NECTAR_BY_BEE).toString()
  );

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('never increments nectar past the current capacity', () => {
  localStorage.workersAssignedRefinery = '0';
  localStorage.levelDanceFloor = '2';
  localStorage.idleWorkers = '3';
  localStorage.workersAssignedDanceFloor = '2';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(localStorage.nectar).toBe(
    variableDefaults.capacities.nectar.toString()
  );

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('increments honey linearly with dance floor bees', () => {
  localStorage.levelRefinery = '2';
  localStorage.workersAssignedRefinery = '2';
  localStorage.levelDanceFloor = '2';
  localStorage.workersAssignedDanceFloor = '2';
  localStorage.weatherWeather = '"CLOUDY"';
  localStorage.weatherMonth = '-1';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  //expect(localStorage.weatherWeather).toBe('CLOUDY');
  expect(localStorage.nectar).toBe(
    (
      3 * 2 * staticConstants.NECTAR_BY_BEE -
      staticConstants.NECTAR_TO_HONEY_COST * 3
    ).toString()
  );
  expect(localStorage.honey).toBe('3');

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('never increments honey past the current capacity', () => {
  localStorage.levelRefinery = '2';
  localStorage.workersAssignedRefinery = '2';
  localStorage.levelDanceFloor = '2';
  localStorage.idleWorkers = '4';
  localStorage.workersAssignedDanceFloor = '2';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(30000);
  });
  expect(localStorage.nectar).toBe(
    variableDefaults.capacities.nectar.toString()
  );
  expect(localStorage.honey).toBe(variableDefaults.capacities.honey.toString());

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('never increments honey if there is no nectar', () => {
  localStorage.levelRefinery = '2';
  localStorage.workersAssignedRefinery = '2';
  localStorage.levelDanceFloor = '0';
  localStorage.idleWorkers = '2';
  localStorage.workersAssignedDanceFloor = '0';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(localStorage.nectar).toBe('0');
  expect(localStorage.honey).toBe('0');

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('increments honeycombs linearly with factory bees', () => {
  localStorage.workersAssignedRefinery = '0';
  localStorage.levelFactory = '2';
  localStorage.workersAssignedFactory = '2';
  localStorage.honey = '10';
  localStorage.idleWorkers = '3';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(localStorage.honeycomb).toBe('2');
  expect(localStorage.honey).toBe('0');

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('never increments honeycombs past the current capacity', () => {
  localStorage.levelRefinery = '2';
  localStorage.workersAssignedRefinery = '2';
  localStorage.levelDanceFloor = '2';
  localStorage.workersAssignedDanceFloor = '2';
  localStorage.levelFactory = '2';
  localStorage.workersAssignedFactory = '2';
  localStorage.idleWorkers = '6';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(50000);
  });
  expect(localStorage.nectar).toBe(
    variableDefaults.capacities.nectar.toString()
  );
  expect(localStorage.honey).toBe(variableDefaults.capacities.honey.toString());
  expect(localStorage.honeycomb).toBe(
    variableDefaults.capacities.honeycomb.toString()
  );

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('never increments honeycombs if there is no honey', () => {
  localStorage.workersAssignedDanceFloor = '0';
  localStorage.workersAssignedRefinery = '0';
  localStorage.levelFactory = '2';
  localStorage.workersAssignedFactory = '2';
  localStorage.honey = '0';
  localStorage.idleWorkers = '3';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(localStorage.honey).toBe('0');
  expect(localStorage.honeycomb).toBe('0');

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('increments royal jelly linearly with drones', () => {
  localStorage.royaljelly = '0';
  localStorage.drones = '1';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(localStorage.royalJelly).toBe(
    (3 * staticConstants.ROYAL_JELLY_BY_BEE).toString()
  );

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('never increments royal jelly beyond the capacity', () => {
  localStorage.drones = '20';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(localStorage.royalJelly).toBe(
    variableDefaults.capacities.royalJelly.toString()
  );

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});

it('increments pupae linearly with drones', () => {
  localStorage.workersAssignedRefinery = '0';
  localStorage.levelHomes = '3';
  localStorage.drones = '3';

  const frontPageDom = render(<FrontPage />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });

  userEvent.click(frontPageDom.getByText('Settings'));
  userEvent.click(frontPageDom.getByText('reset'));
});
