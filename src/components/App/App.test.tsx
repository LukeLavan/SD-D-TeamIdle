/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import ReactDOM from 'react-dom';
import App from './App';
import {
  Matcher,
  render,
  SelectorMatcherOptions
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { staticConstants } from '../../constants/constants';

jest.useFakeTimers();

//Automates the gathering of resources for testing by clicking the buttons
//This function doesn't look at the actual cost for each resource, so set input variables accordingly
function gatherResources(
  nectarAmount: number,
  honeyAmount: number,
  honeycombAmount: number,
  getByText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement
) {
  for (let i = 0; i < nectarAmount; i++) {
    userEvent.click(getByText('buzz buzz buzz'));
  }
  for (let i = 0; i < honeyAmount; i++) {
    userEvent.click(getByText('refine that nectar!'));
  }
  for (let i = 0; i < honeycombAmount; i++) {
    userEvent.click(getByText('make some honeycombs!'));
  }
}

function checkInitialValues(
  getByText: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement
) {
  expect(getByText(/nectar: /i)).toHaveTextContent('nectar: 0');

  expect(getByText(/honey: /i)).toHaveTextContent('honey: 0');
  expect(getByText(/cost of honey: /i)).toHaveTextContent(
    'cost of honey: ' + staticConstants.NECTAR_TO_HONEY_COST + ' nectar'
  );

  expect(getByText(/bees: /i)).toHaveTextContent('bees: 0');
  expect(getByText(/cost of next bee: /i)).toHaveTextContent(
    'cost of next bee: 1 honey, 0.00 royal jelly'
  );
  expect(getByText(/royal jelly: /i)).toHaveTextContent('royal jelly: 0.00');

  expect(getByText(/honeycombs: /i)).toHaveTextContent('honeycombs: 0');
  expect(getByText(/cost of honeycombs: /i)).toHaveTextContent(
    'cost of honeycombs: 5 honey'
  );
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('clicking nectar button harvests nectar', () => {
  const { getByText } = render(<App />);
  checkInitialValues(getByText);
  userEvent.click(getByText('buzz buzz buzz'));
  expect(getByText(/nectar:/i)).toHaveTextContent('nectar: 1');

  userEvent.click(getByText('reset'));
});

test('clicking honey button refines nectar to honey', () => {
  const { getByText } = render(<App />);
  checkInitialValues(getByText);

  gatherResources(5, 1, 0, getByText);

  expect(getByText(/nectar: /i)).toHaveTextContent('nectar: 0');
  expect(getByText(/honey: /i)).toHaveTextContent('honey: 1');

  userEvent.click(getByText('reset'));
});

test('clicking honeycomb button converts honey to honeycombs', () => {
  const { getByText } = render(<App />);
  checkInitialValues(getByText);

  gatherResources(25, 5, 1, getByText);

  expect(getByText(/nectar: /i)).toHaveTextContent('nectar: 0');
  expect(getByText(/honey: /i)).toHaveTextContent('honey: 0');
  expect(getByText(/honeycombs: /i)).toHaveTextContent('honeycombs: 1');

  userEvent.click(getByText('reset'));
});

test('clicking bee button makes a bee from honey and royal jelly', () => {
  const { getByText } = render(<App />);
  checkInitialValues(getByText);

  gatherResources(5, 1, 0, getByText);
  userEvent.click(getByText('gain a bee!'));

  expect(getByText(/nectar: /i)).toHaveTextContent('nectar: 0');
  expect(getByText(/honey: /i)).toHaveTextContent('honey: 0');
  expect(getByText(/bees: /i)).toHaveTextContent('bees: 1');
  expect(getByText(/cost of next bee: /i)).toHaveTextContent(
    'cost of next bee: 4 honey, 0.30 royal jelly'
  );

  userEvent.click(getByText('reset'));
});

test('One bee automatically harvests nectar and royal jelly', () => {
  const { getByText } = render(<App />);
  checkInitialValues(getByText);

  gatherResources(5, 1, 0, getByText);
  userEvent.click(getByText('gain a bee!'));

  setTimeout(() => {
    expect(getByText(/nectar: /i)).toHaveTextContent(
      'nectar: ' + staticConstants.NECTAR_BY_BEE
    );
    expect(getByText(/royal jelly: /i)).toHaveTextContent(
      'royal jelly: ' + staticConstants.ROYAL_JELLY_BY_BEE
    );
  }, 1000);

  setTimeout(() => {
    expect(getByText(/nectar: /i)).toHaveTextContent(
      'nectar: ' + staticConstants.NECTAR_BY_BEE * 2
    );
    expect(getByText(/royal jelly: /i)).toHaveTextContent(
      'royal jelly: ' + staticConstants.ROYAL_JELLY_BY_BEE * 2
    );
  }, 1000);

  userEvent.click(getByText('reset'));
});

test('Multiple bees automatically harvest nectar and royal jelly', () => {
  const { getByText } = render(<App />);
  checkInitialValues(getByText);

  gatherResources(25, 5, 0, getByText);
  userEvent.click(getByText('gain a bee!'));
  userEvent.click(getByText('gain a bee!'));

  setTimeout(() => {
    expect(getByText(/nectar: /i)).toHaveTextContent(
      'nectar: ' + staticConstants.NECTAR_BY_BEE * 14
    );
    expect(getByText(/royal jelly: /i)).toHaveTextContent(
      'royal jelly: ' + staticConstants.ROYAL_JELLY_BY_BEE * 14
    );
  }, 7000);

  userEvent.click(getByText('reset'));
});
