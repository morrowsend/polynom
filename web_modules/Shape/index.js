import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Point from "Point"
import pathCode from "../../src/utils/pathCode"
import boundingBox from "svg-path-bounding-box"
import "./styles"

class Shape extends Component {
  renderPoint = (key, index, keys) => {
    const { path, pointsById } = this.props
    const point = pointsById[key]

    return (
      <Point
        key={ key }
        path={ path }
        point={ point }
        previousPoint={ index > 0 ? pointsById[keys[index - 1]] : null }
        keyActions={ this.props.keyActions }
        onMouseDown={ this.props.onMouseDown } />
    )
  };

  render() {
    const { path, pointsById } = this.props
    const code = pathCode(path, pointsById)
    const { minX, minY, width, height } = boundingBox(code)

    return (
      <g className="ad-Shape">
        { path.isActive && (
          <rect
            className="ad-Shape-rect"
            x={ minX }
            y={ minY }
            width={ width }
            height={ height } />
        ) }

        <path
          className={ cx("ad-Shape-path", { "is-filled": path.isFilled }) }
          d={ code } />

        <g className="ad-Shape-points">
          { path.points.map(this.renderPoint) }
        </g>
      </g>
    )
  }
}

Shape.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  keyActions: PropTypes.array.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

export default Shape
