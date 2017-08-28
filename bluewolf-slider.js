(function(d, w) {
    'use strict';

    var CONST = {
        innerWrapperClass: 'bw-inner-wrapper',
        slideClass: 'bw-slide-item',
        arrowClass: 'bw-arrow',
        arrowLeftClass: 'bw-arrow-left',
        arrowRightClass: 'bw-arrow-right'
    };

    var defaults = {
        speed: 2000
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

        this.$slider = {};
        this.$slider.container = $slider;

        this.setOptions(options);
        this.buildSlider();
        this.buildControls();
        attachEvents();
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

        length.forEach(function($slide) {
            $slide.className = CONST.slideClass;
            $innerWrapper.appendChild($slide);
        });

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

    bwSlider.prototype.moveTo = function(index) {};

    bwSlider.prototype.prev = function() {};

    bwSlider.prototype.next = function() {};

    bwSlider.prototype.stop = function() {};

    bwSlider.prototype.play = function() {};

    bwSlider.prototype.destroy = function() {
        if (!(this instanceof bwSlider)) return;

        detachEvents();
        this.$slider.container.remove();
        delete this.$slider;
        delete this.options;
    };

    w.bwSlider = bwSlider;

    function attachEvents() {
        // @TODO add events
    }

    function detachEvents() {
        // @TODO detach events
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

