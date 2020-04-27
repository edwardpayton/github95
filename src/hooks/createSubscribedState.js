import { useState, useRef, useCallback, useEffect, useDebugValue } from "react";

import { mergeObjects } from "../utilities/mergeObjects";

export default function createSubscribedState(initialState) {
  if (
    !initialState ||
    Object.prototype.toString.call(initialState) !== "[object Object]"
  ) {
    return console.error(
      "A new shared state was created without an initial state"
    );
  }

  let state = Object.assign({}, initialState);
  let listeners = new Set();
  const subscribe = (fn) => listeners.add(fn);
  const unsubscribe = (fn) => listeners.delete(fn);
  return function useHook(scope = []) {
    // note:  the name 'useHook' is not needed or used anywhere,
    // but the callback function needs a name because of rules of hooks
    // https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
    const [, set] = useState();
    const refMounted = useRef(true);
    const setState = useCallback((newState, typeSafe) => {
      const disallowedKeys = scope.length
        ? Object.keys(initialState).filter((key) => scope.indexOf(key) <= -1)
        : [];
      const newStateFiltered = Object.keys(newState)
        .map((key) => {
          const s = initialState;
          if (!s.hasOwnProperty(key))
            throw new Error(`key "${key}" is not found on state object`);
          return key;
        })
        .filter((key) => disallowedKeys.indexOf(key) <= -1)
        .reduce((res, key) => {
          // TODO - TS errors without asserting to GenericObject. maybe find a better way
          res[key] = newState[key];
          return res;
        }, {});
      state = mergeObjects(state, newStateFiltered, typeSafe);
      listeners.forEach((fn) => fn(newState));
    }, []);
    useEffect(() => {
      const updaterEv = () => {
        if (refMounted.current) return set({});
      };
      subscribe(updaterEv);
      return () => {
        refMounted.current = false;
        unsubscribe(updaterEv);
      };
    }, []);
    useDebugValue(state);
    return [state, setState];
  };
}
