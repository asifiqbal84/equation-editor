eqEd.Symbol = function(character, fontStyle, symbolSizeConfig) {
    eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
    this.character = character;
    this.fontStyle = fontStyle;
    this.domObj = this.buildDomObj();
    if (IEVersion >= 9) {
        if (this.fontStyle === "MathJax_MathItalic") {
            this.adjustTop = 0.345;
        } else {
            this.adjustTop = 0.3;
        }
    } else {
        if (this.fontStyle === "MathJax_MathItalic") {
            this.adjustTop = 0.025;
        }
    }
    
    // Set up the width calculation
    var width = 0;
    this.properties.push(new Property(this, "width", width, {
        get: function() {
            return width;
        },
        set: function(value) {
            width = value;
        },
        compute: function() {
            return this.symbolSizeConfig.width[this.character][this.fontStyle][this.parent.parent.fontSize];
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the height calculation
    var height = 0;
    this.properties.push(new Property(this, "height", height, {
        get: function() {
            return height;
        },
        set: function(value) {
            height = value;
        },
        compute: function() {
            var fontHeight = this.getFontHeight();
            return 1  * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));

    // Set up the left calculation
    var left = 0;
    this.properties.push(new Property(this, "left", left, {
        get: function() {
            return left;
        },
        set: function(value) {
            left = value;
        },
        compute: function() {
            // remember compute hooks get called.
            return 0;
        },
        updateDom: function() {
            this.domObj.updateLeft(this.left);
        }
    }));

    // Set up the top calculation
    var top = 0;
    this.properties.push(new Property(this, "top", top, {
        get: function() {
            return top;
        },
        set: function(value) {
            top = value;
        },
        compute: function() {
            // remember compute hooks get called.
            return 0;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.Symbol.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.Symbol.prototype.constructor = eqEd.Symbol;
    eqEd.Symbol.prototype.clone = function() {
        // character doesn't need cloned, because it isn't an object, it's
        // a native type.  symbolSizeConfig doesn't need cloned, because
        // it is a singleton over the equation life cycle. Only need a 
        // reference to the singleton.
        return new this.constructor(this.character, this.symbolSizeConfig);
    };
    eqEd.Symbol.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="symbol ' + this.fontStyle + '">' + this.character + '</div>');
    };
})();