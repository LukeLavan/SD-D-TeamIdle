/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import CustomTechHook from '../../tools/CustomTechHook';
import { useBetween } from 'use-between';

import {
  variableDefaults,
  staticConstants
} from '../../../constants/constants';

import Button from '../../Button/Button';

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

// temporarily changing this
function effectDrone(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.droneEnabled) {
    techData.setDrone(true);
    techData.setTechHoneycombEfficiency(2);
  }
}

function effectNurse(techData: ReturnType<typeof CustomTechHook>) {
  if (!techData.nurseEnabled) {
    techData.setNurse(true);
    techData.setTechRoyalJellyMultiplier(
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

/**
 * Technology page
 */
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
        factory efficiency: {techData.techHoneyConversionReducer.toFixed(2)}
        <br />
        royal jelly multiplier: {techData.techRoyalJellyMultiplier.toFixed(2)}
        <br />
        structure cost reducer: {techData.techDroneMultiplier.toFixed(2)}
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
        <div id="honey1Button">
          <Button disabled={false} onClick={researchHoney1} color="green">
            research nectar efficiency 1!
          </Button>
          effect: increases rate of gathering nectar by a little
        </div>
        <br />
      </div>
      <div className="two">
        <br />
        <div id="honey2Button">
          <Button
            disabled={!techData.honey1Enabled}
            onClick={researchHoney2}
            color="green"
          >
            research nectar efficiency 2!
          </Button>
        </div>
        effect: increases rate of gathering nectar by a decent amount
        <br />
      </div>
      <div className="three">
        <br />
        <div id="honey3Button">
          <Button
            disabled={!techData.honey2Enabled}
            onClick={researchHoney3}
            color="green"
          >
            research nectar efficiency 3!
          </Button>
        </div>
        effect: increases rate of gathering nectar by a lot
        <br />
      </div>
      <div className="four">
        <br />
        <div id="nurseButton">
          <Button
            disabled={!techData.droneEnabled}
            onClick={researchNurse}
            color="red"
          >
            research drone fertility!
          </Button>
        </div>
        effect: increases rate that drones secrete royal jelly
        <br />
      </div>
      <div className="five">
        <br />
        <div id="structureButton">
          <Button
            disabled={!techData.honey1Enabled}
            onClick={researchDrone}
            color="purple"
          >
            research material efficiency!
          </Button>
        </div>
        effect: decreases honeycomb requirements for structures
        <br />
      </div>
      <div className="six">
        <br />
        <div id="honeyConversionButton">
          <Button
            disabled={!techData.honey2Enabled}
            onClick={researchHoneyConversion}
            color="blue"
          >
            research honey conversion effciency!
          </Button>
        </div>
        effect: reduces cost to convert honey to honeycombs
        <br />
      </div>
    </div>
  );
}

export default Tech;
