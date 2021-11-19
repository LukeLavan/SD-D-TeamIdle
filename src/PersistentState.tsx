/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useState, useEffect } from 'react';

/** A wrapper for the useState React hook that checks window.localStorage for a stored value first.
 * @param key The key to check window.localStorage for any stored value
 * @param defaultValue The value to default to if no stored value is found (identical to the normal argument of useState)
 * @returns the same type that useState returns: an array containing the reference to the variable and its mutator function
 */
function usePersistentState<DefaultValueType>(
  key: string,
  defaultValue: DefaultValueType
): [DefaultValueType, React.Dispatch<React.SetStateAction<DefaultValueType>>] {
  // attempt to grab value from localStorage
  const [value, setValue] = useState(() => {
    const PersistentValue = window.localStorage.getItem(key); // TODO: throttle calls?
    if (PersistentValue) {
      let parsed;
      try {
        parsed = JSON.parse(PersistentValue);
      } catch (error) {
        console.log(error);
        return defaultValue;
      }
      return parsed;
    }
    return defaultValue;
  });
  // ensure that local storage is updated to reflect any changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export { usePersistentState };
