import Flume from './js/flume';
import './css/styles.css';
import './css/demo.css';

const sliderDefault = new Flume({
  id: 'sliderDefault'
});

const sliderVertical = new Flume({
  id: 'sliderVertical',
  isVertical: true
});

const sliderAutoplay = new Flume({
  id: 'sliderAutoplay',
  onAutoplay: true
});
