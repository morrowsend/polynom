import * as ActionTypes from "../constants/ActionTypes"
import { createPoint } from "./points"

export function deactivatePaths() {
  return {
    type: ActionTypes.DEACTIVATE_PATHS,
  }
}

export function setActivePath(pathId, isActive) {
  return {
    type: ActionTypes.SET_ACTIVE_PATH,
    pathId,
    isActive,
  }
}

let newPathId = 0
export function createPath(x, y) {
  return (dispatch, getState) => {
    const { builder, pathsById } = getState()

    // determine the position of the new path
    const insertAt = builder.paths.reduce((acc, key, index) => {
      return pathsById[key].isActive ? index + 1 : acc
    }, 0)

    newPathId++

    dispatch(deactivatePaths())
    dispatch(addPath(newPathId, insertAt))
    dispatch(createPoint(newPathId, "M", x, y, {}))
    dispatch(setActivePath(newPathId, true))
  }
}

function addPath(pathId, insertAt) {
  return {
    type: ActionTypes.ADD_PATH,
    pathId,
    insertAt,
  }
}

export function removePaths(pathIds) {
  return {
    type: ActionTypes.REMOVE_PATHS,
    pathIds,
  }
}

export function setPathName(pathId, name) {
  return {
    type: ActionTypes.SET_PATH_NAME,
    pathId,
    name,
  }
}

export function setRelativePath(pathId, isRelative) {
  return {
    type: ActionTypes.SET_RELATIVE_PATH,
    pathId,
    isRelative,
  }
}

export function setClosedPath(pathId, isClosed) {
  return {
    type: ActionTypes.SET_CLOSED_PATH,
    pathId,
    isClosed,
  }
}

export function setFilledPath(pathId, isFilled) {
  return {
    type: ActionTypes.SET_FILLED_PATH,
    pathId,
    isFilled,
  }
}
