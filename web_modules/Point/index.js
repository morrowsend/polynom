import "./styles"

import React, { Component, PropTypes } from "react"
import cx from "classnames"
import { APP_SHIFT } from "../../src/constants/KeyActionTypes"
import * as ObjectTypes from "../../src/constants/ObjectTypes"
import * as VisibilityTypes from "../../src/constants/VisibilityTypes"

class Point extends Component {
  handleMouseDown = (e) => {
    e.stopPropagation()

    const {
      keyActions,
      activePaths,
      activePoints,
      path,
      point,
    } = this.props

    if (!keyActions.includes(APP_SHIFT)) {
      this.props.onDeactivate(activePaths, activePoints)
    }

    this.props.onActivate([path.id], [point.id])
  };

  handleMainMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.point.id, ObjectTypes.POINT)
  };

  handleFirstAnchorMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.point.id, ObjectTypes.POINT_ANCHOR_1)
  };

  handleSecondAnchorMouseDown = (e) => {
    this.props.onMouseDown(e, this.props.point.id, ObjectTypes.POINT_ANCHOR_2)
  };

  renderCode(w, h, { code, x, y, isActive }) {
    const { project } = this.props

    if (
      (project.pointCodeShow === VisibilityTypes.ALL) ||
      (project.pointCodeShow === VisibilityTypes.ACTIVE && isActive)
    ) {
      return (
        <text
          className="ad-MainPoint-code"
          x={ x }
          y={ y }
          dy={ -h }
          dx={ w }>
          { `${ code } (${ +x.toFixed(3) }, ${ +y.toFixed(3) })` }
        </text>
      )
    }

    return null
  }

  renderPoint(point) {
    const [w, h] = [6, 6]

    return (
      <g className="ad-MainPoint">
        { this.renderCode(w, h, point) }
        <rect
          className="ad-MainPoint-coords"
          x={ point.x - w / 2 }
          y={ point.y - h / 2 }
          width={ w }
          height={ h }
          onMouseDown={ this.handleMainMouseDown } />
      </g>
    )
  }

  renderQuadraticAnchors(point, previousPoint) {
    return (
      <g className="ad-Anchor">
        <line
          className="ad-Anchor-line"
          x1={ previousPoint.x }
          y1={ previousPoint.y }
          x2={ point.parameters.x1 }
          y2={ point.parameters.y1 } />

        <line
          className="ad-Anchor-line"
          x1={ point.parameters.x1 }
          y1={ point.parameters.y1 }
          x2={ point.x }
          y2={ point.y } />

        <circle
          className="ad-Anchor-point"
          cx={ point.parameters.x1 }
          cy={ point.parameters.y1 }
          r={ 3 }
          onMouseDown={ this.handleFirstAnchorMouseDown } />
      </g>
    )
  }

  renderCubicAnchors(point, previousPoint) {
    const code = point.code.toLowerCase()

    return (
      <g className="ad-Anchor">
        { code === "c" && (
          <line
            className="ad-Anchor-line"
            x1={ previousPoint.x }
            y1={ previousPoint.y }
            x2={ point.parameters.x1 }
            y2={ point.parameters.y1 } />
        ) }

        <line
          className="ad-Anchor-line"
          x1={ point.x }
          y1={ point.y }
          x2={ point.parameters.x2 }
          y2={ point.parameters.y2 } />

        { code === "c" && (
          <circle
            className="ad-Anchor-point"
            cx={ point.parameters.x1 }
            cy={ point.parameters.y1 }
            r={ 3 }
            onMouseDown={ this.handleFirstAnchorMouseDown } />
        ) }

        <circle
          className="ad-Anchor-point"
          cx={ point.parameters.x2 }
          cy={ point.parameters.y2 }
          r={ 3 }
          onMouseDown={ this.handleSecondAnchorMouseDown } />
      </g>
    )
  }

  render() {
    const { point, previousPoint } = this.props
    const code = point.code.toLowerCase()

    return (
      <g
        className={ cx("ad-Point", { "is-active": point.isActive }) }
        onMouseDown={ this.handleMouseDown }>
        { this.renderPoint(point) }

        { /* If there is a Bezier curve, render anchors */ }
        { (code === "q") &&
            this.renderQuadraticAnchors(point, previousPoint) }
        { (code === "c" || code === "s") &&
            this.renderCubicAnchors(point, previousPoint) }
      </g>
    )
  }
}

Point.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  keyActions: PropTypes.array.isRequired,
  activePaths: PropTypes.array.isRequired,
  activePoints: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object,
  onMouseDown: PropTypes.func.isRequired,
}

export default Point
