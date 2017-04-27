this.createjs = this.createjs || {};


(function () {
    "use strict";

    function ZzLoadBar(imgOrUrl, maxValue, direction) {
        this.Bitmap_constructor(imgOrUrl);

        this.maxValue = maxValue;
        this._rate = 0;

        //设置加载条方向
        if (direction != ZzLoadBar.HORIZONTSL && direction != ZzLoadBar.VERTICAL) {
            this._direction = ZzLoadBar.HORIZONTSL;
            this.scaleX = 0;
        } else {
            this._direction = direction;
            this.scaleY = 0;
        }
    }

    var p = createjs.extend(ZzLoadBar, createjs.Bitmap);


    p.setProgress = function (rate) {
        if (rate < 0) {
            rate = 0;
        } else if (rate > 1) {
            rate = 1;
        }
        this._rate = rate;
        if (!this.image.width || !this.image.height || !this.maxValue) {
            return;
        }
        if (this._direction == ZzLoadBar.HORIZONTSL) {
            var originValue = this.image.width;
            var scale = 'scaleX';
        } else {
            var originValue = this.image.height;
            var scale = 'scaleY';
        }

        this[scale] = this._rate * (this.maxValue / originValue);
       
    }

    ZzLoadBar.HORIZONTSL = 1;
    ZzLoadBar.VERTICAL = 2;

    p.clone = function () {
        var o = new ZzLoadBar(this.image);
        if (this.sourceRect) { o.sourceRect = this.sourceRect.clone(); }
        this._cloneProps(o);
        return o;
    };

    p.toString = function () {
        return "[ZzLoadBar (name=" + this.name + ")]";
    };

    createjs.ZzLoadBar = createjs.promote(ZzLoadBar, "Bitmap");

})();



