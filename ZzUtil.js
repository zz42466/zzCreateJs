var ZzUtil = {
    browser: {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                webKit: u.indexOf('AppleWebKit') > -1,
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                weixin: u.indexOf('MicroMessenger') > -1,
                txnews: u.indexOf('qqnews') > -1,
                sinawb: u.indexOf('weibo') > -1,
                mqq: u.indexOf('QQ') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },

    /**
     * @param medias 多媒体数组
     */
    mediaLoad: function (medias) {
        for (var media in medias) {
            media.muted = true;
            media.play();
            media.zzMediaLoad = true;
        }
    },

    /**
     * 可能的话自动加载多媒体
     */
    mediaAutoLoad: function () {
        var browser = this.browser;
        if (browser.versions.ios && (browser.versions.weixin || browser.versions.mqq)) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                //已经错过事件不能再自动播放
            } else {
                if (document.addEventListener) {
                    document.addEventListener("WeixinJSBridgeReady", this.mediaLoad, false);
                } else if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", this.mediaLoad);
                    document.attachEvent("onWeixinJSBridgeReady", this.mediaLoad);
                }
            }
        }
    }
};