import * as React from 'react';
import PropTypes from 'prop-types';

let delay = 1000; // 1000[ms] = 1s
let colorOfTimer = "#0f0f0f"; 

let pauseColor = "#f9a93d";
let finishColor = "#750000";

class Counter extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    from: PropTypes.number,
    to: PropTypes.number,
    onSuccess: PropTypes.func,
  }

  constructor(props) {
    super(props);
    const { from } = props;
    this.state = {
      currentCount: from,
      status: 'on',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), delay);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  pause = () => {
    this.setState({ status: 'paused' });
    clearInterval(this.intervalId);
  }

  unpause = () => {
    this.setState({ status: 'on' });
    this.intervalId = setInterval(this.timer.bind(this), delay);
  }

  reset = () => {
    this.setState({ status: 'on' });
    this.setState({
      currentCount: this.props.from,
    });
    this.intervalId = setInterval(this.timer.bind(this), delay);
  }

  handleClick = () => {
    if (this.state.status === 'on') {
      this.pause();
      document.getElementById(this.props.id).style.color = pauseColor; 
    } else if (this.state.status === 'paused') {
      this.unpause();
      document.getElementById(this.props.id).style.color = colorOfTimer;
    } else {
      this.reset();
      document.getElementById(this.props.id).style.color = colorOfTimer;
    }
  };

  timer = () => {
    this.setState({
      currentCount: this.state.currentCount - 1,
    });

    if (this.state.currentCount === this.props.to) {
      this.setState({ status: 'off' });  
      clearInterval(this.intervalId);
      document.getElementById(this.props.id).style.color = finishColor;

      if (this.props.onSuccess) {
        this.props.onSuccess();        
      }
    }
  };

  formatCounter = () => {
    const { currentCount } = this.state;
    const date = new Date(currentCount * delay);
    const format = { minute: '2-digit', second: '2-digit' };
    return date.toLocaleTimeString('pl-PL', format);
  };

  render() {
    return (
      <div className="wrapper" style = {{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div>This timer counts from {this.props.from} to {this.props.to}</div>
        <button id={this.props.id}
          onClick={this.handleClick}
          style={{
            color: colorOfTimer,
            fontSize: "3rem",
            margin: "5px",
          }}
        >
          {this.formatCounter()}
        </button>
      </div>
    );
  }
}

export default Counter;