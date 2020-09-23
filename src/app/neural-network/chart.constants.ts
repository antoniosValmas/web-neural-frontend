import { ChartYAxe } from 'chart.js';

export const yAccuracy: ChartYAxe = {
  id: 'y-accuracy',
  position: 'left',
  scaleLabel: {
    display: true,
    labelString: 'Accuracy (%)'
  }
};

export const yLoss: ChartYAxe = {
  id: 'y-loss',
  position: 'right',
  scaleLabel: {
    display: true,
    labelString: 'Loss'
  },
};
