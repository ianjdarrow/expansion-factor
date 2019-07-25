import React from 'react';
import Plot from 'react-plotly.js';

const Chart = props => {
  const layout = {
    title: 'Storage clearing price (% AWS S3)',
    autosize: true,
    showscale: 'false',
    xaxis: {
      title: {
        text: 'FIL Price ($)'
      },
      range: [props.vars.minFilPriceInUSD, props.vars.maxFilPriceInUSD]
    },
    yaxis: {
      title: {
        text: 'Network Size (EB)'
      },
      range: [props.vars.minNetworkSizeInEB, props.vars.maxNetworkSizeInEB]
    }
  };
  const { z } = props.data;
  return (
    <Plot
      data={[{ z, type: 'contour' }]}
      layout={layout}
      useResizeHandler
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
    />
  );
};

export default Chart;
