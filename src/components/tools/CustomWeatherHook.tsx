/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { variableDefaults } from '../../constants/constants';

const CustomWeatherHook = (): {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  nectarBonus: number;
  setNectarBonus: React.Dispatch<React.SetStateAction<number>>;
  thunder: boolean;
  setThunder: React.Dispatch<React.SetStateAction<boolean>>;
  royalJellyBonus: number;
  setRoyalJellyBonus: React.Dispatch<React.SetStateAction<number>>;
  weather: string;
  setWeather: React.Dispatch<React.SetStateAction<string>>;
  season: string;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
} => {
  const [month, setMonth] = usePersistentState(
    'weatherMonth',
    variableDefaults.weather.month
  );
  const [day, setDay] = usePersistentState(
    'weatherDay',
    variableDefaults.weather.day
  );
  const [counter, setCounter] = usePersistentState(
    'weatherCounter',
    variableDefaults.weather.counter
  );

  const [nectarBonus, setNectarBonus] = usePersistentState(
    'weatherNectarBonus',
    variableDefaults.weather.nectarBonus
  );

  const [thunder, setThunder] = usePersistentState(
    'weatherThunder',
    variableDefaults.weather.thunder
  );

  const [royalJellyBonus, setRoyalJellyBonus] = usePersistentState(
    'weatherRoyalJellyBonus',
    variableDefaults.weather.royalJellyBonus
  );

  const [weather, setWeather] = usePersistentState(
    'weatherWeather',
    variableDefaults.weather.weather
  );

  const [season, setSeason] = usePersistentState(
    'weatherSeason',
    variableDefaults.weather.season
  );

  return {
    month,
    setMonth,
    day,
    setDay,
    counter,
    setCounter,
    nectarBonus,
    setNectarBonus,
    thunder,
    setThunder,
    royalJellyBonus,
    setRoyalJellyBonus,
    weather,
    setWeather,
    season,
    setSeason
  };
};

export default CustomWeatherHook;
