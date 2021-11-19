/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import CustomWeatherHook from '../tools/CustomWeatherHook';
import { useBetween } from 'use-between';
import './weather.css';

const SECONDS_PER_DAY = 10;
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_SEASONS = [
  'winter',
  'winter',
  'spring',
  'spring',
  'spring',
  'summer',
  'summer',
  'summer',
  'autumn',
  'autumn',
  'autumn',
  'winter'
];

const SEASONS: Record<string, Array<Array<string>>> = {
  winter: [
    ['0.25', 'WIND'],
    ['0.5', 'CLOUDY'],
    ['1.0', 'SNOW']
  ],
  spring: [
    ['0.05', 'THUNDER'],
    ['0.3', 'RAIN'],
    ['0.65', 'SUNSHINE'],
    ['1.0', 'CLOUDY']
  ],
  summer: [
    ['0.25', 'CLOUDY'],
    ['1.0', 'SUNSHINE']
  ],
  autumn: [
    ['0.05', 'THUNDER'],
    ['0.3', 'RAIN'],
    ['0.45', 'SUNSHINE'],
    ['1.0', 'CLOUDY']
  ]
};

/** if month is -1, always return 'CLOUDY'. useful for ensuring lack of weather effect for tests */
const chooseTheWeather = (month: number) => {
  if (month === -1) return 'CLOUDY';
  const PROB = 0;
  const SELECTION = 1;
  const randomNumber = Math.random();
  const season = SEASONS[MONTH_SEASONS[month]];
  for (let i = 0; i < season.length; i++) {
    if (randomNumber < Number(season[i][PROB])) {
      return season[i][SELECTION];
    }
  }
  return 'CLOUDY';
};

const applyWeatherBonus = (
  weatherData: ReturnType<typeof CustomWeatherHook>,
  weather: string
): void => {
  weatherData.setNectarBonus(1);
  weatherData.setThunder(false);
  weatherData.setRoyalJellyBonus(1);
  if (weather === 'WIND') {
    return;
  } else if (weather === 'SUNSHINE') {
    weatherData.setNectarBonus(1.5);
  } else if (weather === 'SNOW') {
    weatherData.setNectarBonus(0.8);
  } else if (weather === 'RAIN') {
    weatherData.setRoyalJellyBonus(1.2);
  } else if (weather === 'THUNDER') {
    weatherData.setThunder(true);
  }
};

const changeTheWeather = (
  weatherData: ReturnType<typeof CustomWeatherHook>
): void => {
  const weather = chooseTheWeather(weatherData.month);
  weatherData.setWeather(weather);
  if (weatherData.month != -1)
    weatherData.setSeason(MONTH_SEASONS[weatherData.month]);
  applyWeatherBonus(weatherData, weather);
};

/** if month is currently -1, prevent incrementing month. useful for ensuring lack of weather effects during tests */
const addMonth = (weatherData: ReturnType<typeof CustomWeatherHook>): void => {
  if (weatherData.month === -1) return;
  weatherData.setMonth((previousMonth) => previousMonth + 1);
  if (weatherData.month >= 11) {
    weatherData.setMonth(0);
  }
};

const addDay = (weatherData: ReturnType<typeof CustomWeatherHook>): void => {
  weatherData.setDay((previousDay) => previousDay + 1);
  if (weatherData.month === -1) return;
  if (weatherData.day >= MONTH_DAYS[weatherData.month]) {
    weatherData.setDay(1);
    addMonth(weatherData);
  }
  changeTheWeather(weatherData);
};

export const processWeatherTick = (
  weatherData: ReturnType<typeof CustomWeatherHook>
): void => {
  weatherData.setCounter((previousCounter) => previousCounter + 1);
  if (weatherData.counter >= SECONDS_PER_DAY) {
    weatherData.setCounter(0);
    addDay(weatherData);
  }
};

const getWeatherImage = (season: string) => {
  switch (season) {
    case 'autumn':
      return '/img/seasons/autumn.png';
    case 'summer':
      return '/img/seasons/summer.png';
    case 'winter':
      return '/img/seasons/winter.png';
    case 'spring':
      return '/img/seasons/spring.png';
  }
};

function Weather(): JSX.Element {
  const { month, day, weather, season } = useBetween(CustomWeatherHook);
  return (
    <div>
      <div id="monthAndDate">
        {month != -1 ? MONTH_NAMES[month] : false} {day}
      </div>
      <div id="season">
        <img
          src={process.env.PUBLIC_URL + getWeatherImage(season)}
          width="100"
          height="100"
          alt="season icon"
        ></img>
      </div>
      <div id="weather">{weather.toLowerCase()}</div>
    </div>
  );
}

export default Weather;
