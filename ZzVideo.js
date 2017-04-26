this.createjs = this.createjs||{};


(function () {
    "use strict";

    function ZzVideo(videoOrUrl) {
        if(typeof videoOrUrl == 'string'){
            this.video = document.createElement("video");
            this.video.src = videoOrUrl;
        }else{
            this.video = videoOrUrl;
        }
        this.Bitmap_constructor(this.video);
        
        var self = this;

        //视频元数据已加载
        this.video.addEventListener('loadedmetadata', function () {
            self.image.width = self.video.videoWidth;
            self.image.height = self.video.videoHeight;
        });
    }

    var p = createjs.extend(ZzVideo, createjs.Bitmap);

    p.clone = function() {
		var o = new ZzVideo(this.image);
		if (this.sourceRect) { o.sourceRect = this.sourceRect.clone(); }
		this._cloneProps(o);
		return o;
	};
    
    p.toString = function() {
		return "[ZzVideo (name="+  this.name +")]";
	};

    createjs.ZzVideo = createjs.promote(ZzVideo, "Bitmap");

})();



