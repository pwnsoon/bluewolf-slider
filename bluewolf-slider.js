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
    };

    bwSlider.prototype.buildControls = function() {
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

    bwSlider.prototype.moveTo = function() {};

    w.bwSlider = bwSlider;

    function attachEvents() {
        // @TODO add events
    }

    function detachEvents() {
        // @TODO detach events
    }

    function destroy() {
        // @TODO delete slider instance
    }
})(document, window);
