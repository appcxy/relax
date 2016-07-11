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
		// console.log('new:', selector);
		return new _relax().init( selector );
	}

	// console.log(relax, _relax);
	function _relax(){
		this.version = '1.0.0';
	}

	// relax.prototype = _relax.prototype;
	_relax.prototype = {
		constructor: relax,
		init: function( selector ){
			var self = this;
			var arg = arguments;

			// console.log(
			// 	self.classOf(null),
			// 	self.classOf(1),
			// 	self.classOf(''),
			// 	self.classOf(false),
			// 	self.classOf({}),
			// 	self.classOf([]),
			// 	self.classOf(/./),
			// 	self.classOf(new Date()),
			// 	self.classOf(window),

			// 	self.classOf(selector)
			// );
			// console.log(arguments);

			// console.log('==============', selector, self.classOf(selector));

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
				// selector[0] = selector[0];
				return selector;
			}

			this.content = doc;
			this.selector = selector;

			return self;
		}

		,alerts: function( param ){
			alert(param);
			return this;
		}

		,hide: function(){
			this[0].style.display = 'none';
			return this;
		}

		,show: function(){
			this[0].style.display = 'block';
			return this;
		}

		,test: function(a){
			var self = this;

			if( self.classOf(a) === 'Function' ){
				// console.log(this);
				a.apply(self);
				// console.log(self, self[0].innerHTML);
				// self.innerHtml = "0px";
				// alert(4);
			}

			if( self.classOf(a) === 'String' ){
				alert(a);
			}

			return self;
		}

		,html: function(cont){
			var self = this;

			// console.log(self, self[0]);
			return self[0].innerHTML;
		}

		//get dom
		,get: function( node ){
			var self = this;
			var _type = node.match(/[^\""]/);

			switch( _type[0] ){
				case '.':
					// console.log('class get dom');
					break;

				case '#':
					var ele = doc.getElementById( node.replace('#', '') );
					self[0] = ele;
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