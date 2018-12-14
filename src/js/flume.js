import { $, $all, createElement, debounce } from './utilities';

// eslint-disable-next-line func-names
export default (function() {
  const def = {
    id: '',
    onAutoplay: false,
    showArrows: true,
    showDots: true,
    autoplaySpeed: 5000,
    onInfiniteLoop: true,
    slidesToShow: 1,
    arrowColor: {
      default: 'rgba(255, 255, 255, 0.7)',
      hover: 'rgba(255, 255, 255, 0.8)',
      active: 'transparent',
      focus: 'none'
    },
    dotColor: {
      default: 'rgba(255, 255, 255, 0.5)',
      hover: 'rgb(255, 255, 255)',
      active: 'rgba(255, 255, 255, 0.85)',
      focus: 'none'
    },
    isVertical: false
  };

  const propTypes = {
    id: 'string',
    onAutoplay: 'boolean',
    showArrows: 'boolean',
    showDots: 'boolean',
    autoplaySpeed: 'number',
    onInfiniteLoop: 'boolean',
    slidesToShow: 'number',
    arrowColor: 'object',
    dotColor: 'object',
    isVertical: 'boolean'
  };

  class Slider {
    constructor(settings) {
      try {
        if ('id' in settings === false) {
          throw new Error('Must include prop `id`');
        }
        Object.keys(settings).forEach(key => {
          const definedType = propTypes[key];
          if (typeof definedType === 'undefined') {
            throw new Error(`Invalid propName: \`${key}\` is undefined`);
          }
          if (typeof settings[key] !== definedType) {
            throw new Error(`Invalid propType for \`${key}\`: expected type 
\`${definedType}\`, received \`${typeof settings[key]}\``);
          }
        });
        this.settings = {
          ...def,
          ...settings
        };
        this.state = {
          activeSlide: 0,
          slidesTotal: 0,
          skipTransition: false,
          isAnimating: false,
          startX: null,
          startY: null,
          intervalID: null
        };
        this.elem = $(`#${settings.id}`);
      } catch (e) {
        console.error(e.message);
      }
      this.swipeMove = this.swipeMove.bind(this);
      this.swipeStart = this.swipeStart.bind(this);
      this.swipeEnd = this.swipeEnd.bind(this);
      this.resizeSlider = this.resizeSlider.bind(this);
      this.init();
    }

    get slides() {
      return $all('.slider__slide', this.elem);
    }

    get sliderInner() {
      return $('.slider__inner', this.elem);
    }

    init() {
      this.state.slidesTotal = this.slides.length;
      this.initSliderInner();
      if (this.settings.onInfiniteLoop) {
        this.setState({ activeSlide: 1 });
        this.initInfiniteLoop();
      }
      if (this.settings.showArrows) {
        this.mountArrows();
      }
      if (this.settings.showDots) {
        this.mountDots();
      }
      this.sliderInner.addEventListener('mousedown', this.swipeStart);
      this.sliderInner.addEventListener('touchstart', this.swipeStart);
      window.addEventListener('resize', debounce(this.resizeSlider, 250));
      if (this.settings.onAutoplay) {
        this.beginAutoplay();
      }
      console.log(this.settings);
    }

    setState(newState) {
      this.state = {
        ...this.state,
        ...newState
      };
    }

    beginAutoplay() {
      const currentInterval = this.state.intervalID;
      const delay = this.settings.autoplaySpeed;
      if (currentInterval) {
        clearInterval(currentInterval);
      }
      this.setState({
        intervalID: setInterval(() => {
          const currentIndex = this.state.activeSlide;
          const lastIndex = this.slides.length - 1;
          const nextIndex = currentIndex !== lastIndex ? currentIndex + 1 : 0;
          this.setActiveSlide(nextIndex);
        }, delay)
      });
    }

    initSliderInner() {
      const onInfiniteLoop = this.settings.onInfiniteLoop;
      const slidesTotal = !onInfiniteLoop ? this.slides.length : this.slides.length + 2;

      if (this.settings.isVertical) {
        this.elem.classList.add('is-vertical');
        this.sliderInner.style.height = `${slidesTotal * 100}%`;
        this.sliderInner.style.top = '-100%';
      } else {
        this.sliderInner.style.width = `${slidesTotal * 100}%`;
        this.sliderInner.style.left = '-100%';
      }
    }

    initInfiniteLoop() {
      const cloneFirst = this.slides[0].cloneNode(true);
      const cloneLast = this.slides[this.slides.length - 1].cloneNode(true);
      this.sliderInner.appendChild(cloneFirst);
      this.sliderInner.insertBefore(cloneLast, this.sliderInner.firstElementChild);

      this.sliderInner.addEventListener('transitionend', () => {
        const currentIndex = this.state.activeSlide;
        const lastIndex = this.slides.length - 1;
        if (currentIndex !== 0 && currentIndex !== lastIndex) return;
        this.setState({ skipTransition: true });
        const nextIndex = currentIndex === 0 ? lastIndex - 1 : 1;
        this.setActiveSlide(nextIndex);
      });
    }

    mountArrows() {
      const arrowNext = createElement(
        'button',
        {
          className: 'slider__arrow slider__arrow--next',
          type: 'button',
          'data-slide-change': '1'
        },
        createElement('span', {
          className: 'slider__chevron-icon slider__chevron-icon--next'
        })
      );
      const arrowPrev = createElement(
        'button',
        {
          className: 'slider__arrow slider__arrow--prev',
          type: 'button',
          'data-slide-change': '-1'
        },
        createElement('span', {
          className: 'slider__chevron-icon slider__chevron-icon--prev'
        })
      );
      const arrowsWrapper = createElement(
        'div',
        {
          className: 'slider__arrows'
        },
        arrowPrev,
        arrowNext
      );

      arrowsWrapper.addEventListener('click', e => {
        if (!e.target.matches('.slider__arrow')) return;
        const selectedSlide = this.state.activeSlide + parseInt(e.target.dataset.slideChange);
        if (selectedSlide < 0 || selectedSlide > this.slides.length - 1) return;
        this.setActiveSlide(selectedSlide);
        if (this.settings.onAutoplay) {
          this.beginAutoplay();
        }
      });
      this.elem.appendChild(arrowsWrapper);
    }

    mountDots() {
      const dotsList = createElement('ul', {
        className: 'slider__dots'
      });
      const id = this.settings.id;
      for (let i = 0; i < this.state.slidesTotal; i++) {
        const dot = createElement('li', {
          className: `slider__dot${i === 0 ? ' is-active' : ''}`,
          'data-index': i
        });
        dotsList.appendChild(dot);
      }
      dotsList.addEventListener('click', e => {
        if (!e.target.matches('.slider__dot')) return;
        const slideIndex = +e.target.dataset.index + 1;
        this.setActiveSlide(slideIndex);
        if (this.settings.onAutoplay) {
          this.beginAutoplay();
        }
      });
      this.elem.appendChild(dotsList);
    }

    slide(movePos = 0) {
      const isVertical = this.settings.isVertical;
      const slideLength = isVertical ? this.slides[0].offsetHeight : this.slides[0].offsetWidth;
      const startPos = isVertical ? this.sliderInner.offsetTop : this.sliderInner.offsetLeft;
      const endPos = this.state.activeSlide * -slideLength;
      const axis = isVertical ? 'Y' : 'X';
      if (!this.state.skipTransition) {
        this.sliderInner.style.transition = 'transform .2s ease-in';
      } else {
        this.sliderInner.style.transition = 'none';
        this.setState({ skipTransition: false });
      }
      this.sliderInner.style.transform = `translate${axis}(${endPos - startPos + movePos}px)`;
    }

    swipeStart(e) {
      if (this.state.isAnimating) return;
      const touch = e.type !== 'touchmove' ? e : e.targetTouches[0] || e.changedTouches[0];
      this.setState({
        startX: touch.pageX,
        startY: touch.pageY,
        isAnimating: true
      });
      this.sliderInner.addEventListener('mousemove', this.swipeMove);
      this.sliderInner.addEventListener('touchmove', this.swipeMove);
      this.sliderInner.addEventListener('mouseup', this.swipeEnd);
      this.sliderInner.addEventListener('mouseleave', this.swipeEnd);
      this.sliderInner.addEventListener('touchend', this.swipeEnd);
    }

    swipeMove(e) {
      e.preventDefault();
      const touch = e.type !== 'touchmove' ? e : e.targetTouches[0] || e.changedTouches[0];
      const endX = touch.pageX;
      const endY = touch.pageY;
      const { startX, startY } = this.state;
      if (this.settings.isVertical) {
        this.slide(endY - startY);
      } else {
        this.slide(endX - startX);
      }
    }

    swipeEnd(e) {
      const touch = e.type !== 'touchmove' ? e : e.targetTouches[0] || e.changedTouches[0];
      const { startX, startY } = this.state;
      const moveX = touch.pageX - startX;
      const moveY = touch.pageY - startY;
      const changeSlide = !this.settings.isVertical ? Math.abs(moveX) >= 40 : Math.abs(moveY) >= 40;
      if (changeSlide) {
        const nextIndex = moveX > 0 ? --this.state.activeSlide : ++this.state.activeSlide;
        this.setActiveSlide(nextIndex);
        if (this.settings.onAutoplay) {
          this.beginAutoplay();
        }
      } else {
        this.slide();
      }

      this.sliderInner.removeEventListener('mousemove', this.swipeMove);
      this.sliderInner.removeEventListener('mouseup', this.swipeEnd);
      this.sliderInner.removeEventListener('mouseleave', this.swipeEnd);
      this.sliderInner.removeEventListener('touchmove', this.swipeMove);
      this.sliderInner.removeEventListener('touchend', this.swipeEnd);
      this.setState({ startX: null, startY: null, isAnimating: false });
    }

    resizeSlider(e) {
      this.slide();
    }

    setActiveSlide(index) {
      this.setState({ activeSlide: index });
      this.updateView();
    }

    updateView() {
      const dotIndex = !this.settings.onInfiniteLoop
        ? this.state.activeSlide
        : this.state.activeSlide - 1;
      const showDots = this.settings.showDots;
      this.slide();
      if (showDots) {
        const currentDot = $('.slider__dot.is-active', this.elem);
        const selectedDot = $all('.slider__dot', this.elem)[dotIndex];
        if (currentDot) {
          currentDot.classList.remove('is-active');
        }
        if (selectedDot) {
          selectedDot.classList.add('is-active');
        }
      }
    }
  }
  return {
    Slider
  };
})();
