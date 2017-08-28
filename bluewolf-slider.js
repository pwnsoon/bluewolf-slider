(function(d, w) {
    'use strict';

    var CONST = {
        innerWrapperClass: 'bw-inner-wrapper',
        slideClass: 'bw-slide-item',
        arrowClass: 'bw-arrow',
        arrowLeftClass: 'bw-arrow-left',
        arrowRightClass: 'bw-arrow-right',
        currentClass: 'bw-current'
    };

    var defaults = {
        speed: 2000,
        animationClass: 'animate-1'
    };

    var bwSlider = function(container, options) {
        if (!container) {
            throw new Error('Missing slider container selector')
        }

        var $slider = d.querySelector(container);

        if ($slider === null) {
            throw new TypeError('Invalid container')
        }

        if (!(this instanceof bwSlider)) return new bwSlider(container, options);

        var self = this;
        this.$slider = {};
        this.$slider.container = $slider;
        this.slides = $slider.children.length;
        this.index = {
            current: 0,
            prev: null,
            set: function(index) {
                this.prev = this.current;
                this.current = index;
                animation.call(self);
            },
            get: function() {
                return this.current
            },
            getPrev: function () {
                return this.prev
            }
        };

        this.setOptions(options);
        this.buildSlider();
        this.buildControls();
        attachEvents.call(this);
    };

    bwSlider.prototype.setOptions = function(options) {
        if (typeof options !== 'object' && options !== null) {
            return this.options = defaults
        }

        Object.keys(defaults).forEach(function(k) {
            if (defaults[k] === undefined) options[k] = defaults[k]
        });

        this.options = options
    };

    bwSlider.prototype.buildSlider = function() {
        var $innerWrapper = document.createElement('div');
        $innerWrapper.className = CONST.innerWrapperClass;

        var length = [].slice.call(this.$slider.container.children);
        var process = function($slide, index) {
            $slide.className = CONST.slideClass;

            if (index === this.index.get()) {
                $slide.className += ' ' + CONST.currentClass;
            }

            $innerWrapper.appendChild($slide);
        };

        length.forEach(process.bind(this));

        this.$slider.container.appendChild($innerWrapper);
        this.$slider.slides = this.$slider.container.querySelectorAll('.bw-slide-item');
    };

    bwSlider.prototype.buildControls = function() {
        if (this.$slider.slides.length <= 1) return;

        var $leftArrow = document.createElement('span');
        var $rightArrow = document.createElement('span');

        this.$slider.arrows = {
            left: $leftArrow,
            right: $rightArrow
        };

        $leftArrow.classList.add(CONST.arrowClass, CONST.arrowLeftClass);
        $rightArrow.classList.add(CONST.arrowClass, CONST.arrowRightClass);

        this.$slider.container.appendChild($leftArrow);
        this.$slider.container.appendChild($rightArrow);
    };

    bwSlider.prototype.moveTo = function(index) {
        if (index <= 0 || index >= this.slides) {
            throw new Error('Invalid slide index')
        }

        this.index.set(index);
    };

    bwSlider.prototype.prev = function() {
        if (this.index.get() - 1 < 0) {
            return this.index.set(this.slides - 1);
        }

        this.index.set(this.index.get() - 1);
    };

    bwSlider.prototype.next = function() {
        if (this.index.get() >= this.slides - 1) {
            return this.index.set(0)
        }

        this.index.set(this.index.get() + 1);
    };

    bwSlider.prototype.stop = function() {
        //@TODO add stop auto slide change
    };

    bwSlider.prototype.play = function() {
        //@TODO add auto slide change
    };

    bwSlider.prototype.destroy = function() {
        if (!(this instanceof bwSlider)) return;

        detachEvents.call(this);
        this.$slider.container.remove();
        delete this.$slider;
        delete this.options;
    };

    w.bwSlider = bwSlider;

    function animation() {
        var classList = [this.options.animationClass, CONST.currentClass];

        removeClass(classList, this.$slider.slides[this.index.getPrev()]);
        addClass(classList, this.$slider.slides[this.index.get()]);
    }

    function addClass(classList, $element) {
        classList.forEach(function(className) {
            $element.classList.add(className)
        })
    }

    function removeClass(classList, $element) {
        classList.forEach(function(className) {
            $element.classList.remove(className)
        })
    }

    function attachEvents() {
        this.$slider.arrows.left.addEventListener('click', this.prev.bind(this));
        this.$slider.arrows.right.addEventListener('click', this.next.bind(this));
    }

    function detachEvents() {
        this.$slider.arrows.left.removeEventListener('click', this.prev);
        this.$slider.arrows.right.removeEventListener('click', this.next);
    }
})(document, window);

/* polyfill for DOM.remove() */
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

