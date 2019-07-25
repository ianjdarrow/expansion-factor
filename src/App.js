import React from 'react';
import Chart from './components/chart';
import Selector from './components/selector';
import { getPricesForRanges } from './data/calculator';
import './App.css';

const initialState = {
  AWSPricePerPB: 23000.0,
  hdCostPerPB: 20000.0,
  hdDepreciationInMonths: 36,
  sealingHwCostPerGBHr: 10.0,
  sealingHwDepreciationInMonths: 36,
  totalBlockRewardPerMonth: 12500000,
  avgContractDurationInMonths: 12,
  expansionFactor: 2.3,
  minNetworkSizeInEB: 1,
  maxNetworkSizeInEB: 20,
  minFilPriceInUSD: 0,
  maxFilPriceInUSD: 15
};
const ranges = {
  AWSPricePerPB: [0, 50000, 1000],
  hdCostPerPB: [0, 100000, 1000],
  hdDepreciationInMonths: [12, 120, 1],
  sealingHwCostPerGBHr: [1, 100, 1],
  sealingHwDepreciationInMonths: [12, 120, 1],
  totalBlockRewardPerMonth: [0, 12500000, 10000],
  avgContractDurationInMonths: [1, 36, 1],
  expansionFactor: [1.5, 10, 0.1],
  maxNetworkSizeInEB: [5, 100, 1],
  maxFilPriceInUSD: [5, 100, 1]
};

class App extends React.Component {
  state = {
    vars: {
      ...initialState
    }
  };
  handleChange = (event, name) => {
    this.setState({
      vars: {
        ...this.state.vars,
        [name]: event.target.value
      }
    });
  };
  restoreDefaults = () => {
    this.setState({ vars: { ...initialState } });
  };
  render() {
    const selectors = Object.entries(this.state.vars).map(([name, value]) => {
      // this was causing some undiagnosed array explosion and isn't that interesting to adjust
      if (name === 'minNetworkSizeInEB' || name === 'minFilPriceInUSD')
        return null;
      const [min, max, step] = ranges[name];
      return (
        <Selector
          key={name}
          min={min}
          max={max}
          step={step}
          value={value}
          name={name}
          handleChange={e => this.handleChange(e, name)}
        />
      );
    });
    const data = getPricesForRanges(this.state.vars);
    return (
      <div className="container">
        <Chart vars={this.state.vars} data={data} />
        <button onClick={this.restoreDefaults}>Reset</button>
        <div className="selectors">{selectors}</div>
      </div>
    );
  }
}

export default App;
