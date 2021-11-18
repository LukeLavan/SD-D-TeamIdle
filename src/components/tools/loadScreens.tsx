/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const unloadAllPages = () => {
  const NUM_OF_PAGES = 6;
  for (let i = 1; i < NUM_OF_PAGES + 1; i++) {
    const page = document.getElementById(`page${i}`);
    if (page == null) {
      return;
    }
    page.style.display = 'none';
  }
};

function loadPage(num: number): void {
  unloadAllPages();
  const page = document.getElementById(`page${num}`);
  if (page == null) {
    return;
  }
  page.style.display = 'block';
}

export { loadPage };
