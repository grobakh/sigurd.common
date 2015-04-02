define('controls/rtf/urlHighLighter', [], function () {
    var _urlRegExp;
    return {
        getUrlRegExp: function () {
            if(_urlRegExp)
            {
                return _urlRegExp;
            }
            var i;
            var domains = ['aero', 'asia', 'biz', 'cat', 'com', 'coop', 'info', 'int', 'jobs', 'mobi', 'museum',
                'name', 'net', 'org', 'post', 'pro', 'tel', 'travel', 'xxx', 'edu', 'gov', 'mil',
                'ad', 'af', 'ae', 'ag', 'ac', 'ai', 'al', 'am', 'an', 'ar', 'as', 'aw', 'ax', 'az', 'ba', 'ao',
                'aq', 'at', 'au', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bm', 'bn', 'bo', 'br', 'bs',
                'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn',
                'co', 'cr', 'cs', 'cu', 'cv', 'cx', 'cy', 'cz', 'dd', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec',
                'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd',
                'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy',
                'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it',
                'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li',
                'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mg', 'mh', 'mk', 'ml', 'mm',
                'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne',
                'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk',
                'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb',
                'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'su',
                'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp',
                'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi',
                'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'yu', 'za', 'zm', 'zw'];
            var part1 = '((http|https|ftp)://)?[-a-zA-Z0-9_\\+.]{2,256}\\.(';
            var part2 = ')(\\S)*';
            var pattern = part1;

            for (i = 0; i < domains.length; i++) {
                pattern += domains[i];
                if (i !== domains.length - 1) {
                    pattern += '|';
                }
            }
            pattern += part2;

            return _urlRegExp = new RegExp(pattern, 'gi');
        },

        removeHighLight: function (text) {
            var pattern = "<(\\/)?a(\\s)*[^>]*>";
            return text ? text.replace(new RegExp(pattern, 'gi'), '') : '';
        },

        removeAllTags: function (text) {
            var pattern = "(<([^>]+)>)";
            return text ? text.replace(new RegExp(pattern, 'gi'), '') : '';
        },

        decodeSpaces: function (text) {
            return text ? text.replace(new RegExp('&nbsp;', 'gi'), ' ') : '';
        },

        replaceNewLine: function (text) {
            if (!text) {
                return '';
            }

            text = text.replace(new RegExp('<div>(\\s)*(<br/>|<br>)', 'gi'), '\n');
            text = text.replace(new RegExp('<div>', 'gi'), '\n');
            return text.replace(new RegExp('(<br>|<br/>)', 'gi'), '\n');
        },

        wrapUrl: function (url) {
            return '<a href="' + url + '" target="_blank">' + url + '<\/a>';
        },

        getHrefRegExp: function () {
            return new RegExp('href="(?!http|ftp|https)([^"]*)"', 'gi');
        },

        highLightUrls: function (text) {
            if (!text) {
                return '';
            }
            var self = this;
            text = self.removeHighLight(text);
            text = text.replace(self.getUrlRegExp(), self.wrapUrl('$&'));
            text = text.replace(self.getHrefRegExp(), 'href="http://$1"');
            return text;
        },

        escapeForRegExp: function (str) {
            if (!str) {
                return '';
            }
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
    };
});