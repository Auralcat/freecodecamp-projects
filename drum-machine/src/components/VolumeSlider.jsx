// I'm going to move the other component in here for now
import React from 'react';

export class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sliderVal: 0.5
    }
  }

  render() {
    return (
        <div className="volume-slider">
            <input type="range"
                min="0"
                max="1"
                step="0.01"
                value={this.state.sliderVal}
                onChange={this.adjustVolume} />
        </div>
    )}
}
