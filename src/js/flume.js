import { $, $all, createElement, debounce, mouseTouch } from './utilities';

export default (function flume() {
  // Default props
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

  class Flume {
    constructor(props) {
      try {
        if ('id' in props === false) {
          throw new Error('Must include prop `id`');
        }
        Object.keys(props).forEach(key => {
          const definedType = propTypes[key];
          const type = typeof props[key];
          if (typeof definedType === 'undefined') {
            throw new Error(`Invalid propName: \`${key}\` is undefined`);
          }
          if (type !== definedType) {
            throw new Error(`Invalid propType for \`${key}\`: expected type 
\`${definedType}\`, received \`${type}\``);
          }
        });
        this.props = {
          ...def,
          ...props
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
        this.elem = $(`#${props.id}`);
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
      // Set total number of slides
      this.setState({
        slidesTotal: this.slides.length
      });
      // Prepare wrapper containing slides
      this.initSliderInner();
      if (this.props.onInfiniteLoop) {
        this.setState({ activeSlide: 1 });
        this.initInfiniteLoop();
      }
      // Mount arrow indicators, if opted in; default = true
      if (this.props.showArrows) {
        this.mountArrows();
      }
      // Mount dot indicators, if opted in; default = true
      if (this.props.showDots) {
        this.mountDots();
      }
      this.sliderInner.addEventListener(mouseTouch(), this.swipeStart);
      window.addEventListener('resize', debounce(this.resizeSlider, 250));
      if (this.props.onAutoplay) {
        this.beginAutoplay();
      }
    }

    setState(newState) {
      this.state = {
        ...this.state,
        ...newState
      };
    }

    beginAutoplay() {
      const { intervalID: currentInterval, activeSlide } = this.state;
      const { autoplaySpeed: delay } = this.props;
      if (currentInterval) {
        clearInterval(currentInterval);
      }
      this.setState({
        intervalID: setInterval(() => {
          const currentIndex = activeSlide;
          const lastIndex = this.slides.length - 1;
          const nextIndex = currentIndex !== lastIndex ? currentIndex + 1 : 0;
          this.setActiveSlide(nextIndex);
        }, delay)
      });
    }

    // Prepare wrapper containing slides
    initSliderInner() {
      const { onInfiniteLoop, isVertical } = this.props;
      const slidesTotal = !onInfiniteLoop ? this.slides.length : this.slides.length + 2;

      if (isVertical) {
        // Set wrapper height to total height of slides combined and stack slides vertically
        this.elem.classList.add('is-vertical');
        this.sliderInner.style.height = `${slidesTotal * 100}%`;
        this.sliderInner.style.top = '-100%';
      } else {
        // Set wrapper width to total width of slides combined and lay slides horizontally
        this.sliderInner.style.width = `${slidesTotal * 100}%`;
        this.sliderInner.style.left = '-100%';
      }
    }

    /**
     * Creates an illusion of infinitely looping slides, using clones of the first and last slides
     * When a cloned slide is shown, the slider jumps to the position of the original slide
     * without detection by setting `skipTransition` to true
     */
    initInfiniteLoop() {
      // Clone first and last slides, and append them to the back and the front of the stack, respectively
      const cloneFirst = this.slides[0].cloneNode(true);
      const cloneLast = this.slides[this.slides.length - 1].cloneNode(true);
      this.sliderInner.appendChild(cloneFirst);
      this.sliderInner.insertBefore(cloneLast, this.sliderInner.firstElementChild);

      this.sliderInner.addEventListener('transitionend', () => {
        const currentIndex = this.state.activeSlide;
        const lastIndex = this.slides.length - 1;
        if (currentIndex !== 0 && currentIndex !== lastIndex) return;
         // If the current index is 0, and the clone of the last slide is shown, jump to the original last slide
         // If the current index is the last index, and the clone of the first slide is shown, jump to the original first slide
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
        if (this.props.onAutoplay) {
          this.beginAutoplay();
        }
      });
      this.elem.appendChild(arrowsWrapper);
    }

    mountDots() {
      const dotsList = createElement('ul', {
        className: 'slider__dots'
      });
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
        if (this.props.onAutoplay) {
          this.beginAutoplay();
        }
      });
      this.elem.appendChild(dotsList);
    }

    slide(movePos = 0) {
      const { isVertical } = this.props;
      const { activeSlide, skipTransition } = this.state;
      const slideLength = isVertical ? this.slides[0].offsetHeight : this.slides[0].offsetWidth;
      const endPos = activeSlide * -slideLength;
      const axis = isVertical ? 'top' : 'left';
      if (!skipTransition) {
        if (this.sliderInner.matches('.no-transition')) {
          this.sliderInner.classList.remove('no-transition');
        }
      } else {
        this.sliderInner.classList.add('no-transition');
        this.setState({ skipTransition: false });
      }
      this.sliderInner.style[axis] = `${endPos + movePos}px`;
    }

    swipeStart(e) {
      if (this.state.isAnimating) return;
      const touch = e.type !== 'touchstart' ? e : e.targetTouches[0] || e.changedTouches[0];
      this.setState({
        startX: touch.pageX,
        startY: touch.pageY,
        isAnimating: true
      });

      if (e.type === 'touchstart') {
        this.sliderInner.addEventListener('touchmove', this.swipeMove);
        this.sliderInner.addEventListener('touchend', this.swipeEnd);
      } else {
        this.sliderInner.addEventListener('mousemove', this.swipeMove);
        this.sliderInner.addEventListener('mouseleave', this.swipeEnd);
        this.sliderInner.addEventListener('mouseup', this.swipeEnd);
      }
    }

    swipeMove(e) {
      e.preventDefault();
      const touch = e.type !== 'touchmove' ? e : e.targetTouches[0] || e.changedTouches[0];
      const endX = touch.pageX;
      const endY = touch.pageY;
      const { startX, startY } = this.state;
      if (this.props.isVertical) {
        this.slide(endY - startY);
      } else {
        this.slide(endX - startX);
      }
    }

    swipeEnd(e) {
      const touch = e.type !== 'touchmove' ? e : e.targetTouches[0] || e.changedTouches[0];
      const { startX, startY, activeSlide } = this.state;
      const moveX = touch.pageX - startX;
      const moveY = touch.pageY - startY;
      const changeSlide = !this.props.isVertical ? Math.abs(moveX) >= 40 : Math.abs(moveY) >= 40;
      if (changeSlide) {
        const nextIndex = moveX > 0 ? activeSlide - 1 : activeSlide + 1;
        this.setActiveSlide(nextIndex);
        if (this.props.onAutoplay) {
          this.beginAutoplay();
        }
      } else {
        this.slide();
      }
      // eslint-disable-next-line default-case
      switch (e.type) {
        case 'mouseleave':
        case 'mouseup':
          this.sliderInner.removeEventListener('mousemove', this.swipeMove);
          this.sliderInner.removeEventListener('mouseup', this.swipeEnd);
          this.sliderInner.removeEventListener('mouseleave', this.swipeEnd);
          break;
        case 'touchend':
          this.sliderInner.removeEventListener('touchmove', this.swipeMove);
          this.sliderInner.removeEventListener('touchend', this.swipeEnd);
          break;
      }
      this.setState({ startX: null, startY: null, isAnimating: false });
    }

    resizeSlider() {
      this.slide();
    }

    setActiveSlide(index) {
      this.setState({ activeSlide: index });
      this.updateView();
    }

    updateView() {
      const dotIndex = !this.props.onInfiniteLoop
        ? this.state.activeSlide
        : this.state.activeSlide - 1;
      const { showDots } = this.props;
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
  return Flume;
})();
