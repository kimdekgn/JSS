/************************************

	ver. 0.1
	how to JSS
	SELECTOR(class) : jss('h1.a'), jss('.a');
	SELECTOR(id) : jss('#a');

	Method(Functions);
	SHOW : jss(selector).show();
	HIDE : jss(selector).hide();;;;;;;

*************************************/
(function(global){
	'use strict';
	// jss infinitive
	var jss = function(selector){
		var items = $(selector);
		return new jss.fn.init(items);
	};

	// jss.prototype, js.fn
	jss.fn = jss.prototype = {
		constructor : jss,
		init : function(items){
			this.items = items;
			this.length = items.length;
			return this;
		},
		each : function(recurr){
			for(var i = 0, len = this.length; i < len; i++){
				recurr.call(this.items[i], i);
			}
			return this;
		}
	};

	jss.fn.init.prototype = jss.fn;

	/* common functions */
	jss.fn.hide = function(){
		this.each(function(i){
			this.style.display = 'none';
		});
		return this;
	};

	jss.fn.show = function(){
		this.each(function(i){
			this.style.display = '';
		});
		return this;
	};

	/* selector */
	var doc = document,

	jssParser = function(selector){
		if(selector.length > 0 && selector.indexOf('.') > -1){
			var tmp = [];
			return tmp = selector.split('.');
		}
		else {return false;}
	},
	
	jssExplore = function(selector){
		var regexp = /^([#.]?)([a-z0-9\\*_-]*)$/i,
			type = selector.charAt(0), tree, items, parser = jssParser(selector);

		return doc['querySelectAll'] ? doc.querySelectAll(selector) : (function(){
			if(selector && selector.constructor === String){
				if(type === '#'){
					doc['getElementById'] ? items =  doc.getElementById(selector.substr(1)) : items = '';
				} else if(parser){
					parser[0] != '' && parser[0] != null ? tree = doc.getElementsByTagName(parser[0]) : tree = doc.getElementsByTagName('*');
					items = [];
					if(regexp.exec(parser[1]).length > 0){
						for(var i = 0, len = tree.length; i < len; i++){
							tree[i].className == parser[1] ? items.push(tree[i]) : items;
						}
					}
				}
				return items;
			}
		})();
	}, $ = jssExplore; // internal object
	
	// global object
	global.jss = jss;
})(window);