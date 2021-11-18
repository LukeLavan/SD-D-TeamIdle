/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { variableDefaults } from '../../../constants/constants';
import Settings from './Settings';

it('renders without crashing', () => {
  const div = render(<Settings />);
  expect(div);
});

it('has a working reset button', () => {
  const div = render(<Settings />);

  // make sure we have everything we need
  const reset = div.container.querySelector('#reset') as TargetElement;
  expect(reset).toBeInTheDocument();

  // try a single click
  userEvent.click(reset);

  expect(localStorage.bees).toBe(variableDefaults.bees.toString());
  expect(localStorage.drones).toBe(variableDefaults.drones.toString());
  expect(localStorage.idleWorkers).toBe(
    variableDefaults.idleWorkers.toString()
  );
  expect(localStorage.workersAssignedDanceFloor).toBe(
    variableDefaults.assignedWorkers.DanceFloor.toString()
  );
  expect(localStorage.workersAssignedRefinery).toBe(
    variableDefaults.assignedWorkers.Refinery.toString()
  );
  expect(localStorage.workersAssignedHatchery).toBe(
    variableDefaults.assignedWorkers.Hatchery.toString()
  );
  expect(localStorage.workersAssignedFactory).toBe(
    variableDefaults.assignedWorkers.Factory.toString()
  );
  expect(localStorage.honey).toBe(variableDefaults.honey.toString());
  expect(localStorage.honeycomb).toBe(variableDefaults.honeycomb.toString());
  expect(localStorage.nectar).toBe(variableDefaults.nectar.toString());
  expect(localStorage.royalJelly).toBe(variableDefaults.royalJelly.toString());
  expect(localStorage.maxHoney).toBe(
    variableDefaults.capacities.honey.toString()
  );
  expect(localStorage.maxHoneycomb).toBe(
    variableDefaults.capacities.honeycomb.toString()
  );
  expect(localStorage.maxNectar).toBe(
    variableDefaults.capacities.nectar.toString()
  );
  expect(localStorage.maxRoyalJelly).toBe(
    variableDefaults.capacities.royalJelly.toString()
  );
  expect(localStorage.levelDanceFloor).toBe(
    variableDefaults.structureLevels.DanceFloor.toString()
  );
  expect(localStorage.costNextLevelDanceFloor).toBe(
    variableDefaults.structureCosts.DanceFloor.toString()
  );
  expect(localStorage.levelFactory).toBe(
    variableDefaults.structureLevels.Factory.toString()
  );
  expect(localStorage.costNextLevelFactory).toBe(
    variableDefaults.structureCosts.Factory.toString()
  );
  expect(localStorage.levelHatchery).toBe(
    variableDefaults.structureLevels.Hatchery.toString()
  );
  expect(localStorage.costNextLevelHatchery).toBe(
    variableDefaults.structureCosts.Hatchery.toString()
  );
  expect(localStorage.levelHomes).toBe(
    variableDefaults.structureLevels.Homes.toString()
  );
  expect(localStorage.costNextLevelHomes).toBe(
    variableDefaults.structureCosts.Homes.toString()
  );
  expect(localStorage.levelLibrary).toBe(
    variableDefaults.structureLevels.Library.toString()
  );
  expect(localStorage.costNextLevelLibrary).toBe(
    variableDefaults.structureCosts.Library.toString()
  );
  expect(localStorage.levelRefinery).toBe(
    variableDefaults.structureLevels.Refinery.toString()
  );
  expect(localStorage.costNextLevelRefinery).toBe(
    variableDefaults.structureCosts.Refinery.toString()
  );
  expect(localStorage.levelStorage).toBe(
    variableDefaults.structureLevels.Storage.toString()
  );
  expect(localStorage.costNextLevelStorage).toBe(
    variableDefaults.structureCosts.Storage.toString()
  );
});
