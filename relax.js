/*
*
* @Note: relax javascript is library
*
* @Ver: 1.0.0
* 
* @Author: xiayu chen
* 
* @Email: appcxy@gmail.com
* 
* @Date: 2016-07
*
*/
;
(function( win, undefined ){
	var win = win;
	var doc = win.document;
	var nav = win.navigator;
	var utils = {};

	var relax = function( selector ){
		return new _relax().init( selector );
	}


	function _relax(){
		this.length = 0;
	}


	/*
	* extension method
	*/
	_relax.prototype = {
		constructor: _relax,
		
		//initialize
		init: function( selector ){
			var self = this;
			var arg = arguments;

			if( !selector ){
				return this;
			}

			if( utils.classOf(selector) === 'Function' ){
				selector.apply(this, arg);
			}

			if( utils.classOf(selector) === 'String' ){
				self.get( selector );
			}

			if( utils.classOf(selector) === 'Object' ){
				return selector;
			}

			self.content = doc;
			self.selector = selector;
			return self;
		}

		//get dom
		,get: function( node ){
			var self = this;
			var _type = node.match(/[^\""]/);

			switch( _type[0] ){
				case '.':
					var _eleCls = document.getElementsByTagName('*');
					var _pi = 0;

					for( var _i = 0, _l = _eleCls.length; _i < _l; _i++ ){
						if( _eleCls[_i].className == node.replace(/^./, '') ){
							self[_pi] = _eleCls[_i];
							_pi++;
						}
					}
					self.length = _pi;
					break;

				case '#':
					var _eleId = doc.getElementById( node.replace(/^#/, '') );
					self[0] = _eleId;
					self.length = 1;
					break;

				default:
					var _eleOth = document.getElementsByTagName(node);
					for( var _i = 0; _i < _eleOth.length; _i++ ){
						self[_i] = _eleOth[_i];
					}
					self.length = _eleOth.length;
					break;
			}

			return self;
		}

		//hide element
		,hide: function(){
			for( var _i = 0; _i < this.length; _i++ ){
				this[_i].style.display = 'none';	
			}
			return this;
		}

		//show element
		,show: function(){
			for( var _i = 0; _i < this.length; _i++ ){
				this[_i].style.display = 'block';
			}
			return this;
		}

		//get or set element text
		,text: function(cont){
			return this.eles(cont, 'text');
		}

		//get or set element html
		,html: function(cont){
			return this.eles(cont, 'html');
		}

		//get or set element text/html
		,eles: function(cont, type){
			var self = this;
			var _return = '';
			var cont = cont || '';

			//get
			if( !cont.trim() ){
				for( var _i = 0; _i < this.length; _i++ ) _return += type == 'html' ? self[_i].outerHTML : self[_i].innerHTML;
			}

			//set
			else {
				for( var _i = 0; _i < this.length; _i++ ) self[_i].innerHTML = type == 'html' ? cont : utils.htmlEncode(cont);
				_return = self;
			}

			return _return;			
		}

		//
		,eq: function(i){
			this[0] = this[i];
			for( var _i = 1; _i < this.length; _i++ ){
				delete this[_i];
			}
			this.length = 1;

			return this;
		}
	}


	/*
	* utils
	*/
	utils = {
		//detection data type
		classOf: function( param ){
			if(param === null) return 'Null';
			if(param === undefined) return 'Undefined';
			return Object.prototype.toString.call(param).slice(8, -1);
		}

		//html encode
		,htmlEncode: function(str){
			var s = '';
			if( str.length == 0 ) return '';
			for(var _i = 0, _l = str.length; _i < _l; _i++) {
				switch( str.substr(_i, 1) ){
					case '<': s += '&lt;'; break;
					case '>': s += '&gt;'; break;
					case '&': s += '&amp;'; break;
					case ' ': s += '&nbsp;'; break;
					case '\'': s += '&quot;'; break;
					default: s += str.substr(_i, 1); break;
				}
			}
			return s;
		}
	}


	win.relax = win.$ = relax;


})(window);