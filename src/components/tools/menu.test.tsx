/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import ReactDOM from 'react-dom';
import MenuBar from './menu';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FrontPage from '../FrontPage/FrontPage';
import { pageIds } from '../../constants/constants';

//Input variable defines which page should be currently visible. All others should be invisible
function checkPageVisibility(enabledPage: number) {
  const NUM_OF_PAGES = 6;
  for (let i = 1; i < NUM_OF_PAGES + 1; ++i) {
    const page = document.getElementById(`page${i}`);
    if (page == null) {
      throw new Error('A retrieved page was null');
    }
    if (i == enabledPage) {
      expect(page.style.display).toBe('block');
    } else {
      expect(page.style.display).toBe('none');
    }
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuBar />, div);
});

test('clicking beehive menu tab makes beehive visible', () => {
  const { getByText } = render(<FrontPage />);

  userEvent.click(getByText('Beehive'));
  checkPageVisibility(pageIds.BEEHIVE_ID);
});

test('clicking hatchery menu tab makes hatchery visible', () => {
  const { getByText } = render(<FrontPage />);

  userEvent.click(getByText('Hatchery'));
  checkPageVisibility(pageIds.HATCHERY_ID);
});

/*test('clicking upgrade menu tab makes upgrade visible', () => {
  const { getByText } = render(<FrontPage />);

  userEvent.click(getByText('Upgrade'));
  checkPageVisibility(pageIds.UPGRADE_ID);
});*/

test('clicking tech tree menu tab makes tech tree visible', () => {
  const { getByText } = render(<FrontPage />);

  userEvent.click(getByText('Tech Tree'));
  checkPageVisibility(pageIds.TECH_TREE_ID);
});

/*test('clicking statistics menu tab makes statistics visible', () => {
  const { getByText } = render(<FrontPage />);

  userEvent.click(getByText('Statistics'));
  checkPageVisibility(pageIds.STATISTICS_ID);
});*/

test('clicking settings menu tab makes settings visible', () => {
  const { getByText } = render(<FrontPage />);

  userEvent.click(getByText('Settings'));
  checkPageVisibility(pageIds.SETTINGS_ID);
});
