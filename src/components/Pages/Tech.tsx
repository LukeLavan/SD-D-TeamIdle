/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import Button from '../Button/Button';
import CustomTechHook from '../tools/CustomTechHook';
import { variableDefaults, staticConstants } from '../../constants/constants';

import './Tech.css';

export const doneResearch = (
  techData: ReturnType<typeof CustomTechHook>
): void => {
  if (techData.researchProgress >= techData.researchMax) {
    switch (techData.currentResearch) {
      case 'honey1': {
        effectHoney1(techData);
        break;
      }
      case 'honey2': {
        effectHoney2(techData);
        break;
      }
      case 'honey3': {
        effectHoney3(techData);
        break;
      }
      case 'drone': {
        effectDrone(techData);
        break;
      }
      case 'nurse': {
        effectNurse(techData);
        break;
      }
      case 'honeyConversion': {
        effectHoneyConversion(techData);
        break;
      }
      default: {
        break;
      }
    }
    techData.setResearchProgress(variableDefaults.researchProgress);
    techData.setCurrentResearch(variableDefaults.currentResearch);
    techData.setResearchMax(variableDefaults.researchMax);
  }
};

function effectHoney1(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.honey1Enabled) {
    techData.setHoney1(true);
    techData.setTechHoneyMultiplier(
      (oldTechMultiplier: number) =>
        oldTechMultiplier + staticConstants.TECH_VALUE.honey1
    );
  }
}

function effectHoney2(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.honey2Enabled) {
    techData.setHoney2(true);
    techData.setTechHoneyMultiplier(
      (oldTechMultiplier: number) =>
        oldTechMultiplier + staticConstants.TECH_VALUE.honey2
    );
  }
}

function effectHoney3(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.honey3Enabled) {
    techData.setHoney3(true);
    techData.setTechHoneyMultiplier(
      (oldTechMultiplier: number) =>
        oldTechMultiplier + staticConstants.TECH_VALUE.honey3
    );
  }
}

function effectDrone(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.droneEnabled) {
    techData.setDrone(true);
    techData.setTechDroneMultiplier(
      (oldTechMultiplier: number) =>
        oldTechMultiplier + staticConstants.TECH_VALUE.drone
    );
  }
}

function effectNurse(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.nurseEnabled) {
    techData.setNurse(true);
    techData.setTechNurseMultiplier(
      (oldTechMultiplier: number) =>
        oldTechMultiplier + staticConstants.TECH_VALUE.nurse
    );
  }
}

function effectHoneyConversion(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.honeyConversionEnabled) {
    techData.setHoneyConversion(true);
    techData.setTechHoneyConversionReducer(
      (oldTechReducer: number) =>
        oldTechReducer + staticConstants.TECH_VALUE.honeyConversion
    );
  }
}

function Tech(): JSX.Element {
  const techData = useBetween(CustomTechHook);

  const researchHoney1 = () => {
    if (!techData.honey1Enabled) {
      techData.setCurrentResearch('honey1');
      techData.setResearchProgress(variableDefaults.researchProgress);
      techData.setResearchMax(staticConstants.TECH_COST.honey1);
    }
  };

  const researchHoney2 = () => {
    if (techData.honey1Enabled && !techData.honey2Enabled) {
      techData.setCurrentResearch('honey2');
      techData.setResearchProgress(variableDefaults.researchProgress);
      techData.setResearchMax(staticConstants.TECH_COST.honey2);
    }
  };

  const researchHoney3 = () => {
    if (techData.honey2Enabled && !techData.honey3Enabled) {
      techData.setCurrentResearch('honey3');
      techData.setResearchProgress(variableDefaults.researchProgress);
      techData.setResearchMax(staticConstants.TECH_COST.honey3);
    }
  };

  const researchDrone = () => {
    if (techData.honey1Enabled && !techData.droneEnabled) {
      techData.setCurrentResearch('drone');
      techData.setResearchProgress(variableDefaults.researchProgress);
      techData.setResearchMax(staticConstants.TECH_COST.drone);
    }
  };

  const researchNurse = () => {
    if (techData.droneEnabled && !techData.nurseEnabled) {
      techData.setCurrentResearch('nurse');
      techData.setResearchProgress(variableDefaults.researchProgress);
      techData.setResearchMax(staticConstants.TECH_COST.nurse);
    }
  };

  const researchHoneyConversion = () => {
    if (techData.honey2Enabled && !techData.honeyConversionEnabled) {
      techData.setCurrentResearch('honeyConversion');
      techData.setResearchProgress(variableDefaults.researchProgress);
      techData.setResearchMax(staticConstants.TECH_COST.honeyConversion);
    }
  };

  return (
    <div className="wrapper">
      <div className="multipliers">
        nectar multiplier: {techData.techHoneyMultiplier.toFixed(2)}
        <br />
        drone multiplier: {techData.techDroneMultiplier.toFixed(2)}
        <br />
        nurse multiplier: {techData.techNurseMultiplier.toFixed(2)}
        <br />
        honeycomb reducer: {techData.techHoneyConversionReducer.toFixed(2)}
      </div>
      <div className="tracker">
        current research: {techData.currentResearch}
        <br />
        research progress: {techData.researchProgress}
        <br />
        research needed: {techData.researchMax}
      </div>
      <div className="one">
        <br />
        <Button disabled={false} onClick={researchHoney1} color="green">
          research nectar effciency 1!
        </Button>
        effect: increases rate of gathering nectar by a little
        <br />
      </div>
      <div className="two">
        <br />
        <Button
          disabled={!techData.honey1Enabled}
          onClick={researchHoney2}
          color="green"
        >
          research nectar effciency 2!
        </Button>
        effect: increases rate of gathering nectar by a decent amount
        <br />
      </div>
      <div className="three">
        <br />
        <Button
          disabled={!techData.honey2Enabled}
          onClick={researchHoney3}
          color="green"
        >
          research nectar effciency 3!
        </Button>
        effect: increases rate of gathering nectar by a lot
        <br />
      </div>
      <div className="four">
        <br />
        <Button
          disabled={!techData.honey1Enabled}
          onClick={researchDrone}
          color="purple"
        >
          research drone effciency!
        </Button>
        effect: increases rate that drones produce pupae
        <br />
      </div>
      <div className="five">
        <br />
        <Button
          disabled={!techData.droneEnabled}
          onClick={researchNurse}
          color="red"
        >
          research nurse effciency!
        </Button>
        effect: increases rate that nurses secrete royal jelly
        <br />
      </div>
      <div className="six">
        <br />
        <Button
          disabled={!techData.honey2Enabled}
          onClick={researchHoneyConversion}
          color="blue"
        >
          research honey conversion effciency!
        </Button>
        effect: reduces cost to convert honey to honeycombs
        <br />
      </div>
    </div>
  );
}

export default Tech;
