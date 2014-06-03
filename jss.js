/************************************

	ver. 0.1
	Author : Jang Jeong Sik
	
	how to JSS
	SELECTOR(class) : jss('h1.a'), jss('.a');
	SELECTOR(id) : jss('#a');

	Method(Functions);
	SHOW : jss(selector).show();
	HIDE : jss(selector).hide();

*************************************/
(function(global){
	'use strict';
	// jss infinitive
	var jss = function(selector){
		var s = $(selector);
		return new jss.fn.init(s);
	};

	// jss.prototype, js.fn
	jss.fn = jss.prototype = {
		constructor : jss,
		init : function(s){
			this.s = s;
			this.length = s.length;
			return this;
		},
		each : function(obj, callback){
			var	i = 0, value, len = obj.length;
			for(; i < len; i++){
				value = callback.call(obj.s[i], i);
				if(value === false) break;
			}
			return obj;
		},
		returnArray : function(obj, callback){
			var i, value, ret = [];
			for(i in obj){
				value = callback.call(obj[i], i);
				if(value != null) ret.push(value);
			}
			return ret;
		}
	};

	jss.fn.init.prototype = jss.fn;

	/* common functions */
	jss.fn.hide = function(){
		this.each(this, function(){
			this.style.display = 'none';
		});
		return this;
	};

	jss.fn.show = function(){
		this.each(this, function(){
			this.style.display = '';
		});
		return this;
	};
	
	jss.fn.css = function(c){
		var args = c, value = [];
		if(typeof args === 'object') value = $$.returnArray(args, function(key){
			return value.concat(key, this);
		});
		
		this.each(this, function(){
			for(var i = 0; i < value.length; i++){
				for(var j = 0; j < value[i].length; j++){
					this.style[value[i][j]] = value[i][j+1];
				}
			}
		});
	};

	jss.fn.dmLayer = function(dimm, layer){
		var dimm = $(dimm).s[0],
			layer = $(layer);
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
			type = selector.charAt(0), tree, s, parser = jssParser(selector);

		return doc['querySelectAll'] ? doc.querySelectAll(selector) : (function(){
			if(selector && selector.constructor === String){
				if(type === '#'){
					doc['getElementById'] ? s =  doc.getElementById(selector.substr(1)) : false;
				} else if(parser){
					parser[0] != '' && parser[0] != null ? tree = doc.getElementsByTagName(parser[0]) : tree = doc.getElementsByTagName('*');
					s = [];
					if(regexp.exec(parser[1]).length > 0){
						for(var i = 0, len = tree.length; i < len; i++){
							tree[i].className == parser[1] ? s.push(tree[i]) : false;
						}
					}
				}
				return s;
			}
		})();
	}, $ = jssExplore, $$ = jss.fn; // internal object

	// global object
	global.jss = jss;
})(window);
