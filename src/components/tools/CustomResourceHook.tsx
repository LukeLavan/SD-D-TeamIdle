/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { variableDefaults } from '../../constants/constants';

const CustomResourceHook = (): {
  honey: number;
  setHoney: React.Dispatch<React.SetStateAction<number>>;
  nectar: number;
  setNectar: React.Dispatch<React.SetStateAction<number>>;
  honeycomb: number;
  setHoneycomb: React.Dispatch<React.SetStateAction<number>>;
  royalJelly: number;
  setRoyalJelly: React.Dispatch<React.SetStateAction<number>>;
  maxHoney: number;
  setMaxHoney: React.Dispatch<React.SetStateAction<number>>;
  maxNectar: number;
  setMaxNectar: React.Dispatch<React.SetStateAction<number>>;
  maxHoneycomb: number;
  setMaxHoneycomb: React.Dispatch<React.SetStateAction<number>>;
  maxRoyalJelly: number;
  setMaxRoyalJelly: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [honey, setHoney] = usePersistentState('honey', variableDefaults.honey);
  const [maxHoney, setMaxHoney] = usePersistentState(
    'maxHoney',
    variableDefaults.capacities.honey
  );

  const [nectar, setNectar] = usePersistentState(
    'nectar',
    variableDefaults.nectar
  );
  const [maxNectar, setMaxNectar] = usePersistentState(
    'maxNectar',
    variableDefaults.capacities.nectar
  );

  const [royalJelly, setRoyalJelly] = usePersistentState(
    'royalJelly',
    variableDefaults.royalJelly
  );
  const [maxRoyalJelly, setMaxRoyalJelly] = usePersistentState(
    'maxRoyalJelly',
    variableDefaults.capacities.royalJelly
  );

  const [honeycomb, setHoneycomb] = usePersistentState(
    'honeycomb',
    variableDefaults.honeycomb
  );
  const [maxHoneycomb, setMaxHoneycomb] = usePersistentState(
    'maxHoneycomb',
    variableDefaults.capacities.honeycomb
  );

  return {
    honey,
    setHoney,
    nectar,
    setNectar,
    honeycomb,
    setHoneycomb,
    royalJelly,
    setRoyalJelly,
    maxNectar,
    setMaxNectar,
    maxHoney,
    setMaxHoney,
    maxHoneycomb,
    setMaxHoneycomb,
    maxRoyalJelly,
    setMaxRoyalJelly
  };
};

export default CustomResourceHook;
