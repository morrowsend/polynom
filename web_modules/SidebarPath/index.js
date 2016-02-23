import { connect } from "react-redux"
import { pathsActions, pointsActions } from "../../src/actions"
import { parsePathCode } from "../../src/utils"
import SidebarPath from "./SidebarPath"

const mapStateToProps = (state) => ({
  pathsById: state.pathsById,
  pointsById: state.pointsById,
})

const mapDispatchToProps = (dispatch, props) => ({
  onPathAddActive() {
    dispatch(pathsActions.setActivePaths([props.path.id], true))
    dispatch(pointsActions.setActivePoints(props.path.points, true))
  },
  onPathActive() {
    dispatch(pointsActions.deactivatePoints())
    dispatch(pathsActions.deactivatePaths())
    dispatch(pathsActions.setActivePaths([props.path.id], true))
    dispatch(pointsActions.setActivePoints(props.path.points, true))
  },
  onPathsActive(pathIds, pointIds) {
    dispatch(pathsActions.setActivePaths(pathIds, true))
    dispatch(pointsActions.setActivePoints(pointIds, true))
  },
  onNameChange(name) {
    dispatch(pathsActions.setPathName(props.path.id, name))
  },
  onPathCodeChange(d) {
    const { isClosed, isRelative, points } = parsePathCode(d)

    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))

    dispatch(pointsActions.deactivatePoints())
    dispatch(pointsActions.removePoints(props.path.points))

    points.forEach((p) =>
      dispatch(pointsActions.createPoint(props.path.id, ...p)))
  },
  onRelativeChange(isRelative) {
    dispatch(pathsActions.setRelativePath(props.path.id, isRelative))
  },
  onClosedChange(isClosed) {
    dispatch(pathsActions.setClosedPath(props.path.id, isClosed))
  },
  onFilledChange(isFilled) {
    dispatch(pathsActions.setFilledPath(props.path.id, isFilled))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarPath)
