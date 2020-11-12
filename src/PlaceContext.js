import React, { useRef, useReducer, createContext } from 'react';

const initialPlaces = [
  { id: 1, name: '청년다방 구성점', star: 3 },
  { id: 2, name: '뚱보돈까스 구성점', star: 5 },
  { id: 3, name: '스타벅스 용인구성점', star: 4 },
];

function placeReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.place);
    case 'REMOVE':
      return state.filter((place) => place.id !== action.id);
    default:
      throw new Error('에러가 발생했습니다');
  }
}

const PlaceStateContext = createContext();
const PlaceDispatchContext = createContext();
const PlaceNextIdContext = createContext();
const PlaceStarPointContext = createContext();

export function PlaceProvider({ children }) {
  const [state, dispatch] = useReducer(placeReducer, initialPlaces);
  const nextId = useRef(4);
  return (
    <PlaceStateContext.Provider value={state}>
      <PlaceDispatchContext.Provider value={dispatch}>
        <PlaceNextIdContext.Provider value={nextId}>
          <PlaceStarPointContext.Provider>
            {children}
          </PlaceStarPointContext.Provider>
        </PlaceNextIdContext.Provider>
      </PlaceDispatchContext.Provider>
    </PlaceStateContext.Provider>
  );
}

export {
  PlaceStateContext,
  PlaceDispatchContext,
  PlaceNextIdContext,
  PlaceStarPointContext,
};
