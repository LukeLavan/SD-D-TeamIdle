/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { variableDefaults } from '../../constants/constants';
import { usePersistentState } from '../../PersistentState';

const CustomTechHook = (): {
  honey1Enabled: boolean;
  setHoney1: React.Dispatch<React.SetStateAction<boolean>>;
  honey2Enabled: boolean;
  setHoney2: React.Dispatch<React.SetStateAction<boolean>>;
  honey3Enabled: boolean;
  setHoney3: React.Dispatch<React.SetStateAction<boolean>>;
  droneEnabled: boolean;
  setDrone: React.Dispatch<React.SetStateAction<boolean>>;
  nurseEnabled: boolean;
  setNurse: React.Dispatch<React.SetStateAction<boolean>>;
  honeyConversionEnabled: boolean;
  setHoneyConversion: React.Dispatch<React.SetStateAction<boolean>>;
  currentResearch: string;
  setCurrentResearch: React.Dispatch<React.SetStateAction<string>>;
  researchProgress: number;
  setResearchProgress: React.Dispatch<React.SetStateAction<number>>;
  researchMax: number;
  setResearchMax: React.Dispatch<React.SetStateAction<number>>;
  techHoneyMultiplier: number;
  setTechHoneyMultiplier: React.Dispatch<React.SetStateAction<number>>;
  techDroneMultiplier: number;
  setTechDroneMultiplier: React.Dispatch<React.SetStateAction<number>>;
  techRoyalJellyMultiplier: number;
  setTechRoyalJellyMultiplier: React.Dispatch<React.SetStateAction<number>>;
  techHoneyConversionReducer: number;
  setTechHoneyConversionReducer: React.Dispatch<React.SetStateAction<number>>;
  techHoneycombEfficiency: number;
  setTechHoneycombEfficiency: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [honey1Enabled, setHoney1] = usePersistentState(
    'honey1Enabled',
    variableDefaults.techEnabled.honey1
  );
  const [honey2Enabled, setHoney2] = usePersistentState(
    'honey2Enabled',
    variableDefaults.techEnabled.honey2
  );
  const [honey3Enabled, setHoney3] = usePersistentState(
    'honey3Enabled',
    variableDefaults.techEnabled.honey3
  );
  const [droneEnabled, setDrone] = usePersistentState(
    'droneEnabled',
    variableDefaults.techEnabled.drone
  );
  const [nurseEnabled, setNurse] = usePersistentState(
    'nurseEnabled',
    variableDefaults.techEnabled.nurse
  );
  const [honeyConversionEnabled, setHoneyConversion] = usePersistentState(
    'honeyConversionEnabled',
    variableDefaults.techEnabled.honeyConversion
  );
  const [currentResearch, setCurrentResearch] = usePersistentState(
    'currentResearch',
    variableDefaults.currentResearch
  );
  const [researchProgress, setResearchProgress] = usePersistentState(
    'researchProgress',
    variableDefaults.researchProgress
  );
  const [researchMax, setResearchMax] = usePersistentState(
    'researchMax',
    variableDefaults.researchMax
  );
  const [techHoneyMultiplier, setTechHoneyMultiplier] = usePersistentState(
    'techHoneyMultiplier',
    variableDefaults.techHoneyMultiplier
  );
  const [techDroneMultiplier, setTechDroneMultiplier] = usePersistentState(
    'techDroneMultiplier',
    variableDefaults.techDroneMultiplier
  );
  const [techRoyalJellyMultiplier, setTechRoyalJellyMultiplier] =
    usePersistentState(
      'techRoyalJellyMultiplier',
      variableDefaults.techRoyalJellyMultiplier
    );
  const [techHoneyConversionReducer, setTechHoneyConversionReducer] =
    usePersistentState(
      'techHoneyConversionReducer',
      variableDefaults.techHoneyConversionReducer
    );
  const [techHoneycombEfficiency, setTechHoneycombEfficiency] =
    usePersistentState('techHoneycombEfficiency', 1);

  return {
    honey1Enabled,
    setHoney1,
    honey2Enabled,
    setHoney2,
    honey3Enabled,
    setHoney3,
    droneEnabled,
    setDrone,
    nurseEnabled,
    setNurse,
    honeyConversionEnabled,
    setHoneyConversion,
    currentResearch,
    setCurrentResearch,
    researchProgress,
    setResearchProgress,
    researchMax,
    setResearchMax,
    techHoneyMultiplier,
    setTechHoneyMultiplier,
    techDroneMultiplier,
    setTechDroneMultiplier,
    techRoyalJellyMultiplier,
    setTechRoyalJellyMultiplier,
    techHoneyConversionReducer,
    setTechHoneyConversionReducer,
    techHoneycombEfficiency,
    setTechHoneycombEfficiency
  };
};

export default CustomTechHook;
