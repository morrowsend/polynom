import React, { Component, PropTypes } from "react"
import cx from "classnames"
import "./styles"

class Point extends Component {
  handlePointClick = (e) => {
    e.stopPropagation()

    this.props.onPointClick(this.props.point.id)
  };

  renderPoint(point) {
    return (
      <circle
        className="ad-Point-circle"
        cx={ point.x }
        cy={ point.y }
        r={ 8 }
        onClick={ this.handlePointClick } />
    )
  }

  renderQuadraticAnchors(point, previousPoint) {
    const code = point.code.toLowerCase()
    const prevCode = previousPoint.code.toLowerCase()

    if (code === "q") {
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
            r={ 6 } />
        </g>
      )
    }

    return null
  }

  renderCubicAnchors(point, previousPoint) {
    const code = point.code.toLowerCase()
    const prevCode = previousPoint.code.toLowerCase()

    if (code === "c" || code === "s") {
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
              r={ 6 } />
          ) }

          <circle
            className="ad-Anchor-point"
            cx={ point.parameters.x2 }
            cy={ point.parameters.y2 }
            r={ 6 } />
        </g>
      )
    }

    return null
  }

  render() {
    const {
      point,
      previousPoint,
    } = this.props

    return (
      <g className={ cx("ad-Point", { "is-active": point.isActive }) }>
        { this.renderPoint(point) }
        { previousPoint && this.renderQuadraticAnchors(point, previousPoint) }
        { previousPoint && this.renderCubicAnchors(point, previousPoint) }
      </g>
    )
  }
}

Point.propTypes = {
  point: PropTypes.object.isRequired,
  previousPoint: PropTypes.object,
  onPointClick: PropTypes.func.isRequired,
}

export default Point
