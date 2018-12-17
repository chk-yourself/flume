import Flume from './js/flume';
import './css/styles.css';
import './css/demo.css';

const sliderDefault = new Flume.Slider({
  id: 'sliderDefault'
});

const sliderVertical = new Flume.Slider({
  id: 'sliderVertical',
  isVertical: true
});

const sliderAutoplay = new Flume.Slider({
  id: 'sliderAutoplay',
  onAutoplay: true
});
