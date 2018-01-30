import React, { Component } from "react";
import PropTypes from "prop-types";
import StyledAxis from "../atoms/StyledAxis";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";

class Axis extends Component {
  constructor(props) {
    super(props);
    this.drawAxis = this.drawAxis.bind(this);
  }

  componentDidMount() {
    this.drawAxis();
  }

  componentDidUpdate() {
    this.drawAxis();
  }

  drawAxis() {
    const {
      direction,
      scale,
      xShift,
      yShift,
      tickSize,
      tickShift,
      tickValues
    } = this.props;
    const settings = {
      x: {
        axis: axisBottom
      },
      y: {
        axis: axisLeft
      }
    };
    select(this.axis)
      .attr("transform", `translate(${xShift},${yShift})`)
      .call(
        settings[direction]
          .axis(scale)
          .tickValues(tickValues)
          .tickFormat("")
          .tickSize(tickSize)
          .tickSizeOuter(0)
      )
      .selectAll(".tick line")
      .attr("transform", `translate(0,${tickShift})`);
  }

  render() {
    return (
      <StyledAxis
        innerRef={axis => (this.axis = axis)}
        direction={this.props.direction}
      />
    );
  }
}

Axis.propTypes = {
  direction: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  yShift: PropTypes.number.isRequired,
  xShift: PropTypes.number.isRequired,
  tickSize: PropTypes.number.isRequired,
  tickShift: PropTypes.number.isRequired,
  tickValues: PropTypes.arrayOf(PropTypes.number).isRequired
};

Axis.defaultProps = {
  xShift: 0,
  yShift: 0,
  tickShift: 0
};

export default Axis;
