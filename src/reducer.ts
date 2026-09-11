import { CHANGE_SEARCHFIELD, FETCH_ROBOTS_FAILURE, FETCH_ROBOTS_REQUEST, FETCH_ROBOTS_SUCCESS } from './constants'
import type { Robot, RobotsAction } from './actions'

interface RobotsState {
  searchField: string
  robots: Robot[]
  isLoading: boolean
  error: string | null
}

const initialState: RobotsState = {
  searchField: '',
  robots: [],
  isLoading: false,
  error: null
}

export const robotsReducer = (state = initialState, action: RobotsAction): RobotsState => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return { ...state, searchField: action.payload }
    case FETCH_ROBOTS_REQUEST:
      return { ...state, isLoading: true, error: null }
    case FETCH_ROBOTS_SUCCESS:
      return { ...state, isLoading: false, robots: action.payload }
    case FETCH_ROBOTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
