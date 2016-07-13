/*
* @note: relax javascript is lib
* @ver: 1.0.0
* @author: xiayu chen
* @email: appcxy@gmail.com
* @date: 2016-07
*/
;
(function( win, undefined ){
	var win = win;
	var doc = win.document;
	var nav = win.navigator;


	var relax = function( selector ){
		return new _relax().init( selector );
	}


	function _relax(){
		this.length = 0;
	}


	_relax.prototype = {
		constructor: relax,
		init: function( selector ){
			var self = this;
			var arg = arguments;

			if( !selector ){
				return this;
			}

			if( self.classOf(selector) === 'Function' ){
				selector.apply(this, arg);
			}

			if( self.classOf(selector) === 'String' ){
				self.get( selector );
			}

			if( self.classOf(selector) === 'Object' ){
				return selector;
			}

			self.content = doc;
			self.selector = selector;
			return self;
		}

		,hide: function(){
			for( var _i = 0; _i < this.length; _i++ ){
				this[_i].style.display = 'none';	
			}
			return this;
		}

		,show: function(){
			for( var _i = 0; _i < this.length; _i++ ){
				this[_i].style.display = 'block';
			}
			return this;
		}

		,text: function(cont){
			var self = this;
			var _return = '';

			if( !cont.trim() ){
				for( var _i = 0; _i < this.length; _i++ ){
					_return += self[_i].innerHTML;	
				}
			} else {
				for( var _i = 0; _i < this.length; _i++ ){
					self[_i].innerHTML = cont;	
				}
				_return = self;
			}
			return _return;
		}

		,html: function(cont){
			var self = this;
			var _return = '';

			if( !cont.trim() ){
				for( var _i = 0; _i < this.length; _i++ ){
					_return += self[_i].outerHTML;	
				}
			} else {
				for( var _i = 0; _i < this.length; _i++ ){
					self[_i].innerHTML = cont;	
				}
				_return = self;
			}
			return _return;
		}

		,eq: function(i){
			this[0] = this[i];
			for( var _i = 1; _i < this.length; _i++ ){
				delete this[_i];
			}
			this.length = 1;
			return this;
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
						if( _eleCls[_i].className == node.replace('.', '') ){
							self[_pi] = _eleCls[_i];
							_pi++;
						}
					}
					self.length = _pi;					
					break;

				case '#':
					var _eleId = doc.getElementById( node.replace('#', '') );
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


		//object type
		,classOf: function( param ){
			if(param === null) return 'Null';
			if(param === undefined) return 'Undefined';
			return Object.prototype.toString.call(param).slice(8, -1);
		}
	}



	win.relax = win.$ = relax;

})(window);