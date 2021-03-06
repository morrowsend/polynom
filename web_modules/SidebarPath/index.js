import "./styles"

import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import { DragSource, DropTarget } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"
import cx from "classnames"
import { isEqual } from "lodash"
import Expand, { ExpandPanel } from "Expand"
import Settings, { Setting } from "Settings"
import Text, { Textarea } from "Text"
import Checkbox from "Checkbox"
import { ButtonSquare } from "Button"
import { MdDragHandle } from "react-icons/lib/md"
import SidebarPathExpand from "./SidebarPathExpand"
import { SIDEBAR_PATH } from "../../src/constants/ObjectTypes"
import { pathCode } from "../../src/utils"

class SidebarPath extends Component {
  state = {
    isFocused: false,
    d: null,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    })
  }

  // fix perf issue
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState) ||
      !isEqual(this.props.path, nextProps.path) ||
      !isEqual(this.props.pointsById, nextProps.pointsById) ||
      this.props.isOver !== nextProps.isOver
  }

  handlePathClick = () => {
    this.props.onPathClick(this.props.path)
  };

  handleNameChange = (e) => {
    const { value } = e.target

    if (value.trim() !== "") {
      this.props.onNameChange(this.props.path, value)
    }
  };

  handleChange = (e) => this.setState({ d: e.target.value });

  handleFocus = (e) => {
    this.d = e.target.value
    this.setState({
      isFocused: true,
      d: this.d,
    })
  };

  handleBlur = (e) => {
    this.setState({ isFocused: false })

    if (this.d !== e.target.value) {
      this.props.onPathCodeChange(this.props.path, e.target.value)
    }
  };

  handleRelativeChange = (e) => this.props.onRelativeChange(
    this.props.path,
    e.target.checked
  );

  handleClosedChange = (e) => this.props.onClosedChange(
    this.props.path,
    e.target.checked
  );

  handleFilledChange = (e) => this.props.onFilledChange(
    this.props.path,
    e.target.checked
  );

  handleBorderedChange = (e) => this.props.onBorderedChange(
    this.props.path,
    e.target.checked
  );

  render() {
    const {
      project,
      path,
      pointsById,
      connectDragSource,
      connectDropTarget,
      isOver,
    } = this.props

    return (
      <div className={ cx("ad-SidebarPath", { "is-active": path.isActive }) }>
        <Expand>
          <SidebarPathExpand
            onClick={ this.handlePathClick }
            isExpandHandler>
            <div className="ad-SidebarPath-name">
              <Text
                className="ad-SidebarPath-input"
                value={ path.name }
                onChange={ this.handleNameChange } />
            </div>
            <div className="ad-SidebarPath-actions">
              { project.paths.length > 1 && connectDragSource(
                <div>
                  <ButtonSquare
                    size="1rem"
                    type={ ["expand", "grab"] }>
                    <MdDragHandle size="1rem" />
                  </ButtonSquare>
                </div>
              ) }
            </div>
          </SidebarPathExpand>

          <ExpandPanel className="ad-SidebarPathExpand-panel">
            <Settings>
              <Setting>
                <Textarea
                  value={ this.state.isFocused ?
                    this.state.d :
                    pathCode(path, pointsById) }
                  onChange={ this.handleChange }
                  onFocus={ this.handleFocus }
                  onBlur={ this.handleBlur } />
              </Setting>
            </Settings>

            <Settings title="Path options">
              <Setting label="Relative">
                <Checkbox
                  checked={ path.isRelative }
                  onChange={ this.handleRelativeChange } />
              </Setting>
              <Setting label="Closed">
                <Checkbox
                  checked={ path.isClosed }
                  onChange={ this.handleClosedChange } />
              </Setting>
            </Settings>

            <Settings title="Path style">
              <Setting label="Filled">
                <Checkbox
                  checked={ path.isFilled }
                  onChange={ this.handleFilledChange } />
              </Setting>
              <Setting label="Bordered">
                <Checkbox
                  checked={ path.isBordered }
                  onChange={ this.handleBorderedChange } />
              </Setting>
            </Settings>
          </ExpandPanel>
        </Expand>

        { connectDropTarget(
          <div className={ cx("ad-SidebarPath-divider", {
            "is-hovered": isOver,
          }) } />
        ) }
      </div>
    )
  }
}

SidebarPath.propTypes = {
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  onPathMove: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onPathCodeChange: PropTypes.func.isRequired,
  onRelativeChange: PropTypes.func.isRequired,
  onClosedChange: PropTypes.func.isRequired,
  onFilledChange: PropTypes.func.isRequired,
  onBorderedChange: PropTypes.func.isRequired,
  onPathClick: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  path: PropTypes.object.isRequired,
  pointsById: PropTypes.object.isRequired,
}

const sidebarPathTarget = {
  drop(props, monitor, component) {
    const { project, path } = monitor.getItem()
    const index = project.paths.indexOf(path.id)
    const hoveredIndex = props.project.paths.indexOf(props.path.id)

    if (index === hoveredIndex) {
      return
    }

    const { bottom, top } = findDOMNode(component).getBoundingClientRect()
    const { y } = monitor.getClientOffset()
    const middle = (bottom - top) / 2
    const position = y - top

    if (index < hoveredIndex && position < middle) {
      return props.onPathMove(project.id, hoveredIndex - 1, path.id)
    }

    if (index > hoveredIndex && position > middle) {
      return props.onPathMove(project.id, hoveredIndex + 1, path.id)
    }

    return props.onPathMove(project.id, hoveredIndex, path.id)
  },
}

const sidebarPathSource = {
  beginDrag(props, monitor, component) {
    return {
      project: props.project,
      path: props.path,
      boundingRect: findDOMNode(component).getBoundingClientRect(),
    }
  },
}

export default DropTarget(
  SIDEBAR_PATH,
  sidebarPathTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })
)(DragSource(
  SIDEBAR_PATH,
  sidebarPathSource,
  (connect) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }),
)(SidebarPath))
