/**
 * jQuery Picture
 * http://jquerypicture.com
 * http://github.com/Abban/jQuery-Picture
 * 
 * May 2012
 * 
 * @version 0.9
 * @author Abban Dunne http://abandon.ie
 * @license MIT
 * 
 * jQuery Picture is a plugin to add support for responsive images to your layouts.
 * It supports both figure elements with some custom data attributes and the new
 * proposed picture format. This plugin will be made redundant when the format is
 * approved and implemented by browsers. Lets hope that happens soon. In the meantime
 * this plugin will be kept up to date with latest developments.
 * 
 */
(function($){

	$.fn.picture = function(args){

		var defaults = {

			container : null,
			ignorePixelRatio: false

        };
		
		var settings = $.extend({}, defaults, args);

		this.each(function(){

			var breakpoints = new Array();

			var windowWidth, currentMedia, element, timeoutOffset;

			// Check the device pixel ratio
			var PixelRatio = 1;
			if(!settings.ignorePixelRatio && window.devicePixelRatio !== undefined) PixelRatio = window.devicePixelRatio;

			// Save off the element so it can be easily used inside a function
			element = $(this);
			
			// Initialise the images
			getCurrentMedia(true);

			// Only call the image resize function 200ms after window stops being resized
			timeoutOffset = false;
			
			$(window).resize(function(){
				
				if(timeoutOffset !== false)
					clearTimeout(timeoutOffset);
				
				timeoutOffset = setTimeout(getCurrentMedia, 200);
			
			});


			/**
			 * getCurrentMedia
			 * 
			 * Checks the window width off the media query types and selects the current one.
			 * Calls the setPicture or setFigure function to set the image.
			 * 
			 */
			function getCurrentMedia(init){

				if(init){
					
					if(element.get(0).tagName.toLowerCase() == 'figure'){

						var mediaObj = element.data();

						$.each(mediaObj, function(media){

							var num;

							num = media.replace(/[^\d.]/g, '');

							if(num)
								breakpoints.push(num);

						});

					}else{

						element.find('source').each(function(){

							var media, num;

							media = $(this).attr('media');

							if(media){

								num = media.replace(/[^\d.]/g, '');

								breakpoints.push(num);
							}

						});

					}

				}

				var c = 0;
				
				// Check if user defined container, otherwise take window
				if (settings.container == null){
				
					windowWidth = ($(window).width()) * PixelRatio;
				
				}else{
				
					windowWidth = ($(settings.container).width()) * PixelRatio;
				
				}

				// Set the c variable to the current media width
				$.each(breakpoints, function(i,v){
					
					if(parseInt(windowWidth) >= parseInt(v) && parseInt(c) <= parseInt(v))
						c = v;

				});

				if(currentMedia !== c){
					currentMedia = c;

					if(element.get(0).tagName.toLowerCase() == 'figure')
						setFigure();
					else
						setPicture();
				}

			}


			/**
			 * setPicture
			 * 
			 * Pulls the image src and media attributes from the source tags and sets
			 * the src of the enclosed img tag to the appropriate one.
			 * 
			 */
			function setPicture(){

				var sizes = new Object();

				element.find('source').each(function(){

					var media, path, num;
					media = $(this).attr('media');
					path = $(this).attr('src');

					if(media)
						num = media.replace(/[^\d.]/g, '');
					else
						num = 0;

					sizes[num] = path;

				});

				if(element.find('img').length == 0){

					var prep = '<img src="' + sizes[currentMedia] + '" style="' + element.attr('style') + '" alt="' + element.attr('alt') + '">';

					if($('>a', element).length == 0){

						element.append(prep);

					}else{

						$('>a', element).append(prep);

					}

				}else{
					
					element.find('img').attr('src', sizes[currentMedia]);

				}

			}


			/**
			 * setFigure
			 * 
			 * Pulls the image src and and media values from the data attributes
			 * and sets the src of the enclosed img tag to the appropriate one.
			 * 
			 */
			function setFigure(){

				var sizes = new Object();

				var mediaObj = element.data();

				$.each(mediaObj, function(media, path){

					var num;

					num = media.replace(/[^\d.]/g, '');

					if(!num)
						num = 0;

					sizes[num] = path;

				});

				if(element.find('img').length == 0){

					var prep = '<img src="' + sizes[currentMedia] + '" alt="' + element.attr('title') + '">';

					if($('>a', element).length == 0){

						element.append(prep);

					}else{

						$('>a', element).append(prep);

					}

				}else{

					element.find('img').attr('src', sizes[currentMedia]);

				}

			}

		});

	};

})(jQuery);
/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2012, Licensed GPL & MIT
 *
*/

window.Swipe = function(element, options) {

  var _this = this;

  // return immediately if element doesn't exist
  if (!element) return;

  // reference dom elements
  this.container = element;
  this.element = this.container.children[0];

  // simple feature detection
  this.browser = {
    touch: (function() {
      return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    })(),
    transitions: (function() {
      var temp = document.createElement('swipe'),
          props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
      for ( var i in props ) {
        if (temp.style[ props[i] ] !== undefined) return true;
      }
      return false;
    })()
  };

  // retreive options
  options = options || {};
  this.index = options.startSlide || 0;
  this.speed = options.speed || 300;
  this.callback = options.callback || function() {};
  this.transitionEnd = options.transitionEnd || function() {};
  this.delay = options.auto || 0;
  this.cont = (options.continuous != undefined) ? !!options.continuous : true;
  this.disableScroll = !!options.disableScroll;

  // verify index is a number not string
  this.index = parseInt(this.index,10);

  // trigger slider initialization
  this.setup();

  // begin auto slideshow
  this.begin();

  // add event listeners
  if (this.element.addEventListener) {
    if (!!this.browser.touch) {
      this.element.addEventListener('touchstart', this, false);
      this.element.addEventListener('touchmove', this, false);
      this.element.addEventListener('touchend', this, false);
    }
    if (!!this.browser.transitions) {
      this.element.addEventListener('webkitTransitionEnd', this, false);
      this.element.addEventListener('msTransitionEnd', this, false);
      this.element.addEventListener('oTransitionEnd', this, false);
      this.element.addEventListener('transitionend', this, false);
    }
    window.addEventListener('resize', this, false);
  }

  // to play nice with old IE
  else {
    window.onresize = function () {
      _this.setup();
    };
  }

};

Swipe.prototype = {

    setup: function () {

        // get and measure amt of slides
        this.slides = this.element.children;
        this.length = this.slides.length;
        this.cache = new Array(this.length);

        // return immediately if their are less than two slides
        if (this.length < 2) return;

        // determine width of each slide
        this.width = this.container.getBoundingClientRect().width || this.container.offsetWidth;

        // return immediately if measurement fails
        if (!this.width) return;

        // store array of slides before, current, and after
        var refArray = [[], [], []];

        this.element.style.width = (this.slides.length * this.width) + 'px';

        // stack elements
        for (var index = this.length - 1; index > -1; index--) {

            var elem = this.slides[index];

            elem.style.width = this.width + 'px';
            elem.setAttribute('data-index', index);

            if (this.browser.transitions) {
                elem.style.left = (index * -this.width) + 'px';
            }

            // add this index to the reference array    0:before 1:equal 2:after
            refArray[this.index > index ? 0 : (this.index < index ? 2 : 1)].push(index);

        }

        if (this.browser.transitions) {

            // stack left, current, and right slides
            this._stack(refArray[0], -1);
            this._stack(refArray[1], 0);
            this._stack(refArray[2], 1);

        }

        this.container.style.visibility = 'visible';

    },

    kill: function () {

        // cancel slideshow
        this.delay = 0;
        clearTimeout(this.interval);

        // clear all translations
        var slideArray = [];
        for (var i = this.slides.length - 1; i >= 0; i--) {
            this.slides[i].style.width = '';
            slideArray.push(i);
        }
        this._stack(slideArray, 0);

        var elem = this.element;
        elem.className = elem.className.replace('swipe-active', '');

        // remove event listeners
        if (this.element.removeEventListener) {
            if (!!this.browser.touch) {
                this.element.removeEventListener('touchstart', this, false);
                this.element.removeEventListener('touchmove', this, false);
                this.element.removeEventListener('touchend', this, false);
            }
            if (!!this.browser.transitions) {
                this.element.removeEventListener('webkitTransitionEnd', this, false);
                this.element.removeEventListener('msTransitionEnd', this, false);
                this.element.removeEventListener('oTransitionEnd', this, false);
                this.element.removeEventListener('transitionend', this, false);
            }
            window.removeEventListener('resize', this.resize, false);
        }

        // kill old IE! you can quote me on that ;)
        else {
            window.onresize = null;
        }

    },

    getPos: function () {

        // return current index position
        return this.index;

    },

    prev: function (delay) {

        // cancel slideshow
        this.delay = delay || 0;
        clearTimeout(this.interval);

        // if not at first slide
        if (this.index) this.slide(this.index - 1, this.speed);
        else if (this.cont) this.slide(this.length - 1, this.speed);

    },

    next: function (delay) {
        // cancel slideshow
        this.delay = delay || 0;
        clearTimeout(this.interval);
        if (this.index < this.length - 1) this.slide(this.index + 1, this.speed); // if not last slide
        else if (this.cont) this.slide(0, this.speed); //if last slide return to start
        if (this.delay) { this.begin(); }
    },

    begin: function () {
        var _this = this;
        this.interval = (this.delay)
          ? setTimeout(function () {
              _this.next(_this.delay);
          }, this.delay)
          : 0;
    },

    end: function (){
        this.delay = 0;
        clearTimeout(this.interval);
    },

    handleEvent: function (e) {
        switch (e.type) {
            case 'touchstart': this.onTouchStart(e); break;
            case 'touchmove': this.onTouchMove(e); break;
            case 'touchend': this.onTouchEnd(e); break;
            case 'webkitTransitionEnd':
            case 'msTransitionEnd':
            case 'oTransitionEnd':
            case 'transitionend': this.onTransitionEnd(e); break;
            case 'resize': this.setup(); break;
        }

        e.stopPropagation();
    },

    onTouchStart: function (e) {

        var _this = this;

        _this.start = {

            // get touch coordinates for delta calculations in onTouchMove
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY,

            // set initial timestamp of touch sequence
            time: Number(new Date())

        };

        // used for testing first onTouchMove event
        _this.isScrolling = undefined;

        // reset deltaX
        _this.deltaX = 0;

    },

    onTouchMove: function (e) {

        var _this = this;

        // ensure swiping with one touch and not pinching
        if (e.touches.length > 1 || e.scale && e.scale !== 1) return;

        _this.deltaX = e.touches[0].pageX - _this.start.pageX;

        // determine if scrolling test has run - one time test
        if (typeof _this.isScrolling == 'undefined') {
            _this.isScrolling = !!(_this.isScrolling || Math.abs(_this.deltaX) < Math.abs(e.touches[0].pageY - _this.start.pageY));
        }

        // if user is not trying to scroll vertically
        if (!_this.isScrolling) {

            // prevent native scrolling 
            e.preventDefault();

            // cancel slideshow
            _this.delay = 0;
            clearTimeout(_this.interval);

            // increase resistance if first or last slide
            _this.deltaX =
                _this.deltaX /
                  ((!_this.index && _this.deltaX > 0               // if first slide and sliding left
                    || _this.index == _this.length - 1              // or if last slide and sliding right
                    && _this.deltaX < 0                            // and if sliding at all
                  ) ?
                  (Math.abs(_this.deltaX) / _this.width + 1)      // determine resistance level
                  : 1);                                          // no resistance if false

            // translate immediately 1:1
            _this._move([_this.index - 1, _this.index, _this.index + 1], _this.deltaX);

        } else if (_this.disableScroll) {

            // prevent native scrolling 
            e.preventDefault();

        }

    },

    onTouchEnd: function (e) {

        var _this = this;

        // determine if slide attempt triggers next/prev slide
        var isValidSlide =
          Number(new Date()) - _this.start.time < 250      // if slide duration is less than 250ms
          && Math.abs(_this.deltaX) > 20                   // and if slide amt is greater than 20px
          || Math.abs(_this.deltaX) > _this.width / 2,        // or if slide amt is greater than half the width

        // determine if slide attempt is past start and end
        isPastBounds =
          !_this.index && _this.deltaX > 0                          // if first slide and slide amt is greater than 0
          || _this.index == _this.length - 1 && _this.deltaX < 0,    // or if last slide and slide amt is less than 0

        direction = _this.deltaX < 0; // true:right false:left

        // if not scrolling vertically
        if (!_this.isScrolling) {

            if (isValidSlide && !isPastBounds) {
                if (direction) {
                    _this._stack([_this.index - 1], -1);
                    _this._slide([_this.index, _this.index + 1], -_this.width, _this.speed);
                    _this.index += 1;
                } else {
                    _this._stack([_this.index + 1], 1);
                    _this._slide([_this.index - 1, _this.index], _this.width, _this.speed);
                    _this.index += -1;
                }
                _this.callback(_this.index, _this.slides[_this.index]);
            } else {
                _this._slide([_this.index - 1, _this.index, _this.index + 1], 0, _this.speed);
            }

        }

    },

    onTransitionEnd: function (e) {
        if (this._getElemIndex(e.target) == this.index) { // only call transition end on the main slide item
            //if (this.delay) this.begin();
            this.transitionEnd(this.index, this.slides[this.index]);
        }
    },

    slide: function (to, speed) {

        var from = this.index;

        if (from == to) return; // do nothing if already on requested slide

        if (this.browser.transitions) {
            var toStack = Math.abs(from - to) - 1,
          direction = Math.abs(from - to) / (from - to), // 1:right -1:left
          inBetween = [];

            while (toStack--) inBetween.push((to > from ? to : from) - toStack - 1);

            // stack em
            this._stack(inBetween, direction);

            // now slide from and to in the proper direction
            this._slide([from, to], this.width * direction, this.speed);
        }
        else {
            this._animate(from * -this.width, to * -this.width, this.speed)
        }

        this.index = to;

        this.callback(this.index, this.slides[this.index]);

    },

    _slide: function (nums, dist, speed) {

        var _slides = this.slides,
        l = nums.length;

        while (l--) {

            this._translate(_slides[nums[l]], dist + this.cache[nums[l]], speed ? speed : 0);

            this.cache[nums[l]] += dist;

        }

    },

    _stack: function (nums, pos) {  // pos: -1:left 0:center 1:right

        var _slides = this.slides,
        l = nums.length,
        dist = this.width * pos;

        while (l--) {

            this._translate(_slides[nums[l]], dist, 0);

            this.cache[nums[l]] = dist;

        }

    },

    _move: function (nums, dist) { // 1:1 scrolling

        var _slides = this.slides,
        l = nums.length;

        while (l--) this._translate(_slides[nums[l]], dist + this.cache[nums[l]], 0);

    },

    _translate: function (elem, xval, speed) {

        if (!elem) return;

        var style = elem.style;

        // set duration speed to 0
        style.webkitTransitionDuration =
        style.MozTransitionDuration =
        style.msTransitionDuration =
        style.OTransitionDuration =
        style.transitionDuration = speed + 'ms';

        // translate to given position
        style.webkitTransform = 'translate3d(' + xval + 'px,0,0)';
        style.msTransform =
        style.MozTransform =
        style.OTransform = 'translateX(' + xval + 'px)';

    },

    _animate: function (from, to, speed) {

        var elem = this.element;

        if (!speed) { // if not an animation, just reposition

            elem.style.left = to + 'px';

            return;

        }

        var _this = this,
        start = new Date(),
        timer = setInterval(function () {

            var timeElap = new Date() - start;

            if (timeElap > speed) {

                elem.style.left = to + 'px';  // callback after this line

                if (_this._getElemIndex(elem) == _this.index) { // only call transition end on the main slide item

                    if (_this.delay) _this.begin();

                    _this.transitionEnd(_this.index, _this.slides[_this.index]);

                }

                clearInterval(timer);

                return;

            }

            elem.style.left = (((to - from) * (Math.floor((timeElap / speed) * 100) / 100)) + from) + 'px';

        }, 4);

    },

    _getElemIndex: function (elem) {

        return parseInt(elem.getAttribute('data-index'), 10);

    }

};


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        var _this = $(this);
        _this.data('Swipe', new Swipe(_this[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}
/**
 * jQuery Picture
 * http://jquerypicture.com
 * http://github.com/Abban/jQuery-Picture
 * 
 * May 2012
 * 
 * @version 0.9
 * @author Abban Dunne http://abandon.ie
 * @license MIT
 * 
 * jQuery Picture is a plugin to add support for responsive images to your layouts.
 * It supports both figure elements with some custom data attributes and the new
 * proposed picture format. This plugin will be made redundant when the format is
 * approved and implemented by browsers. Lets hope that happens soon. In the meantime
 * this plugin will be kept up to date with latest developments.
 * 
 */(function(e){e.fn.picture=function(t){var n={container:null,ignorePixelRatio:!1},r=e.extend({},n,t);this.each(function(){function a(o){if(o)if(s.get(0).tagName.toLowerCase()=="figure"){var a=s.data();e.each(a,function(e){var n;n=e.replace(/[^\d.]/g,"");n&&t.push(n)})}else s.find("source").each(function(){var n,r;n=e(this).attr("media");if(n){r=n.replace(/[^\d.]/g,"");t.push(r)}});var c=0;r.container==null?n=e(window).width()*u:n=e(r.container).width()*u;e.each(t,function(e,t){parseInt(n)>=parseInt(t)&&parseInt(c)<=parseInt(t)&&(c=t)});if(i!==c){i=c;s.get(0).tagName.toLowerCase()=="figure"?l():f()}}function f(){var t=new Object;s.find("source").each(function(){var n,r,i;n=e(this).attr("media");r=e(this).attr("src");n?i=n.replace(/[^\d.]/g,""):i=0;t[i]=r});if(s.find("img").length==0){var n='<img src="'+t[i]+'" style="'+s.attr("style")+'" alt="'+s.attr("alt")+'">';e(">a",s).length==0?s.append(n):e(">a",s).append(n)}else s.find("img").attr("src",t[i])}function l(){var t=new Object,n=s.data();e.each(n,function(e,n){var r;r=e.replace(/[^\d.]/g,"");r||(r=0);t[r]=n});if(s.find("img").length==0){var r='<img src="'+t[i]+'" alt="'+s.attr("title")+'">';e(">a",s).length==0?s.append(r):e(">a",s).append(r)}else s.find("img").attr("src",t[i])}var t=new Array,n,i,s,o,u=1;!r.ignorePixelRatio&&window.devicePixelRatio!==undefined&&(u=window.devicePixelRatio);s=e(this);a(!0);o=!1;e(window).resize(function(){o!==!1&&clearTimeout(o);o=setTimeout(a,200)})})}})(jQuery);
if (Ektron === undefined) {
    Ektron = {};
}

if (Ektron.PFWidgets === undefined) {
    Ektron.PFWidgets = {};
}

Ektron.PFWidgets.EktronMobileSlider = {
    speed: 1000,
    auto: 7000,
    wrapperClass: 'ektron-gallery-slides-wrapper',
    rightClass: 'ektron-gallery-slides-right',
    thumbsAppend: '_thumbs',
    init: function (settings) {
        var activeIndicatorClass = "ektron-indicator-active";
        var fullDiv = false;
        var halfDiv = false;
        var wrapper = false;
        if (settings.GalleryEnabled) {
            wrapper = this.SetWrapperDivs(settings);
            if (wrapper.parent && wrapper.thumbs && wrapper.right) {
                fullDiv = wrapper.parent;
                halfDiv = wrapper.right;
                $(fullDiv).css("background-color", "#" + settings.InitColorLeft);
                $(halfDiv).css("background-color", "#" + settings.InitColorRight);
                wrapper.thumbs.html("");
                $("#" + settings.ContainerID + " .ektron-slide-thumbnail-list").appendTo(wrapper.thumbs).show();
                var firstSlide = $("#" + settings.ContainerID + this.thumbsAppend + " .ektron-slide-thumbnail").get(0);
                $(firstSlide).addClass(activeIndicatorClass);
            }
        } else {
            var firstSlide = $("#" + settings.ContainerID + " .ektron-slide-indicator").get(0);
            $(firstSlide).addClass(activeIndicatorClass);
        }
        $("#" + settings.ContainerID + " .ektron-swipe-item").css("display", "block");
        var figure = $("#" + settings.ContainerID + " figure.ektron-slider-figure");
        if (figure.is(":visible")) {
            figure.picture();
        } else {
            Ektron.Com.Functions.DoOnResize(767, "greaterThan", figure.picture());
        }
        if ($("#" + settings.ContainerID + " .ektron-swipe-item").length > 1) {
            var slider = new Swipe(document.getElementById(settings.SwipeID),
            {
                startSlide: 0,
                speed: Ektron.PFWidgets.EktronMobileSlider.speed,
                auto: Ektron.PFWidgets.EktronMobileSlider.auto,
                continuous: true,
                disableScroll: false,
                callback: function () {
                    // runs at slide change
                    // code below performs background transitions, runs at all resulutions where gallery is enabled
                    if (settings.GalleryEnabled) {
                        var index = slider.getPos();
                        var selectedItem = $("#" + settings.ContainerID + Ektron.PFWidgets.EktronMobileSlider.thumbsAppend + " .ektron-slide-thumbnail").get(index);
                        var leftColor = $(selectedItem).attr("data-left");
                        var rightColor = $(selectedItem).attr("data-right");
                        if ($(this).find(".ektron-alternate-view").is(":visible")) {
                            $(fullDiv).stop().animate({ backgroundColor: "#" + $($(this).find(".ektron-alternate-view").get(index)).data("color") }, Ektron.PFWidgets.EktronMobileSlider.speed);
                        } else {
                            $(fullDiv).stop().animate({ backgroundColor: "#" + leftColor }, Ektron.PFWidgets.EktronMobileSlider.speed);
                        }
                        $(halfDiv).stop().animate({ backgroundColor: "#" + rightColor }, Ektron.PFWidgets.EktronMobileSlider.speed);
                        // change the indicator / thumbnail
                        if (settings.GalleryEnabled) {
                            var selectedItem = $("#" + settings.ContainerID + Ektron.PFWidgets.EktronMobileSlider.thumbsAppend + " .ektron-slide-thumbnail").get(index);
                            $("#" + settings.ContainerID + Ektron.PFWidgets.EktronMobileSlider.thumbsAppend + " .ektron-slide-thumbnail").removeClass(activeIndicatorClass);
                            $(selectedItem).addClass(activeIndicatorClass);
                        } else {
                            var selectedItem = $("#" + settings.ContainerID + " .ektron-slide-indicator").get(index);
                            $("#" + settings.ContainerID + " .ektron-slide-indicator").removeClass(activeIndicatorClass);
                            $(selectedItem).addClass(activeIndicatorClass);
                        }
                    }
                },
                transitionEnd: function () {
                    // runs at slide change end
                    // doesn't work in IE so code moved to callback function
                }
            });
            $("#" + settings.ContainerID + " .swipeNext").on("click", function (e) {
                e.preventDefault();
                slider.next();
            });
            $("#" + settings.ContainerID + " .swipePrev").on("click", function (e) {
                e.preventDefault();
                slider.prev();
            });
            $("#" + settings.ContainerID + " .ektron-slide-indicator, #" + settings.ContainerID + this.thumbsAppend + " .ektron-slide-thumbnail").on("click", function (e) {
                e.preventDefault();
                slider.end();
                var index = $("#" + settings.ContainerID + " .ektron-slide-indicator, #" + settings.ContainerID + Ektron.PFWidgets.EktronMobileSlider.thumbsAppend + " .ektron-slide-thumbnail").index(this);
                slider.slide(index, Ektron.PFWidgets.EktronMobileSlider.speed);
                $("#" + settings.ContainerID + " .ektron-slide-indicator, #" + settings.ContainerID + Ektron.PFWidgets.EktronMobileSlider.thumbsAppend + " .ektron-slide-thumbnail").removeClass(activeIndicatorClass);
                $(this).addClass(activeIndicatorClass);
            });
        } else {
            $("#" + settings.ContainerID + " .ektron-slide-indicator").hide();
            $("#" + settings.ContainerID + " .ektron-swipe-slider").show().css("visibility", "visible");
        }
    },
    SetWrapperDivs: function (settings) {
        var parent = false;
        var thumbContainer = false;
        var right = false;
        var bsContainer = $($("#" + settings.ContainerID).parents(".container")[0]);
        if (bsContainer != undefined) {
            thumbContainer = $("<div id='" + settings.ContainerID + this.thumbsAppend + "' />").insertBefore(bsContainer);
            bsContainer.wrap("<div class='" + this.wrapperClass + "' />");
            parent = bsContainer.parent();
            rightContainer = $("<div class='" + this.rightClass + "' />").insertBefore(bsContainer);
        }
        return { parent: parent, thumbs: thumbContainer, right: rightContainer };
    },
    ConfigureTextPositioning: function (settings) {
        var breakpoints = new Array();
        var windowWidth, currentMedia, element, timeoutOffset;
        var pixelRatio = 1;
        if (window.devicePixelRatio !== undefined) pixelRatio = window.devicePixelRatio;
        element = $("#" + settings.ContainerID);
        //initialize text
        SetTextPosition(true);
        timeoutOffset = false;
        $(window).resize(function () {
            if (timeoutOffset !== false) {
                clearTimeout(timeoutOffset);
            }
            timeoutOffset = setTimeout(SetTextPosition, 200);
        });

        function SetTextPosition(initSetting) {
            if (initSetting) {
                var mediaObj = element.data();
                $.each(mediaObj, function (media) {
                    var num;
                    num = media.replace(/[^\d.]/g, '');
                    if (num)
                        breakpoints.push(num);
                });
            }
            var c = 0;
            windowWidth = ($(window).width()) * pixelRatio;
            $.each(breakpoints, function (i, v) {
                if (parseInt(windowWidth) >= parseInt(v) && parseInt(c) <= parseInt(v))
                    c = v;
            });
            if (currentMedia !== c) {
                currentMedia = c;
                var positions = new Object();
                var mediaObj = element.data();
                $.each(mediaObj, function (media, position) {
                    var num;
                    num = media.replace(/[^\d.]/g, '');
                    if (!num)
                        num = 0;
                    positions[num] = position;
                });
                var pos = positions[currentMedia];
                if (pos == '-1x-1') {
                    element.css({
                        'position': 'static',
                        'left': '0',
                        'top': '0',
                        'width': 'auto'
                    });
                } else {
                    var coords = pos.split('x');
                    var left = coords[0];
                    var top = coords[0];
                    element.css({
                        'position': 'absolute',
                        'left': left + 'px',
                        'top': top + 'px'//,
                        //'width': 'auto'
                    });
                }
            }
        }
    }
}

