(function(d, w) {
    'use strict';

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

        this.setOptions(options)
    };

    bwSlider.prototype.setOptions = function(options) {
        if (typeof options !== 'object' && options !== null) {
            return this.options = defaults
        }

        Object.keys(defaults).forEach(function(k) {
            options[k] = defaults[k]
        });

        this.options = options
    };

    bwSlider.prototype.buildSlider = function() {};

    bwSlider.prototype.buildControls = function() {};

    bwSlider.prototype.moveTo = function() {};

    w.bwSlider = bwSlider;
})(document, window);
