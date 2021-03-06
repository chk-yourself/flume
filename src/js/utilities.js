export function debounce(fn, delay = 250) {
  let timer;
  // eslint-disable-next-line func-names
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

export function $(selector, context = document) {
  return context.querySelector(selector);
}

export function $all(selector, context = document) {
  return context.querySelectorAll(selector);
}

export function createElement(tagName, attributes, ...children) {
  const node = document.createElement(tagName);

  if (attributes) {
    Object.keys(attributes).forEach(key => {
      if (key === 'className') {
        const classes = attributes[key].split(' ');
        classes.forEach(x => node.classList.add(x));
      } else if (/^data-/.test(key)) {
        const dataProp = key
          .slice(5) // removes `data-`
          .split('-')
          .map((str, i) =>
            i === 0 ? str : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
          )
          .join('');
        node.dataset[dataProp] = attributes[key];
      } else {
        node.setAttribute(key, attributes[key]);
      }
    });
  }

  children.forEach(child => {
    if (typeof child === 'undefined' || child === null) {
      return;
    }
    if (typeof child === 'string') {
      node.appendChild(document.createTextNode(child));
    } else {
      node.appendChild(child);
    }
  });

  return node;
}

export const mouseTouch = () => ('ontouchstart' in document === true ? 'touchstart' : 'mousedown');
