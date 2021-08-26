(function(cjs, an) {
  var p; // shortcut to reference prototypes
  var lib = {};
  var ss = {};
  var img = {};
  lib.ssMetadata = [];

  (lib.AnMovieClip = function() {
    this.actionFrames = [];
    this.ignorePause = false;
    this.gotoAndPlay = function(positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
    };
    this.play = function() {
      cjs.MovieClip.prototype.play.call(this);
    };
    this.gotoAndStop = function(positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel);
    };
    this.stop = function() {
      cjs.MovieClip.prototype.stop.call(this);
    };
  }).prototype = p = new cjs.MovieClip();
  // symbols:
  // helper functions:

  function mc_symbol_clone() {
    var clone = this._cloneProps(
      new this.constructor(
        this.mode,
        this.startPosition,
        this.loop,
        this.reversed
      )
    );
    clone.gotoAndStop(this.currentFrame);
    clone.paused = this.paused;
    clone.framerate = this.framerate;
    return clone;
  }

  function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
    var prototype = cjs.extend(symbol, cjs.MovieClip);
    prototype.clone = mc_symbol_clone;
    prototype.nominalBounds = nominalBounds;
    prototype.frameBounds = frameBounds;
    return prototype;
  }

  (lib.webpageText = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(102,107,121,0.8)')
      .beginStroke()
      .moveTo(-111.5, 40.7)
      .curveTo(-112.7, 40.7, -113.6, 39.8)
      .curveTo(-114.5, 39, -114.5, 37.7)
      .lineTo(-114.5, 35.7)
      .curveTo(-114.5, 34.5, -113.6, 33.6)
      .curveTo(-112.7, 32.7, -111.5, 32.7)
      .lineTo(22.9, 32.7)
      .curveTo(24.1, 32.7, 25, 33.6)
      .curveTo(25.9, 34.5, 25.9, 35.7)
      .lineTo(25.9, 37.7)
      .curveTo(25.9, 39, 25, 39.8)
      .curveTo(24.1, 40.7, 22.9, 40.7)
      .closePath()
      .moveTo(-111.5, 28.5)
      .curveTo(-112.7, 28.5, -113.6, 27.6)
      .curveTo(-114.5, 26.7, -114.5, 25.5)
      .lineTo(-114.5, 23.5)
      .curveTo(-114.5, 22.2, -113.6, 21.4)
      .curveTo(-112.7, 20.5, -111.5, 20.5)
      .lineTo(111.5, 20.5)
      .curveTo(112.7, 20.5, 113.6, 21.4)
      .curveTo(114.5, 22.2, 114.5, 23.5)
      .lineTo(114.5, 25.5)
      .curveTo(114.5, 26.7, 113.6, 27.6)
      .curveTo(112.7, 28.5, 111.5, 28.5)
      .closePath()
      .moveTo(-111.5, 16.2)
      .curveTo(-112.7, 16.2, -113.6, 15.3)
      .curveTo(-114.5, 14.5, -114.5, 13.2)
      .lineTo(-114.5, 11.2)
      .curveTo(-114.5, 10, -113.6, 9.1)
      .curveTo(-112.7, 8.2, -111.5, 8.2)
      .lineTo(50.6, 8.2)
      .curveTo(51.8, 8.2, 52.7, 9.1)
      .curveTo(53.6, 10, 53.6, 11.2)
      .lineTo(53.6, 13.2)
      .curveTo(53.6, 14.5, 52.7, 15.3)
      .curveTo(51.8, 16.2, 50.6, 16.2)
      .closePath()
      .moveTo(-111.5, 4)
      .curveTo(-112.7, 4, -113.6, 3.1)
      .curveTo(-114.5, 2.2, -114.5, 1)
      .lineTo(-114.5, -1)
      .curveTo(-114.5, -2.3, -113.6, -3.1)
      .curveTo(-112.7, -4, -111.5, -4)
      .lineTo(111.5, -4)
      .curveTo(112.7, -4, 113.6, -3.1)
      .curveTo(114.5, -2.3, 114.5, -1)
      .lineTo(114.5, 1)
      .curveTo(114.5, 2.2, 113.6, 3.1)
      .curveTo(112.7, 4, 111.5, 4)
      .closePath()
      .moveTo(-111.5, -8.2)
      .curveTo(-112.7, -8.2, -113.6, -9.1)
      .curveTo(-114.5, -10, -114.5, -11.2)
      .lineTo(-114.5, -13.2)
      .curveTo(-114.5, -14.5, -113.6, -15.4)
      .curveTo(-112.7, -16.2, -111.5, -16.2)
      .lineTo(100.5, -16.2)
      .curveTo(101.7, -16.2, 102.6, -15.4)
      .curveTo(103.5, -14.5, 103.5, -13.2)
      .lineTo(103.5, -11.2)
      .curveTo(103.5, -10, 102.6, -9.1)
      .curveTo(101.7, -8.2, 100.5, -8.2)
      .closePath()
      .moveTo(-111.5, -20.5)
      .curveTo(-112.7, -20.5, -113.6, -21.4)
      .curveTo(-114.5, -22.2, -114.5, -23.5)
      .lineTo(-114.5, -25.5)
      .curveTo(-114.5, -26.7, -113.6, -27.6)
      .curveTo(-112.7, -28.5, -111.5, -28.5)
      .lineTo(111.5, -28.5)
      .curveTo(112.7, -28.5, 113.6, -27.6)
      .curveTo(114.5, -26.7, 114.5, -25.5)
      .lineTo(114.5, -23.5)
      .curveTo(114.5, -22.2, 113.6, -21.4)
      .curveTo(112.7, -20.5, 111.5, -20.5)
      .closePath()
      .moveTo(-111.5, -32.7)
      .curveTo(-112.7, -32.7, -113.6, -33.6)
      .curveTo(-114.5, -34.5, -114.5, -35.7)
      .lineTo(-114.5, -37.7)
      .curveTo(-114.5, -39, -113.6, -39.8)
      .curveTo(-112.7, -40.7, -111.5, -40.7)
      .lineTo(111.5, -40.7)
      .curveTo(112.7, -40.7, 113.6, -39.8)
      .curveTo(114.5, -39, 114.5, -37.7)
      .lineTo(114.5, -35.7)
      .curveTo(114.5, -34.5, 113.6, -33.6)
      .curveTo(112.7, -32.7, 111.5, -32.7)
      .closePath();
    this.shape.setTransform(114.475, 40.725);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageText,
    new cjs.Rectangle(0, 0, 229, 81.5),
    null
  );

  (lib.webpageNav = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(255,255,255,0.498)')
      .beginStroke()
      .moveTo(-108.7, 6)
      .curveTo(-109.9, 6, -110.8, 5.1)
      .curveTo(-111.7, 4.3, -111.7, 3)
      .lineTo(-111.7, -3)
      .curveTo(-111.7, -4.3, -110.8, -5.2)
      .curveTo(-109.9, -6, -108.7, -6)
      .lineTo(108.7, -6)
      .curveTo(109.9, -6, 110.7, -5.2)
      .curveTo(111.7, -4.3, 111.6, -3)
      .lineTo(111.6, 3)
      .curveTo(111.7, 4.3, 110.7, 5.1)
      .curveTo(109.9, 6, 108.7, 6)
      .closePath();
    this.shape.setTransform(111.65, 6);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageNav,
    new cjs.Rectangle(0, 0, 223.3, 12),
    null
  );

  (lib.webpageLogo = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(255,255,255,0.8)')
      .beginStroke()
      .moveTo(-46, 12.6)
      .lineTo(-46, -12.6)
      .lineTo(46, -12.6)
      .lineTo(46, 12.6)
      .closePath();
    this.shape.setTransform(45.825, 12.475);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageLogo,
    new cjs.Rectangle(-0.2, -0.1, 92.10000000000001, 25.200000000000003),
    null
  );

  (lib.webpageImg4 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(241,156,64,0.6)')
      .beginStroke()
      .moveTo(-33.1, 22.5)
      .lineTo(-33.1, -19.5)
      .curveTo(-33.1, -20.7, -32.2, -21.6)
      .curveTo(-31.4, -22.5, -30.1, -22.4)
      .lineTo(30.1, -22.4)
      .curveTo(31.4, -22.5, 32.2, -21.6)
      .curveTo(33.1, -20.7, 33.1, -19.5)
      .lineTo(33.1, 22.5)
      .closePath();
    this.shape.setTransform(33.125, 22.45);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageImg4,
    new cjs.Rectangle(0, 0, 66.3, 44.9),
    null
  );

  (lib.webpageImg3 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(241,156,64,0.4)')
      .beginStroke()
      .moveTo(-33.1, 22.5)
      .lineTo(-33.1, -19.5)
      .curveTo(-33.1, -20.7, -32.2, -21.6)
      .curveTo(-31.4, -22.5, -30.1, -22.4)
      .lineTo(30.1, -22.4)
      .curveTo(31.4, -22.5, 32.2, -21.6)
      .curveTo(33.1, -20.7, 33.1, -19.5)
      .lineTo(33.1, 22.5)
      .closePath();
    this.shape.setTransform(33.125, 22.45);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageImg3,
    new cjs.Rectangle(0, 0, 66.3, 44.9),
    null
  );

  (lib.webpageImg2 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(110,116,125,0.698)')
      .beginStroke()
      .moveTo(-67.3, 54.2)
      .curveTo(-68.5, 54.2, -69.4, 53.3)
      .curveTo(-70.3, 52.4, -70.2, 51.2)
      .lineTo(-70.2, -51.2)
      .curveTo(-70.3, -52.4, -69.4, -53.3)
      .curveTo(-68.5, -54.2, -67.3, -54.2)
      .lineTo(67.3, -54.2)
      .curveTo(68.5, -54.2, 69.3, -53.3)
      .curveTo(70.3, -52.4, 70.2, -51.2)
      .lineTo(70.2, 51.2)
      .curveTo(70.3, 52.4, 69.3, 53.3)
      .curveTo(68.5, 54.2, 67.3, 54.2)
      .closePath();
    this.shape.setTransform(70.25, 54.2);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageImg2,
    new cjs.Rectangle(0, 0, 140.5, 108.4),
    null
  );

  (lib.webpageImg1 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(86,183,174,0.4)')
      .beginStroke()
      .moveTo(-114.5, 13.3)
      .lineTo(-114.5, -10.3)
      .curveTo(-114.5, -11.6, -113.6, -12.4)
      .curveTo(-112.7, -13.3, -111.5, -13.3)
      .lineTo(111.5, -13.3)
      .curveTo(112.7, -13.3, 113.6, -12.4)
      .curveTo(114.5, -11.6, 114.5, -10.3)
      .lineTo(114.5, 13.3)
      .closePath();
    this.shape.setTransform(114.475, 13.325);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageImg1,
    new cjs.Rectangle(0, 0, 229, 26.7),
    null
  );

  (lib.webPageHeading = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(86,183,174,0.898)')
      .beginStroke()
      .moveTo(-111.5, 15.1)
      .curveTo(-112.7, 15.1, -113.6, 14.2)
      .curveTo(-114.5, 13.3, -114.5, 12.1)
      .lineTo(-114.5, 6.1)
      .curveTo(-114.5, 4.8, -113.6, 4)
      .curveTo(-112.7, 3.1, -111.5, 3.1)
      .lineTo(5.8, 3.1)
      .curveTo(7.1, 3.1, 7.9, 4)
      .curveTo(8.8, 4.8, 8.8, 6.1)
      .lineTo(8.8, 12.1)
      .curveTo(8.8, 13.3, 7.9, 14.2)
      .curveTo(7.1, 15.1, 5.8, 15.1)
      .closePath()
      .moveTo(-111.5, -3.1)
      .curveTo(-112.7, -3.1, -113.6, -3.9)
      .curveTo(-114.5, -4.9, -114.5, -6.1)
      .lineTo(-114.5, -12.1)
      .curveTo(-114.5, -13.3, -113.6, -14.2)
      .curveTo(-112.7, -15.1, -111.5, -15.1)
      .lineTo(111.5, -15.1)
      .curveTo(112.7, -15.1, 113.6, -14.2)
      .curveTo(114.5, -13.3, 114.5, -12.1)
      .lineTo(114.5, -6.1)
      .curveTo(114.5, -4.9, 113.6, -3.9)
      .curveTo(112.7, -3.1, 111.5, -3.1)
      .closePath();
    this.shape.setTransform(114.475, 15.1);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webPageHeading,
    new cjs.Rectangle(0, 0, 229, 30.2),
    null
  );

  (lib.webpageHeader = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(241,156,64,0.8)')
      .beginStroke()
      .moveTo(-219.8, 23.4)
      .lineTo(-219.8, -23.4)
      .lineTo(219.8, -23.4)
      .lineTo(219.8, 23.4)
      .closePath();
    this.shape.setTransform(219.775, 23.375);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageHeader,
    new cjs.Rectangle(0, 0, 439.6, 46.8),
    null
  );

  (lib.webpageEffect = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginLinearGradientFill(
        [
          'rgba(255,255,255,0.698)',
          'rgba(255,255,255,0.325)',
          'rgba(255,255,255,0)'
        ],
        [0, 0.141, 1],
        0,
        114.3,
        0,
        -114.3
      )
      .beginStroke()
      .moveTo(-207.8, 114.3)
      .curveTo(-212.7, 114.3, -216.2, 110.8)
      .curveTo(-219.8, 107.3, -219.8, 102.3)
      .lineTo(-219.8, -114.3)
      .lineTo(219.8, -114.3)
      .lineTo(219.8, 102.3)
      .curveTo(219.8, 107.3, 216.3, 110.8)
      .curveTo(212.7, 114.3, 207.8, 114.3)
      .closePath();
    this.shape.setTransform(219.775, 114.325);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpageEffect,
    new cjs.Rectangle(0, 0, 439.6, 228.7),
    null
  );

  (lib.url = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(255,255,255,0.698)')
      .beginStroke()
      .moveTo(-122.6, 4.1)
      .lineTo(-122.6, -4.1)
      .lineTo(122.6, -4.1)
      .lineTo(122.6, 4.1)
      .closePath();
    this.shape.setTransform(122.625, 4.075);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.url,
    new cjs.Rectangle(0, 0, 245.3, 8.2),
    null
  );

  (lib.loader = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(241,156,64,0.8)')
      .beginStroke()
      .moveTo(-219.8, 2.3)
      .lineTo(-219.8, -2.4)
      .lineTo(219.8, -2.4)
      .lineTo(219.8, 2.3)
      .closePath();
    this.shape.setTransform(219.775, 2.35);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.loader,
    new cjs.Rectangle(0, 0, 439.6, 4.7),
    null
  );

  (lib.extension = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-2.7, 10.6)
      .curveTo(-6.1, 9.7, -9.4, 9.7)
      .lineTo(-10.2, 9.7)
      .curveTo(-10.7, 9.7, -11, 9.4)
      .curveTo(-11.5, 9.1, -11.5, 8.6)
      .curveTo(-11.6, 8, -11.3, 7.6)
      .lineTo(-10.4, 6.2)
      .curveTo(-9.8, 5.2, -10.2, 4.1)
      .curveTo(-11, 2.3, -11, -0)
      .curveTo(-11, -4.5, -7.7, -7.7)
      .curveTo(-4.4, -10.9, 0.3, -10.9)
      .curveTo(5, -10.9, 8.3, -7.7)
      .curveTo(11.6, -4.5, 11.6, -0)
      .curveTo(11.6, 4.6, 8.3, 7.7)
      .curveTo(5, 10.9, 0.3, 10.9)
      .curveTo(-1.3, 10.9, -2.7, 10.6)
      .closePath()
      .moveTo(-5.8, 7.3)
      .curveTo(-5.8, 7.4, -5.7, 7.4)
      .curveTo(-5.7, 7.4, -5.6, 7.4)
      .curveTo(-5.5, 7.4, -5.5, 7.4)
      .curveTo(-5.4, 7.4, -5.4, 7.3)
      .lineTo(1, 7.3)
      .curveTo(3.2, 7.5, 5.1, 6.3)
      .curveTo(8.1, 4.3, 8.1, -0)
      .curveTo(8.1, -4.2, 5.4, -6.2)
      .curveTo(3.2, -7.7, 0.6, -7.6)
      .lineTo(-2.3, -7.6)
      .curveTo(-3.3, -7.6, -4, -6.9)
      .curveTo(-4.8, -6.1, -4.8, -5.1)
      .lineTo(-4.8, 3.5)
      .curveTo(-4.8, 4.8, -6.7, 4.8)
      .curveTo(-7.3, 4.8, -7.3, 5.4)
      .lineTo(-7.3, 5.5)
      .curveTo(-7.3, 6.9, -6.4, 7.3)
      .curveTo(-6.2, 7.4, -5.9, 7.3)
      .closePath()
      .moveTo(-1.3, 4.4)
      .lineTo(-1.3, -3.4)
      .curveTo(-1.3, -3.9, -0.9, -4.3)
      .curveTo(-0.5, -4.6, -0, -4.6)
      .curveTo(1.7, -4.8, 3.1, -3.7)
      .curveTo(4.6, -2.3, 4.5, -0.1)
      .curveTo(4.5, 4.4, 0.4, 4.4)
      .closePath();
    this.shape.setTransform(11.5875, 10.9);

    this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.extension,
    new cjs.Rectangle(0, 0, 23.2, 21.8),
    null
  );

  (lib.bubbleText2 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-17.2, 4)
      .curveTo(-18.4, 4, -19.3, 3.1)
      .curveTo(-20.2, 2.3, -20.1, 1)
      .lineTo(-20.1, -1)
      .curveTo(-20.2, -2.2, -19.3, -3.1)
      .curveTo(-18.4, -4, -17.2, -4)
      .lineTo(17.1, -4)
      .curveTo(18.4, -4, 19.3, -3.1)
      .curveTo(20.1, -2.2, 20.2, -1)
      .lineTo(20.2, 1)
      .curveTo(20.1, 2.3, 19.3, 3.1)
      .curveTo(18.4, 4, 17.1, 4)
      .closePath();
    this.shape.setTransform(20.15, 40.75);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-28.7, 4)
      .curveTo(-29.9, 4, -30.8, 3.1)
      .curveTo(-31.7, 2.3, -31.7, 1)
      .lineTo(-31.7, -1)
      .curveTo(-31.7, -2.2, -30.8, -3.1)
      .curveTo(-29.9, -4, -28.7, -4)
      .lineTo(28.7, -4)
      .curveTo(29.9, -4, 30.8, -3.1)
      .curveTo(31.7, -2.2, 31.7, -1)
      .lineTo(31.7, 1)
      .curveTo(31.7, 2.3, 30.8, 3.1)
      .curveTo(29.9, 4, 28.7, 4)
      .closePath();
    this.shape_1.setTransform(31.675, 28.5);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-24.8, 4)
      .curveTo(-26, 4, -26.9, 3.1)
      .curveTo(-27.8, 2.2, -27.8, 1)
      .lineTo(-27.8, -1)
      .curveTo(-27.8, -2.2, -26.9, -3.1)
      .curveTo(-26, -4, -24.8, -4)
      .lineTo(24.8, -4)
      .curveTo(26, -4, 26.9, -3.1)
      .curveTo(27.8, -2.2, 27.8, -1)
      .lineTo(27.8, 1)
      .curveTo(27.8, 2.2, 26.9, 3.1)
      .curveTo(26, 4, 24.8, 4)
      .closePath();
    this.shape_2.setTransform(27.775, 16.25);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-27.3, 4)
      .curveTo(-28.6, 4, -29.4, 3.1)
      .curveTo(-30.3, 2.2, -30.3, 1)
      .lineTo(-30.3, -1)
      .curveTo(-30.3, -2.2, -29.4, -3.1)
      .curveTo(-28.6, -4, -27.3, -4)
      .lineTo(27.3, -4)
      .curveTo(28.6, -4, 29.4, -3.1)
      .curveTo(30.3, -2.2, 30.3, -1)
      .lineTo(30.3, 1)
      .curveTo(30.3, 2.2, 29.4, 3.1)
      .curveTo(28.6, 4, 27.3, 4)
      .closePath();
    this.shape_3.setTransform(30.325, 4);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.bubbleText2,
    new cjs.Rectangle(0, 0, 63.4, 44.8),
    null
  );

  (lib.bubblePicto2 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // FlashAICB
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('#FFFFFF')
      .beginStroke()
      .moveTo(-10.9, 30)
      .curveTo(-12, 30, -12.9, 29.1)
      .curveTo(-13.6, 28.4, -13.6, 27.2)
      .lineTo(-13.6, 21.8)
      .curveTo(-13.6, 20.7, -12.9, 19.9)
      .curveTo(-12, 19, -10.9, 19)
      .lineTo(-8.2, 19)
      .lineTo(-8.2, 2.7)
      .lineTo(-10.9, 2.7)
      .curveTo(-12.1, 2.7, -12.9, 1.9)
      .curveTo(-13.6, 1, -13.6, 0)
      .lineTo(-13.6, -5.5)
      .curveTo(-13.6, -6.5, -12.9, -7.4)
      .curveTo(-12.1, -8.2, -10.9, -8.2)
      .lineTo(5.5, -8.2)
      .curveTo(6.6, -8.2, 7.4, -7.4)
      .curveTo(8.2, -6.5, 8.2, -5.5)
      .lineTo(8.2, 19)
      .lineTo(10.9, 19)
      .curveTo(12, 19, 12.9, 19.9)
      .curveTo(13.7, 20.7, 13.7, 21.8)
      .lineTo(13.7, 27.2)
      .curveTo(13.7, 28.4, 12.9, 29.1)
      .curveTo(12, 30, 10.9, 30)
      .closePath()
      .moveTo(-5.4, -16.4)
      .curveTo(-6.6, -16.4, -7.3, -17.2)
      .curveTo(-8.2, -18, -8.2, -19.1)
      .lineTo(-8.2, -27.3)
      .curveTo(-8.2, -28.4, -7.3, -29.2)
      .curveTo(-6.6, -30, -5.4, -30)
      .lineTo(5.5, -30)
      .curveTo(6.6, -30, 7.4, -29.2)
      .curveTo(8.2, -28.4, 8.2, -27.3)
      .lineTo(8.2, -19.1)
      .curveTo(8.2, -18, 7.4, -17.2)
      .curveTo(6.6, -16.4, 5.5, -16.4)
      .closePath();
    this.shape.setTransform(25.525, 25.0122, 0.5, 0.5002);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .beginFill('#2E559D')
      .beginStroke()
      .moveTo(-37.7, 50)
      .curveTo(-42.7, 50, -46.4, 46.4)
      .curveTo(-50, 42.8, -50, 37.7)
      .lineTo(-50, -37.7)
      .curveTo(-50, -42.8, -46.4, -46.4)
      .curveTo(-42.7, -50, -37.7, -50)
      .lineTo(37.7, -50)
      .curveTo(42.8, -50, 46.4, -46.4)
      .curveTo(50, -42.8, 50, -37.7)
      .lineTo(50, 37.7)
      .curveTo(50, 42.8, 46.4, 46.4)
      .curveTo(42.8, 50, 37.7, 50)
      .closePath();
    this.shape_1.setTransform(25, 24.9997, 0.5, 0.5002);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.bubblePicto2,
    new cjs.Rectangle(0, 0, 50, 50),
    null
  );

  (lib.bubbleFormat = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Calque_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-69.8, 48.6)
      .curveTo(-73.4, 48.6, -76.1, 46)
      .curveTo(-78.7, 43.4, -78.7, 39.7)
      .lineTo(-78.7, -24.2)
      .curveTo(-78.7, -27.8, -76.1, -30.5)
      .curveTo(-73.4, -33.1, -69.8, -33.1)
      .lineTo(25.1, -33.1)
      .lineTo(40.6, -48.6)
      .lineTo(56.2, -33.1)
      .lineTo(69.8, -33.1)
      .curveTo(73.5, -33.1, 76.1, -30.5)
      .curveTo(78.7, -27.9, 78.7, -24.2)
      .lineTo(78.7, 39.7)
      .curveTo(78.7, 43.4, 76.1, 46)
      .curveTo(73.5, 48.6, 69.8, 48.6)
      .closePath()
      .moveTo(-72.5, -26.9)
      .curveTo(-73.7, -25.8, -73.7, -24.2)
      .lineTo(-73.7, 39.7)
      .curveTo(-73.7, 41.3, -72.5, 42.5)
      .curveTo(-71.4, 43.6, -69.8, 43.6)
      .lineTo(69.8, 43.6)
      .curveTo(71.4, 43.6, 72.5, 42.5)
      .curveTo(73.7, 41.3, 73.7, 39.7)
      .lineTo(73.7, -24.2)
      .curveTo(73.7, -25.8, 72.5, -26.9)
      .curveTo(71.4, -28.1, 69.8, -28.1)
      .lineTo(54.1, -28.1)
      .lineTo(40.6, -41.6)
      .lineTo(27.2, -28.1)
      .lineTo(-69.8, -28.1)
      .curveTo(-71.4, -28.1, -72.5, -26.9)
      .closePath();
    this.shape.setTransform(78.675, 48.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .beginFill('#FFFFFF')
      .beginStroke()
      .moveTo(-69.8, 48.6)
      .curveTo(-73.4, 48.6, -76.1, 46)
      .curveTo(-78.7, 43.4, -78.7, 39.7)
      .lineTo(-78.7, -24.2)
      .curveTo(-78.7, -27.8, -76.1, -30.5)
      .curveTo(-73.4, -33.1, -69.8, -33.1)
      .lineTo(25.1, -33.1)
      .lineTo(40.6, -48.6)
      .lineTo(56.2, -33.1)
      .lineTo(69.8, -33.1)
      .curveTo(73.5, -33.1, 76.1, -30.5)
      .curveTo(78.7, -27.9, 78.7, -24.2)
      .lineTo(78.7, 39.7)
      .curveTo(78.7, 43.4, 76.1, 46)
      .curveTo(73.5, 48.6, 69.8, 48.6)
      .closePath();
    this.shape_1.setTransform(78.675, 48.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.bubbleFormat,
    new cjs.Rectangle(0, 0, 157.4, 97.3),
    null
  );

  (lib.browser = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // FlashAICB
    this.shape = new cjs.Shape();
    this.shape.graphics
      .beginFill('rgba(255,255,255,0.949)')
      .beginStroke()
      .moveTo(-207.8, 114.3)
      .curveTo(-212.7, 114.3, -216.2, 110.8)
      .curveTo(-219.8, 107.3, -219.8, 102.3)
      .lineTo(-219.8, -114.3)
      .lineTo(219.8, -114.3)
      .lineTo(219.8, 102.3)
      .curveTo(219.8, 107.3, 216.3, 110.8)
      .curveTo(212.7, 114.3, 207.8, 114.3)
      .closePath();
    this.shape.setTransform(220.025, 185.775);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .beginFill('#6E747D')
      .beginStroke()
      .moveTo(-9.7, 9.1)
      .curveTo(-10.5, 9.1, -11, 8.6)
      .curveTo(-11.6, 8.1, -11.6, 7.3)
      .curveTo(-11.6, 6.6, -11, 6)
      .curveTo(-10.5, 5.4, -9.7, 5.5)
      .lineTo(9.7, 5.5)
      .curveTo(10.5, 5.4, 11, 6)
      .curveTo(11.6, 6.6, 11.6, 7.3)
      .curveTo(11.6, 8.1, 11, 8.6)
      .curveTo(10.5, 9.1, 9.7, 9.1)
      .closePath()
      .moveTo(-9.7, 1.9)
      .curveTo(-10.5, 1.9, -11, 1.3)
      .curveTo(-11.6, 0.8, -11.6, 0)
      .curveTo(-11.6, -0.8, -11, -1.3)
      .curveTo(-10.5, -1.8, -9.7, -1.8)
      .lineTo(9.7, -1.8)
      .curveTo(10.5, -1.8, 11, -1.3)
      .curveTo(11.6, -0.8, 11.6, 0)
      .curveTo(11.6, 0.8, 11, 1.3)
      .curveTo(10.5, 1.9, 9.7, 1.9)
      .closePath()
      .moveTo(-9.7, -5.5)
      .curveTo(-10.5, -5.5, -11, -5.9)
      .curveTo(-11.6, -6.5, -11.6, -7.3)
      .curveTo(-11.6, -8, -11, -8.6)
      .curveTo(-10.5, -9.1, -9.7, -9.1)
      .lineTo(9.7, -9.1)
      .curveTo(10.5, -9.1, 11, -8.6)
      .curveTo(11.6, -8, 11.6, -7.3)
      .curveTo(11.6, -6.5, 11, -5.9)
      .curveTo(10.5, -5.5, 9.7, -5.5)
      .closePath();
    this.shape_1.setTransform(418.825, 47.7);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .beginFill('#9AA3AE')
      .beginStroke()
      .moveTo(-173.5, 11.6)
      .curveTo(-175.5, 11.6, -177, 10.2)
      .curveTo(-178.5, 8.7, -178.5, 6.6)
      .lineTo(-178.5, -6.6)
      .curveTo(-178.5, -8.7, -177, -10.2)
      .curveTo(-175.5, -11.6, -173.5, -11.6)
      .lineTo(173.5, -11.6)
      .curveTo(175.5, -11.6, 177, -10.2)
      .curveTo(178.5, -8.7, 178.5, -6.6)
      .lineTo(178.5, 6.6)
      .curveTo(178.5, 8.7, 177, 10.2)
      .curveTo(175.5, 11.6, 173.5, 11.6)
      .closePath();
    this.shape_2.setTransform(186.725, 47.7);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .beginFill('#FFFFFF')
      .beginStroke()
      .moveTo(-219.8, 32.7)
      .lineTo(-219.8, -4.7)
      .lineTo(-158.2, -4.7)
      .lineTo(-158.2, -20.2)
      .lineTo(-84.3, -20.2)
      .lineTo(-84.3, -4.7)
      .lineTo(219.8, -4.7)
      .lineTo(219.8, 32.7)
      .closePath()
      .moveTo(-210.3, 3.8)
      .curveTo(-211.8, 5.3, -211.8, 7.4)
      .lineTo(-211.8, 20.6)
      .curveTo(-211.8, 22.7, -210.3, 24.2)
      .curveTo(-208.8, 25.6, -206.8, 25.6)
      .lineTo(140.2, 25.6)
      .curveTo(142.2, 25.6, 143.7, 24.2)
      .curveTo(145.2, 22.7, 145.2, 20.6)
      .lineTo(145.2, 7.4)
      .curveTo(145.2, 5.3, 143.7, 3.8)
      .curveTo(142.2, 2.4, 140.2, 2.4)
      .lineTo(-206.8, 2.4)
      .curveTo(-208.8, 2.4, -210.3, 3.8)
      .closePath()
      .moveTo(187.8, 20)
      .curveTo(187.2, 20.6, 187.2, 21.3)
      .curveTo(187.2, 22.1, 187.8, 22.6)
      .curveTo(188.3, 23.1, 189.1, 23.1)
      .lineTo(208.5, 23.1)
      .curveTo(209.3, 23.1, 209.8, 22.6)
      .curveTo(210.4, 22.1, 210.4, 21.3)
      .curveTo(210.4, 20.6, 209.8, 20)
      .curveTo(209.3, 19.4, 208.5, 19.5)
      .lineTo(189.1, 19.5)
      .curveTo(188.3, 19.4, 187.8, 20)
      .closePath()
      .moveTo(187.8, 12.7)
      .curveTo(187.2, 13.2, 187.2, 14)
      .curveTo(187.2, 14.8, 187.8, 15.3)
      .curveTo(188.3, 15.9, 189.1, 15.9)
      .lineTo(208.5, 15.9)
      .curveTo(209.3, 15.9, 209.8, 15.3)
      .curveTo(210.4, 14.8, 210.4, 14)
      .curveTo(210.4, 13.2, 209.8, 12.7)
      .curveTo(209.3, 12.2, 208.5, 12.2)
      .lineTo(189.1, 12.2)
      .curveTo(188.3, 12.2, 187.8, 12.7)
      .closePath()
      .moveTo(187.8, 5.4)
      .curveTo(187.2, 6, 187.2, 6.7)
      .curveTo(187.2, 7.5, 187.8, 8.1)
      .curveTo(188.3, 8.5, 189.1, 8.5)
      .lineTo(208.5, 8.5)
      .curveTo(209.3, 8.5, 209.8, 8.1)
      .curveTo(210.4, 7.5, 210.4, 6.7)
      .curveTo(210.4, 6, 209.8, 5.4)
      .curveTo(209.3, 4.9, 208.5, 4.9)
      .lineTo(189.1, 4.9)
      .curveTo(188.3, 4.9, 187.8, 5.4)
      .closePath()
      .moveTo(-79.3, -9.8)
      .lineTo(-79.3, -24.7)
      .lineTo(-163.2, -24.7)
      .lineTo(-163.2, -9.8)
      .lineTo(-219.8, -9.8)
      .lineTo(-219.8, -20.7)
      .curveTo(-219.8, -25.7, -216.2, -29.2)
      .curveTo(-212.7, -32.8, -207.8, -32.7)
      .lineTo(207.8, -32.7)
      .curveTo(212.7, -32.8, 216.3, -29.2)
      .curveTo(219.8, -25.7, 219.8, -20.7)
      .lineTo(219.8, -9.8)
      .closePath()
      .moveTo(-185.6, -23.6)
      .curveTo(-186.6, -22.7, -186.6, -21.3)
      .curveTo(-186.6, -19.8, -185.6, -18.9)
      .curveTo(-184.7, -17.9, -183.3, -17.9)
      .curveTo(-181.9, -17.9, -180.9, -18.9)
      .curveTo(-179.9, -19.8, -179.9, -21.3)
      .curveTo(-179.9, -22.7, -180.9, -23.6)
      .curveTo(-181.9, -24.6, -183.3, -24.6)
      .curveTo(-184.7, -24.6, -185.6, -23.6)
      .closePath()
      .moveTo(-197.2, -23.6)
      .curveTo(-198.2, -22.7, -198.2, -21.3)
      .curveTo(-198.2, -19.8, -197.2, -18.9)
      .curveTo(-196.3, -17.9, -194.9, -17.9)
      .curveTo(-193.5, -17.9, -192.5, -18.9)
      .curveTo(-191.5, -19.8, -191.5, -21.3)
      .curveTo(-191.5, -22.7, -192.5, -23.6)
      .curveTo(-193.5, -24.6, -194.9, -24.6)
      .curveTo(-196.3, -24.6, -197.2, -23.6)
      .closePath()
      .moveTo(-208.8, -23.6)
      .curveTo(-209.8, -22.7, -209.8, -21.3)
      .curveTo(-209.8, -19.8, -208.8, -18.9)
      .curveTo(-207.8, -17.9, -206.4, -17.9)
      .curveTo(-205, -17.9, -204.1, -18.9)
      .curveTo(-203.1, -19.8, -203.1, -21.3)
      .curveTo(-203.1, -22.7, -204.1, -23.6)
      .curveTo(-205, -24.6, -206.4, -24.6)
      .curveTo(-207.8, -24.6, -208.8, -23.6)
      .closePath();
    this.shape_3.setTransform(220.025, 33.7);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .beginFill('#2E559C')
      .beginStroke()
      .moveTo(-2.3, 2.3)
      .curveTo(-3.4, 1.4, -3.3, -0)
      .curveTo(-3.4, -1.4, -2.3, -2.4)
      .curveTo(-1.4, -3.4, -0, -3.4)
      .curveTo(1.4, -3.4, 2.3, -2.4)
      .curveTo(3.3, -1.4, 3.3, -0)
      .curveTo(3.3, 1.4, 2.3, 2.3)
      .curveTo(1.4, 3.4, -0, 3.4)
      .curveTo(-1.4, 3.4, -2.3, 2.3)
      .closePath();
    this.shape_4.setTransform(13.6, 12.45);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics
      .beginFill('#56B7AE')
      .beginStroke()
      .moveTo(-2.4, 2.3)
      .curveTo(-3.4, 1.4, -3.4, -0)
      .curveTo(-3.4, -1.4, -2.4, -2.4)
      .curveTo(-1.4, -3.4, -0, -3.4)
      .curveTo(1.4, -3.4, 2.4, -2.4)
      .curveTo(3.4, -1.4, 3.4, -0)
      .curveTo(3.4, 1.4, 2.4, 2.3)
      .curveTo(1.4, 3.4, -0, 3.4)
      .curveTo(-1.4, 3.4, -2.4, 2.3)
      .closePath();
    this.shape_5.setTransform(25.175, 12.45);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics
      .beginFill('#F19C40')
      .beginStroke()
      .moveTo(-2.4, 2.3)
      .curveTo(-3.4, 1.4, -3.4, -0)
      .curveTo(-3.4, -1.4, -2.4, -2.4)
      .curveTo(-1.4, -3.4, -0, -3.4)
      .curveTo(1.4, -3.4, 2.3, -2.4)
      .curveTo(3.4, -1.4, 3.4, -0)
      .curveTo(3.4, 1.4, 2.3, 2.3)
      .curveTo(1.4, 3.4, -0, 3.4)
      .curveTo(-1.4, 3.4, -2.4, 2.3)
      .closePath();
    this.shape_6.setTransform(36.75, 12.45);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_6 },
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape }
          ]
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.browser,
    new cjs.Rectangle(0.3, 1, 439.5, 299.1),
    null
  );

  (lib.webpage3 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // webpageEffect
    this.instance = new lib.webpageEffect();
    this.instance.setTransform(219.8, 114.3, 1, 1, 0, 0, 0, 219.8, 114.3);
    this.instance.alpha = 0.5;

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    // webpageNav
    this.instance_1 = new lib.webpageNav();
    this.instance_1.setTransform(
      332.15,
      41.75,
      0.7492,
      0.7492,
      0,
      0,
      0,
      111.7,
      6
    );

    this.instance_2 = new lib.webpageNav();
    this.instance_2.setTransform(
      332.15,
      28.1,
      0.7492,
      0.7492,
      0,
      0,
      0,
      111.7,
      6
    );

    this.instance_3 = new lib.webpageNav();
    this.instance_3.setTransform(
      332.15,
      15.1,
      0.7492,
      0.7492,
      0,
      0,
      0,
      111.7,
      6
    );

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.instance_3 },
            { t: this.instance_2 },
            { t: this.instance_1 }
          ]
        })
        .wait(1)
    );

    // webpageLogo
    this.instance_4 = new lib.webpageLogo();
    this.instance_4.setTransform(
      156.15,
      28.3,
      0.3046,
      1.0179,
      0,
      0,
      0,
      46.1,
      11.8
    );
    this.instance_4.alpha = 0.3984;

    this.instance_5 = new lib.webpageLogo();
    this.instance_5.setTransform(
      122.4,
      28.3,
      0.3046,
      1.0179,
      0,
      0,
      0,
      46.1,
      11.8
    );
    this.instance_5.alpha = 0.3984;

    this.instance_6 = new lib.webpageLogo();
    this.instance_6.setTransform(
      88.65,
      28.3,
      0.3046,
      1.0179,
      0,
      0,
      0,
      46.1,
      11.8
    );
    this.instance_6.alpha = 0.3984;

    this.instance_7 = new lib.webpageLogo();
    this.instance_7.setTransform(
      43.2,
      27.5,
      0.4242,
      1.4175,
      0,
      0,
      0,
      46.1,
      11.8
    );

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.instance_7 },
            { t: this.instance_6 },
            { t: this.instance_5 },
            { t: this.instance_4 }
          ]
        })
        .wait(1)
    );

    // webpageImg4
    this.instance_8 = new lib.webpageImg4();
    this.instance_8.setTransform(
      361.55,
      189.95,
      1.735,
      1.735,
      0,
      0,
      0,
      35,
      22.6
    );
    var instance_8Filter_1 = new cjs.ColorFilter(0, 0, 0, 1, 102, 107, 121, 0);
    this.instance_8.filters = [instance_8Filter_1];
    this.instance_8.cache(-2, -2, 70, 49);

    this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_8Filter_1).wait(1));

    // webpageImg2
    this.instance_9 = new lib.webpageImg2();
    this.instance_9.setTransform(
      243.15,
      246.6,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.2,
      54.5
    );
    var instance_9Filter_2 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_9.filters = [instance_9Filter_2];
    this.instance_9.cache(-2, -2, 145, 112);

    this.instance_10 = new lib.webpageImg2();
    this.instance_10.setTransform(
      155.4,
      246.6,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.1,
      54.5
    );
    var instance_10Filter_3 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_10.filters = [instance_10Filter_3];
    this.instance_10.cache(-2, -2, 145, 112);

    this.instance_11 = new lib.webpageImg2();
    this.instance_11.setTransform(
      65.4,
      246.6,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.1,
      54.5
    );
    var instance_11Filter_4 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_11.filters = [instance_11Filter_4];
    this.instance_11.cache(-2, -2, 145, 112);

    this.instance_12 = new lib.webpageImg2();
    this.instance_12.setTransform(
      243.15,
      176.1,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.2,
      54.5
    );
    var instance_12Filter_5 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_12.filters = [instance_12Filter_5];
    this.instance_12.cache(-2, -2, 145, 112);

    this.instance_13 = new lib.webpageImg2();
    this.instance_13.setTransform(
      155.4,
      176.1,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.1,
      54.5
    );
    var instance_13Filter_6 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_13.filters = [instance_13Filter_6];
    this.instance_13.cache(-2, -2, 145, 112);

    this.instance_14 = new lib.webpageImg2();
    this.instance_14.setTransform(
      65.4,
      176.1,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.1,
      54.5
    );
    var instance_14Filter_7 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_14.filters = [instance_14Filter_7];
    this.instance_14.cache(-2, -2, 145, 112);

    this.instance_15 = new lib.webpageImg2();
    this.instance_15.setTransform(
      243.15,
      104.6,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.2,
      54.5
    );
    var instance_15Filter_8 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_15.filters = [instance_15Filter_8];
    this.instance_15.cache(-2, -2, 145, 112);

    this.instance_16 = new lib.webpageImg2();
    this.instance_16.setTransform(
      155.4,
      104.6,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.1,
      54.5
    );
    var instance_16Filter_9 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_16.filters = [instance_16Filter_9];
    this.instance_16.cache(-2, -2, 145, 112);

    this.instance_17 = new lib.webpageImg2();
    this.instance_17.setTransform(
      65.4,
      104.6,
      0.5647,
      0.5647,
      0,
      0,
      0,
      74.1,
      54.5
    );
    var instance_17Filter_10 = new cjs.ColorFilter(0, 0, 0, 1, 86, 183, 174, 0);
    this.instance_17.filters = [instance_17Filter_10];
    this.instance_17.cache(-2, -2, 145, 112);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.instance_17 },
            { t: this.instance_16 },
            { t: this.instance_15 },
            { t: this.instance_14 },
            { t: this.instance_13 },
            { t: this.instance_12 },
            { t: this.instance_11 },
            { t: this.instance_10 },
            { t: this.instance_9 }
          ]
        })
        .wait(1)
    );
    this.timeline.addTween(cjs.Tween.get(instance_9Filter_2).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_10Filter_3).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_11Filter_4).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_12Filter_5).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_13Filter_6).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_14Filter_7).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_15Filter_8).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_16Filter_9).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_17Filter_10).wait(1));

    // webpageText
    this.instance_18 = new lib.webpageText();
    this.instance_18.setTransform(
      358.35,
      116.05,
      0.5022,
      0.5086,
      0,
      0,
      0,
      114.7,
      40.8
    );

    this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

    // webPageHeading
    this.instance_19 = new lib.webPageHeading();
    this.instance_19.setTransform(
      358.35,
      81.55,
      0.5022,
      0.5086,
      0,
      0,
      0,
      114.7,
      15.2
    );

    this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1));

    // webpageHeader
    this.instance_20 = new lib.webpageHeader();
    this.instance_20.setTransform(
      219.75,
      29.15,
      1.0318,
      1.246,
      0,
      0,
      0,
      219.7,
      23.4
    );
    var instance_20Filter_11 = new cjs.ColorFilter(0, 0, 0, 1, 51, 54, 61, 0);
    this.instance_20.filters = [instance_20Filter_11];
    this.instance_20.cache(-2, -2, 444, 51);

    this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1));
    this.timeline.addTween(cjs.Tween.get(instance_20Filter_11).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpage3,
    new cjs.Rectangle(-6.9, 0, 453.5, 277),
    null
  );

  (lib.webpage1 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // webpageEffect
    this.instance = new lib.webpageEffect();
    this.instance.setTransform(219.8, 114.3, 1, 1, 0, 0, 0, 219.8, 114.3);
    this.instance.alpha = 0.5;

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    // webpageNav
    this.instance_1 = new lib.webpageNav();
    this.instance_1.setTransform(304.15, 22.55, 1, 1, 0, 0, 0, 111.7, 6);

    this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

    // webpageLogo
    this.instance_2 = new lib.webpageLogo();
    this.instance_2.setTransform(69.8, 22.55, 1, 1, 0, 0, 0, 46, 11.8);

    this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

    // webpageImg4
    this.instance_3 = new lib.webpageImg4();
    this.instance_3.setTransform(384.5, 206.15, 1, 1, 0, 0, 0, 35, 22.4);

    this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

    // webpageImg3
    this.instance_4 = new lib.webpageImg3();
    this.instance_4.setTransform(310.25, 206.15, 1, 1, 0, 0, 0, 35, 22.4);

    this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

    // webpageImg2
    this.instance_5 = new lib.webpageImg2();
    this.instance_5.setTransform(349.25, 121.5, 1, 1, 0, 0, 0, 74, 54.2);

    this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

    // webpageImg1
    this.instance_6 = new lib.webpageImg1();
    this.instance_6.setTransform(138.3, 215.3, 1, 1, 0, 0, 0, 114.5, 13.3);

    this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

    // webpageText
    this.instance_7 = new lib.webpageText();
    this.instance_7.setTransform(138.3, 150.3, 1, 1, 0, 0, 0, 114.5, 40.7);

    this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

    // webPageHeading
    this.instance_8 = new lib.webPageHeading();
    this.instance_8.setTransform(138.3, 82.4, 1, 1, 0, 0, 0, 114.5, 15.1);

    this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

    // webpageHeader
    this.instance_9 = new lib.webpageHeader();
    this.instance_9.setTransform(219.8, 23.4, 1, 1, 0, 0, 0, 219.8, 23.4);

    this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.webpage1,
    new cjs.Rectangle(0, 0, 439.6, 228.7),
    null
  );

  (lib.bubble2 = function(mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // bubblePicto2
    this.instance = new lib.bubblePicto2();
    this.instance.setTransform(40.9, 57.85, 1, 1, 0, 0, 0, 25, 25);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    // bubbleText
    this.instance_1 = new lib.bubbleText2();
    this.instance_1.setTransform(109.65, 55.9, 1, 1, 0, 0, 0, 31.7, 22.4);

    this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

    // bubbleFormat
    this.instance_2 = new lib.bubbleFormat();
    this.instance_2.setTransform(78.7, 48.6, 1, 1, 0, 0, 0, 78.7, 48.6);

    this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib.bubble2,
    new cjs.Rectangle(0, 0, 157.4, 97.3),
    null
  );

  // stage content:
  (lib.dismoiwebsitecoveranimationvar1 = function(
    mode,
    startPosition,
    loop,
    reversed
  ) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    this.actionFrames = [79];
    // timeline functions:
    this.frame_79 = function() {
      this.stop();
      document.getElementById('rotatingWords').classList.add('started');
    };

    // actions tween:
    this.timeline.addTween(
      cjs.Tween.get(this)
        .wait(79)
        .call(this.frame_79)
        .wait(1)
    );

    // bubble1
    this.instance = new lib.bubble2();
    this.instance.setTransform(346.05, 91.25, 1, 1, 0, 0, 0, 78.7, 48.6);
    this.instance.alpha = 0;
    this.instance._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(35)
        .to({ _off: false }, 0)
        .to({ y: 108.05, alpha: 1 }, 3)
        .wait(42)
    );

    // loader
    this.instance_1 = new lib.loader();
    this.instance_1.setTransform(6.05, 72.95, 0.0271, 1, 0, 0, 0, 219.8, 2.4);
    this.instance_1._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(23)
        .to({ _off: false }, 0)
        .to({ scaleX: 1, x: 219.9 }, 6)
        .to({ alpha: 0 }, 3)
        .wait(48)
    );

    // webpage
    this.instance_2 = new lib.webpage3();
    this.instance_2.setTransform(219.9, 184.8, 1, 1, 0, 0, 0, 219.8, 114.3);
    this.instance_2.alpha = 0.8008;

    this.instance_3 = new lib.webpage1();
    this.instance_3.setTransform(219.9, 184.8, 1, 1, 0, 0, 0, 219.8, 114.3);
    this.instance_3.alpha = 0;
    this.instance_3._off = true;

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance_2 }] })
        .to({ state: [{ t: this.instance_3 }] }, 29)
        .to({ state: [{ t: this.instance_3 }] }, 3)
        .wait(48)
    );
    this.timeline.addTween(
      cjs.Tween.get(this.instance_3)
        .wait(29)
        .to({ _off: false }, 0)
        .to({ alpha: 0.8008 }, 3)
        .wait(48)
    );
    this.instance_2.addEventListener('tick', AdobeAn.handleFilterCache);

    // extension
    this.instance_4 = new lib.extension();
    this.instance_4.setTransform(387.05, 46.55, 1, 1, 0, 0, 0, 11.6, 10.9);

    this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(80));

    // url
    this.instance_5 = new lib.url();
    this.instance_5.setTransform(20.85, 47, 0.0375, 1, 0, 0, 0, 122.7, 4);
    this.instance_5._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_5)
        .wait(4)
        .to({ _off: false }, 0)
        .to({ regX: 122.8, scaleX: 0.3583, x: 60.2 }, 5)
        .wait(4)
        .to({ regX: 122.6, scaleX: 1, x: 138.85 }, 10)
        .wait(57)
    );

    // browser
    this.instance_6 = new lib.browser();
    this.instance_6.setTransform(219.9, 149.6, 1, 1, 0, 0, 0, 219.8, 149.6);

    this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(80));

    this._renderFirstFrame();
  }).prototype = p = new lib.AnMovieClip();
  p.nominalBounds = new cjs.Rectangle(213.2, 151, 233.5, 196.5);
  // library properties:
  lib.properties = {
    id: '5ED811F4CA4D4A1082E6963D6B77B250',
    width: 440,
    height: 300,
    fps: 24,
    color: '#000000',
    opacity: 0.0,
    manifest: [],
    preloads: []
  };

  // bootstrap callback support:

  (lib.Stage = function(canvas) {
    createjs.Stage.call(this, canvas);
  }).prototype = p = new createjs.Stage();

  p.setAutoPlay = function(autoPlay) {
    this.tickEnabled = autoPlay;
  };
  p.play = function() {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndPlay(this.getTimelinePosition());
  };
  p.stop = function(ms) {
    if (ms) this.seek(ms);
    this.tickEnabled = false;
  };
  p.seek = function(ms) {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000);
  };
  p.getDuration = function() {
    return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000;
  };

  p.getTimelinePosition = function() {
    return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000;
  };

  an.bootcompsLoaded = an.bootcompsLoaded || [];
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = [];
  }

  an.bootstrapCallback = function(fnCallback) {
    an.bootstrapListeners.push(fnCallback);
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i]);
      }
    }
  };

  an.compositions = an.compositions || {};
  an.compositions['5ED811F4CA4D4A1082E6963D6B77B250'] = {
    getStage: function() {
      return exportRoot.stage;
    },
    getLibrary: function() {
      return lib;
    },
    getSpriteSheet: function() {
      return ss;
    },
    getImages: function() {
      return img;
    }
  };

  an.compositionLoaded = function(id) {
    an.bootcompsLoaded.push(id);
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id);
    }
  };

  an.getComposition = function(id) {
    return an.compositions[id];
  };

  an.makeResponsive = function(
    isResp,
    respDim,
    isScale,
    scaleType,
    domContainers
  ) {
    var lastW,
      lastH,
      lastS = 1;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
      var w = lib.properties.width,
        h = lib.properties.height;
      var iw = window.innerWidth,
        ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1;
      if (isResp) {
        if (
          (respDim == 'width' && lastW == iw) ||
          (respDim == 'height' && lastH == ih)
        ) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      domContainers[0].width = w * pRatio * sRatio;
      domContainers[0].height = h * pRatio * sRatio;
      domContainers.forEach(function(container) {
        container.style.width = w * sRatio + 'px';
        container.style.height = h * sRatio + 'px';
      });
      stage.scaleX = pRatio * sRatio;
      stage.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
      stage.tickOnUpdate = false;
      stage.update();
      stage.tickOnUpdate = true;
    }
  };
  an.handleSoundStreamOnTick = function(event) {
    if (!event.paused) {
      var stageChild = stage.getChildAt(0);
      if (!stageChild.paused || stageChild.ignorePause) {
        stageChild.syncStreamSounds();
      }
    }
  };
  an.handleFilterCache = function(event) {
    if (!event.paused) {
      var target = event.target;
      if (target) {
        if (target.filterCacheList) {
          for (var index = 0; index < target.filterCacheList.length; index++) {
            var cacheInst = target.filterCacheList[index];
            if (
              cacheInst.startFrame <= target.currentFrame &&
              target.currentFrame <= cacheInst.endFrame
            ) {
              cacheInst.instance.cache(
                cacheInst.x,
                cacheInst.y,
                cacheInst.w,
                cacheInst.h
              );
            }
          }
        }
      }
    }
  };
})((createjs = createjs || {}), (AdobeAn = AdobeAn || {}));
var createjs, AdobeAn;
