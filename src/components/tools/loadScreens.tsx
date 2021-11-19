/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const unloadAllPages = () => {
  const NUM_OF_PAGES = 6;
  for (let i = 1; i < NUM_OF_PAGES + 1; i++) {
    const page = document.getElementById(`page${i}`);
    if (!page) continue;
    page.style.display = 'none';
    const link = document.getElementById(`linkPage${i}`);
    if (!link) continue;
    link.className = '';
  }
};

function loadPage(num: number): void {
  unloadAllPages();
  const page = document.getElementById(`page${num}`) as HTMLElement;
  page.style.display = 'block';
  // ensure that the link to the loaded page is designated active
  const link = document.getElementById(`linkPage${num}`) as HTMLElement;
  link.className = 'active';
}

export { loadPage };
