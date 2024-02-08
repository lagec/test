'use strict';

import '../scss/style.scss';

const clearButton = document.querySelector('.search-bar__clear-icon'),
  form = document.querySelector('.search-bar'),
  rangeInput = document.querySelectorAll('.rangers input'),
  priceInput = document.querySelectorAll('.range__input-container input'),
  progress = document.querySelector('.slider-bar__progress'),
  rangeInputSingle = document.querySelectorAll('.rangers-single input'),
  progressSingle = document.querySelector('.slider-bar-single__progress'),
  percentInput = document.querySelectorAll('.range__input-single'),
  currentVal = document.querySelector('.current-values');
let boxValue = document.querySelector('.value');

// кнопка очистки формы поиска
clearButton.addEventListener('click', () => {
  document.querySelector('.search-bar__input').value = '';
});

// редирект на гугл
form.addEventListener('submit', e => {
  e.preventDefault();
  let searchValue = document.querySelector('.search-bar__input').value;
  searchValue = searchValue.replace(/\s+/g, '+');
  window.location.replace(`https://www.google.com/search?q=${searchValue}`);
});

// слайдер цены от/до
let priceGap = 50;

// через инпуты
priceInput.forEach(input => {
  input.addEventListener('input', e => {
    let minValue = parseInt(priceInput[0].value),
      maxValue = parseInt(priceInput[1].value);

    // проверка значений
    if (minValue < 0) {
      minValue = 1;

      priceInput[0].value = minValue;
      rangeInput[0].value = minValue;
      progress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
    } else if (maxValue.toString().length > 4) {
      maxValue = 9999;
      rangeInput[1].value = maxValue;
      progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
      priceInput[1].value = maxValue;
    }
    // если прошло проверку
    if (maxValue - minValue >= priceGap) {
      if (e.target.className === 'range__input-min range__input-field') {
        rangeInput[0].value = minValue;
        progress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
      } else {
        rangeInput[1].value = maxValue;
        progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
      }
    }
  });
});

// через ползунки
rangeInput.forEach(input => {
  input.addEventListener('input', e => {
    let minValue = parseInt(rangeInput[0].value),
      maxValue = parseInt(rangeInput[1].value);

    if (maxValue - minValue < priceGap) {
      if (e.target.className === 'ranger__min ranger') {
        rangeInput[0].value = maxValue - priceGap;
      } else {
        rangeInput[1].value = minValue + priceGap;
      }
    } else {
      priceInput[0].value = minValue;
      priceInput[1].value = maxValue;
      progress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
      progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
    }
  });
});

// single sliders

const singleValue = document.querySelector('.range__input-single');
const singleSlider = document.querySelector('.ranger__single');

singleSlider.oninput = () => {
  let value = singleSlider.value;
  singleValue.value = value;
  currentVal.classList.add('show');
};

singleSlider.onblur = () => {
  currentVal.classList.remove('show');
};

rangeInputSingle.forEach(input => {
  input.addEventListener('input', e => {
    let val = parseInt(rangeInputSingle[0].value);
    currentVal.classList.add('show');
    progressSingle.style.right = 100 - val + '%';

    currentVal.style.left = val + '%';
    boxValue.textContent = val;
  });
});

percentInput.forEach(input => {
  input.addEventListener('input', e => {
    let percent = parseInt(percentInput[0].value);

    if (isNaN(percent)) {
      boxValue.textContent = 0;
      progressSingle.style.right = '100%';
      rangeInputSingle[0].value = 0;
      currentVal.style.left = 0 + '%';
    } else {
      if (percent < 0) {
        percent = 0;
        progressSingle.style.right = '0%';
        rangeInputSingle[0].value = 0;
        percentInput[0].value = 0;
      } else if (percent >= 100) {
        percent = 100;
        progressSingle.style.right = '100%';
        rangeInputSingle[0].value = 100;
        percentInput[0].value = 100;
      }
      progressSingle.style.right = 100 - percent + '%';
      rangeInputSingle[0].value = percent;
      currentVal.style.left = percent + '%';
      boxValue.textContent = percent;
    }
  });
});

const classifiedDropdown = document.querySelector('.classified__dropdown'),
  classifieddropdownArrow = document.querySelector('.classified__dropdown-arrow');

classifiedDropdown.addEventListener('click', () => {
  if (classifieddropdownArrow.textContent.trim() === 'expand_more') {
    classifieddropdownArrow.textContent = 'expand_less';
  } else if (classifieddropdownArrow.textContent.trim() === 'expand_less') classifieddropdownArrow.textContent = 'expand_more';

  classifiedDropdown.classList.toggle('open');
});

function filterHandler(closeElement, checkElement, badgeElement) {
  closeElement.addEventListener('click', () => {
    checkElement.checked = false;
    badgeElement.style.display = 'none';
  });

  checkElement.addEventListener('click', () => {
    if (checkElement.checked) {
      badgeElement.style.display = 'flex';
    } else {
      badgeElement.style.display = 'none';
    }
  });
}

const elements = [
  {
    close: document.querySelector('.close-indica-full'),
    check: document.querySelector('.check__input-1'),
    badge: document.querySelector('.indica-full'),
  },
  {
    close: document.querySelector('.close-sativa-full'),
    check: document.querySelector('.check__input-2'),
    badge: document.querySelector('.sativa-full'),
  },
  {
    close: document.querySelector('.close-indica-half'),
    check: document.querySelector('.check__input-3'),
    badge: document.querySelector('.indica-half'),
  },
  {
    close: document.querySelector('.close-sativa-half'),
    check: document.querySelector('.check__input-4'),
    badge: document.querySelector('.sativa-half'),
  },
];

elements.forEach(({close, check, badge}) => {
  filterHandler(close, check, badge);
});
