const TYPES = {
  'SET': 'coordinates/SET',
  'CLEAR': 'coordinates/CLEAR'
}

const actions = {
  set: (data) => ({ type: TYPES.SET, data: data}),
  clear: () => ({ type: TYPES.CLEAR }),
}

const INITIAL_STATE = {
  latOrigin: null,
  latDestination: null,
  lngOrigin: null,
  lngDestination: null
}

export default function coordinates(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET:
      return {...state, ...action.data}
    case TYPES.CLEAR:
      return INITIAL_STATE;
      default:
      return state;
  }
}


export { actions };