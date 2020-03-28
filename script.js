

// Scroll

document.addEventListener('scroll', onScroll);

function onScroll(event) {
 const curPos = window.scrollY;
 const h2 = document.querySelectorAll('#container h2');
 const links = document.querySelectorAll('#menu li>a');

 h2.forEach((el) => {
 el.getAttribute('id');
 

 if (el.offsetTop <= curPos && (el.offsetHeight + el.offsetTop) > curPos) {
    links.forEach((a) => {
        a.classList.remove('nav-item-active');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
        a.classList.add('nav-item-active'); 
        
        }
    });
 };
});
}


//Slider

var slideShow = (function () {
    return function (selector, config) {
      var
        _slider = document.querySelector(selector), 
        _sliderContainer = _slider.querySelector('.slider__items'), 
        _sliderItems = _slider.querySelectorAll('.slider__item'), 
        _sliderControls = _slider.querySelectorAll('.slider__control'), 
        _currentPosition = 0, 
        _transformValue = 0, 
        _transformStep = 100, 
        _itemsArray = [], 
        _timerId,
        _indicatorItems,
        _indicatorIndex = 0,
        _indicatorIndexMax = _sliderItems.length - 1,
        _stepTouch = 50,
        _config = {
          isAutoplay: false, 
          directionAutoplay: 'next', 
          delayAutoplay: 5000, 
          isPauseOnHover: true 
        };

      
      for (var key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      
      for (var i = 0, length = _sliderItems.length; i < length; i++) {
        _itemsArray.push({ item: _sliderItems[i], position: i, transform: 0 });
      }

      
      var position = {
        getItemIndex: function (mode) {
          var index = 0;
          for (var i = 0, length = _itemsArray.length; i < length; i++) {
            if ((_itemsArray[i].position < _itemsArray[index].position && mode === 'min') || (_itemsArray[i].position > _itemsArray[index].position && mode === 'max')) {
              index = i;
            }
          }
          return index;
        },
        getItemPosition: function (mode) {
          return _itemsArray[position.getItemIndex(mode)].position;
        }
      };

      
      var _move = function (direction) {
        var nextItem, currentIndicator = _indicatorIndex;;
        if (direction === 'next') {
          _currentPosition++;
          if (_currentPosition > position.getItemPosition('max')) {
            nextItem = position.getItemIndex('min');
            _itemsArray[nextItem].position = position.getItemPosition('max') + 1;
            _itemsArray[nextItem].transform += _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue -= _transformStep;
          _indicatorIndex = _indicatorIndex + 1;
          if (_indicatorIndex > _indicatorIndexMax) {
            _indicatorIndex = 0;
          }
        } else {
          _currentPosition--;
          if (_currentPosition < position.getItemPosition('min')) {
            nextItem = position.getItemIndex('max');
            _itemsArray[nextItem].position = position.getItemPosition('min') - 1;
            _itemsArray[nextItem].transform -= _itemsArray.length * 100;
            _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
          }
          _transformValue += _transformStep;
          _indicatorIndex = _indicatorIndex - 1;
          if (_indicatorIndex < 0) {
            _indicatorIndex = _indicatorIndexMax;
          }
        }
        _sliderContainer.style.transform = 'translateX(' + _transformValue + '%)';
        
       
      };

     
      var _moveTo = function (index) {
        var i = 0, direction = (index > _indicatorIndex) ? 'next' : 'prev';
        while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
          _move(direction);
          i++;
        }
      };

      
   
      var _stopAutoplay = function () {
        clearInterval(_timerId);
      };

     
      var _addIndicators = function () {
        var indicatorsContainer = document.createElement('ol');
        indicatorsContainer.classList.add('slider__indicators');
        for (var i = 0, length = _sliderItems.length; i < length; i++) {
          var sliderIndicatorsItem = document.createElement('li');
          if (i === 0) {
            sliderIndicatorsItem.classList.add('active');
          }
          sliderIndicatorsItem.setAttribute("data-slide-to", i);
          indicatorsContainer.appendChild(sliderIndicatorsItem);
        }
        _slider.appendChild(indicatorsContainer);
        _indicatorItems = _slider.querySelectorAll('.slider__indicators > li')
      };

      var _isTouchDevice = function () {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
      };

      
      var _setUpListeners = function () {
        var _startX = 0;
        if (_isTouchDevice()) {
          _slider.addEventListener('touchstart', function (e) {
            _startX = e.changedTouches[0].clientX;
            _startAutoplay();
          });
          _slider.addEventListener('touchend', function (e) {
            var
              _endX = e.changedTouches[0].clientX,
              _deltaX = _endX - _startX;
            if (_deltaX > _stepTouch) {
              _move('prev');
            } else if (_deltaX < -_stepTouch) {
              _move('next');
            }
            _startAutoplay();
          });
        } else {
          for (var i = 0, length = _sliderControls.length; i < length; i++) {
            _sliderControls[i].classList.add('slider__control_show');
          }
        }
        _slider.addEventListener('click', function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            _move(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
            
          } else if (e.target.getAttribute('data-slide-to')) {
            e.preventDefault();
            _moveTo(parseInt(e.target.getAttribute('data-slide-to')));
            _startAutoplay();
          }
        });
       
      };
    
     
      _setUpListeners();
      

      return {
        next: function () {
          _move('next');
        },
                 
        left: function () {
          _move('prev');
        },
        
      }
    }
  }());

  slideShow('.slider', {
    isAutoplay: true
  });

 //Black bgr
function horizont() {
    elem = document.getElementById("black-horizontal"); 
    state = elem.style.display; 
    if (state =='block') elem.style.display='none'; 
    else elem.style.display='block'; 
 
  }

  function vertical() {
    elem = document.getElementById("black-vertical"); 
    state = elem.style.display; 
    if (state =='block') elem.style.display='none'; 
    else elem.style.display='block'; 
  }


 

//Swap img

const TAB = document.querySelectorAll('.item-nav');

function Swap() {
    let selector = '';
    let temp = Math.round(rand = 1 - 0.5 + Math.random() * (12 - 1 + 1));
    switch (temp) {
      case 1: selector = '[class="pic01"]'; break;
      case 2: selector = '[class="pic02"]'; break;
      case 3: selector = '[class="pic03"]'; break;
      case 4: selector = '[class="pic04"]'; break;
      case 5: selector = '[class="pic05"]'; break;
      case 6: selector = '[class="pic06"]'; break;
      case 7: selector = '[class="pic07"]'; break;
      case 8: selector = '[class="pic08"]'; break;
      case 9: selector = '[class="pic09"]'; break;
      case 10: selector = '[class="pic10"]'; break;
      case 11: selector = '[class="pic11"]'; break;
      case 12: selector = '[class="pic12"]'; break;
    }
    return document.querySelector(selector);
}

TAB.forEach(el => {
    el.addEventListener('click', (event) => {
      TAB.forEach(el => el.classList.remove('item-nav-active'));
      event.target.classList.add('item-nav-active');
  
      for (let i=0; i<20; i++){
        let first = Swap ();
        let second = Swap (); 
        second.after(first);
      }
    })
});

document.querySelectorAll('.item-image').forEach( (item) => {
    item.addEventListener('click', (evt) => {
      document.querySelectorAll('.item-image').forEach( (item) => {
        item.style.border = '0px solid #F06C64';
      })
      item.style.border = '5px solid #F06C64';
    })
  })

  
 //Message block

  const BUTTON = document.getElementById('btn');
  const CLOSE_BUTTON = document.getElementById('close-btn')

BUTTON.addEventListener('click', () => {
    event.preventDefault();

    let subject = document.getElementById('subject').value.toString();
    subject = subject === '' ? 'Без темы' : 'Тема: ' + subject;
    document.getElementById('result').innerText = subject;
    

    let description = document.getElementById('description').value.toString();
    description = description === '' ? 'Без описания' : 'Описание: ' + description;
    document.getElementById('result1').innerText = description;

    document.getElementById('message-block').classList.remove('hidden');
    
});

   
CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('result').innerText = '';
    document.getElementById('description').innerText = '';  
    document.getElementById('message-block').classList.add('hidden');
    window.location.reload();
});

