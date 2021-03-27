import React, { Component } from 'react';
import './ProgressBar.scss';

class ProgressBar extends Component {

  state = {
    progressPercent: false
  }

  // value of progress bar could be expressed as for example 75% or 3/4
  handleClick = () => {
    this.setState({
      progressPercent: !this.state.progressPercent
    })
  }

  render() {

    // value of progress bar
    const purchased = this.props.purchased.length;
    const sum = this.props.active.length + this.props.purchased.length;
    let percent;
    if (sum === 0) {
      percent = 0
    } else {
      percent = Math.round((purchased / sum) * 100);
    }

    let redHue;
    let greenHue;

    if (percent <= 50) {
      redHue = 255;
      greenHue = (percent / 50) * 255;
    }
    else {
      redHue = 255 - (((percent - 50) / 50) * 255);
      greenHue = 255 - (((percent - 50) / 100) * 255);
    }

    const style = {
      width: `${percent}%`,
      backgroundColor: `rgb(${redHue}, ${greenHue}, 0)`
    }

    const numeric = `${purchased} / ${sum}`;
    const percentage = `${percent}%`;

    return (
      <div className="progress">
        <div className="progress__bar">
          <div style={style} className="progress__bar--fill"></div>
        </div>
        <span className="progress__percent" onClick={this.handleClick}> {this.state.progressPercent ? percentage : numeric}  </span>
      </div>
    );
  }
}

export default ProgressBar;