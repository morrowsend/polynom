import * as ActionTypes from "../constants/ActionTypes"

const initialState = {
  0: {
    id: 0,
    name: "Untitled",
    createdAt: new Date(),
    updatedAt: new Date(),
    width: 1000,
    height: 800,
    paths: [0],
  },
}

const project = (state, action) => {
  switch (action.type) {
  case ActionTypes.ADD_PROJECT:
    return {
      id: action.projectId,
      name: action.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      width: action.width,
      height: action.height,
      paths: [],
    }

  case ActionTypes.UPDATE_PROJECT:
    return {
      ...state,
      updatedAt: new Date(),
    }

  case ActionTypes.SET_PROJECT_NAME:
    return {
      ...state,
      name: action.name,
    }

  case ActionTypes.SET_PROJECT_WIDTH:
    return {
      ...state,
      width: action.width,
    }

  case ActionTypes.SET_PROJECT_HEIGHT:
    return {
      ...state,
      height: action.height,
    }

  case ActionTypes.INSERT_PATH:
    return {
      ...state,
      paths: [
        ...state.paths.slice(0, action.insertAt),
        action.pathId,
        ...state.paths.slice(action.insertAt),
      ],
    }

  case ActionTypes.REMOVE_PATHS:
    return {
      ...state,
      paths: state.paths.filter((id) => !action.pathIds.includes(id)),
    }

  default:
    return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.ADD_PROJECT:
    return {
      ...state,
      [action.projectId]: project(undefined, action),
    }

  case ActionTypes.DELETE_PROJECT:
    return Object.keys(state).reduce(
      (acc, key) => (action.projectId === state[key].id ? acc : {
        ...acc,
        [key]: state[key],
      }),
      {}
    )

  case ActionTypes.UPDATE_PROJECT:
  case ActionTypes.SET_PROJECT_NAME:
  case ActionTypes.SET_PROJECT_WIDTH:
  case ActionTypes.SET_PROJECT_HEIGHT:
  case ActionTypes.INSERT_PATH:
    return {
      ...state,
      [action.projectId]: project(state[action.projectId], action),
    }

  case ActionTypes.REMOVE_PATHS:
    return Object.keys(state).reduce((acc, key) => ({
      ...acc,
      [key]: project(state[key], action),
    }), {})

  default:
    return state
  }
}
