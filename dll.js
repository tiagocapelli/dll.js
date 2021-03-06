// Double Lazy Load / dll.js | by dnp_theme
// MIT License 


// function(w){
	
	var dll = function(el,fn){
		this.el = typeof el === 'object' ? el : document.querySelector(el);
		this.fn = typeof fn === 'function' ? fn : null; // callback function
		this.src = this.el && this.el.getAttribute('data-src') || null; //element has own data-src attribute
		if (this.src||this.el.querySelector('[data-src]') !== null) { this.init() }
	}
	dll.prototype = {
		init: function() {
			var self = this, images = this.getElements();
			for (var i = 0; i < images.length; i++) {
				if ( i === images.length-1 && self.fn) {
					self.loader(images[i],self.fn);
				} else {
					self.loader(images[i])
				}
			}
		},		
		loader: function(el,fn) {
			var img = new Image(), f = fn, src = el.getAttribute('data-src');
			img.onload = function(){
				if (el.tagName === 'IMG') {
					el.src=src;
				} else {
					el.style.backgroundImage = 'url("'+src+'")';
				}	
				el.removeAttribute('data-src');
				if (f) { f() }
			}
			img.src = src
		},
		
		getElements: function() { //we get images of a given object or itself
			var q, self = this, imgs = [], items = this.el.querySelectorAll('[data-src]');
			if ( this.src && !items) {
				q = [this.el]		
			} else if ( !this.src && items ) {
				q = items
			} else if ( this.src && items ){
				q = items;
				// put element last in array, it may have a bigger image to load
				// than all childNodes combined
				imgs.push(this.el);
			} else if ( !this.src && !items ){
				q = document.querySelectorAll('[data-src]')
			}
			
			for (var i = q.length - 1; i >= 0; i--) { imgs.unshift(q[i]) }			
			return imgs
		}
	};
	var elementInViewport = function(el) { //check element is in viewport
		var rect = el.getBoundingClientRect();
		return ( 
			rect.top >= 0
			&& rect.left >= 0
			&& rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		)
	};
	
// }(window);
