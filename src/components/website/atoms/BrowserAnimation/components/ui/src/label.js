(function($) {    

    $.anwidget("an.Label", {
        options: {
			'visible': true,
			'disabled': false,
			'text': "",
			'position': 'absolute'
        },
		_props: ["left", "top", "width", "height", "position", "transform-origin", "transform"],
		_attrs: ["id", "disabled", "class"],
		getCreateOptions: function() {
			return $.extend(this.options, { 'id': "label" + _widgetID++ });
		},
		getCreateString: function() {
			return "<label>";
		},
		getProperties: function() {
			return this._props;
		},
		getAttributes: function() {
			return this._attrs;
		},
		update: function(force) {
			this._superApply(arguments);
			if(force || this._dirty["text"]) {
				this._$this.text(this._options["label"]);	
				this._dirty["text"] = false;				
			}
		}
    });   
})(jQuery);