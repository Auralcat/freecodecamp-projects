// I'm going to move the other component in here for now
import React from 'react';

export class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sliderVal: 0.7,
        display: String.fromCharCode(160)
    }

    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  adjustVolume(e) {
    this.setState({
      sliderVal: e.target.value,
      display: "Volume: " + Math.round(e.target.value * 100)
    });
    setTimeout(() => this.clearDisplay(), 1000);
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }

  render() {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
        sound.volume = this.state.sliderVal
    });

    return (
        <div className="volume-slider">
            <p>{ this.state.display }</p>
            <input type="range"
                min="0"
                max="1"
                step="0.01"
                value={this.state.sliderVal}
                onChange={this.adjustVolume} />
        </div>
    )}
}
