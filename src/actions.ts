import {
  CHANGE_SEARCHFIELD,
  FETCH_ROBOTS_FAILURE,
  FETCH_ROBOTS_REQUEST,
  FETCH_ROBOTS_SUCCESS
} from './constants'
import type { AppDispatch } from './store'

export interface Robot {
  id: number
  name: string
  email: string
}

export const setSearchField = (text: string) => ({
  type: CHANGE_SEARCHFIELD,
  payload: text
} as const)

const fetchRobotsRequest = () => ({ type: FETCH_ROBOTS_REQUEST } as const)
const fetchRobotsSuccess = (robots: Robot[]) => ({ type: FETCH_ROBOTS_SUCCESS, payload: robots } as const)
const fetchRobotsFailure = (error: string) => ({ type: FETCH_ROBOTS_FAILURE, payload: error } as const)

// Thunk: an action creator that returns a function instead of a plain
// object. The thunk middleware (built into RTK's default middleware)
// intercepts it and calls that function with `dispatch`, letting us
// dispatch multiple actions over time around an async operation.
export const fetchRobots = () => (dispatch: AppDispatch) => {
  dispatch(fetchRobotsRequest())
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((resp) => resp.json())
    .then((data: Robot[]) => {
      dispatch(fetchRobotsSuccess(data))
    })
    .catch((err) => {
      dispatch(fetchRobotsFailure(err.message))
    })
}

export type ChangeSearchFieldAction = ReturnType<typeof setSearchField>
export type FetchRobotsRequestAction = ReturnType<typeof fetchRobotsRequest>
export type FetchRobotsSuccessAction = ReturnType<typeof fetchRobotsSuccess>
export type FetchRobotsFailureAction = ReturnType<typeof fetchRobotsFailure>
export type RobotsAction =
  | ChangeSearchFieldAction
  | FetchRobotsRequestAction
  | FetchRobotsSuccessAction
  | FetchRobotsFailureAction
