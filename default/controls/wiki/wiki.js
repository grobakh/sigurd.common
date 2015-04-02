define('controls/wiki/wiki', ['core/view/component'], function (Component) {

//// The markup rules ////////////////////////////////////////////////////////
    var MarkupRule = function (regex, rule) {
        this.regex = regex;
        this.rule = rule;
        this.children = [];
    };

    var ElementRule = function (params) {
        return new MarkupRule(params.regex, function (r) {
            var text = "";
            if ("capture" in params) {
                text = r[params.capture];
            }
            if (text) {
                if ("replaceRegex" in params) {
                    text = text.replace(params.replaceRegex, params.replaceString);
                }
                var tag = "<" + params.tag + ">";
                var endtag = "</" + params.tag + ">";

                if (!("tag" in params)) {
                    tag = endtag = "";
                }

                if ("decodeHTML" in params) {
                    text = _.decodeHTML(text);
                }

                if ("terminal" in params) {
                    return tag + text + endtag;
                }

                return tag + this.markUp(text) + endtag;
            } else if ("tag" in params) {
                return "<" + params.tag + " />";
            } else {
                return "";
            }
        });
    };

    function toXHTML(wikiText) {
        return toXHTML.root.markUp(_.encodeHTML(wikiText));
    }

    // A header is text within equals signs (=)
    toXHTML.h1 = new ElementRule({ tag: "h1", capture: 2,
        regex: /(^|\n)[ \t]*={1}[ \t](.+?)[ \t]*=*\s*(\n|$)/ });
    toXHTML.h2 = new ElementRule({ tag: "h2", capture: 2,
        regex: /(^|\n)[ \t]*={2}[ \t](.+?)[ \t]*=*\s*(\n|$)/ });
    toXHTML.h3 = new ElementRule({ tag: "h3", capture: 2,
        regex: /(^|\n)[ \t]*={3}[ \t](.+?)[ \t]*=*\s*(\n|$)/ });
    toXHTML.h4 = new ElementRule({ tag: "h4", capture: 2,
        regex: /(^|\n)[ \t]*={4}[ \t](.+?)[ \t]*=*\s*(\n|$)/ });
    toXHTML.h5 = new ElementRule({ tag: "h5", capture: 2,
        regex: /(^|\n)[ \t]*={5}[ \t](.+?)[ \t]*=*\s*(\n|$)/ });
    toXHTML.h6 = new ElementRule({ tag: "h6", capture: 2,
        regex: /(^|\n)[ \t]*={6}[ \t](.+?)[ \t]*=*\s*(\n|$)/ });

    // hr is a line of 4 dashes (-)
    toXHTML.hr = new ElementRule({ tag: "hr", regex: /(^|\n)\s*----\s*(\n|$)/ });

    // br is two backslashes (\)
    toXHTML.br = new ElementRule({ tag: "br", regex: /\\\\/ });

    // Preformatted blocks are wrapped in {{{...}}}
    toXHTML.preBlock = new ElementRule({ tag: "pre", capture: 2, terminal: true,
        regex: /(^|\n){{{\n?(.*?(\n.*?)*?)}}}(\n|$)/ });

    // tt inlines are also wrapped in {{{...}}}
    toXHTML.tt = new ElementRule({ tag: "tt", terminal: true,
        regex: /{{{(.*?(?:\n.*?)*?)}}}/, capture: 1 });

    // VELOCITY TEMPLATE}
    toXHTML.vt = new ElementRule({ decodeHTML: true, terminal: true,
        regex: /(\${(.*?(?:\n.*?)*?)})/, capture: 1 });

    // Unordered and ordered lists start with * or #
    toXHTML.ulist = new ElementRule({ tag: "ul",
        regex: /(^|\n)(\*[^*#].*(\n|$)([*#]{2}.*(\n|$))*)+/, capture: 0,
        replaceRegex: /(^|\n)[*#]/g, replaceString: "$1" });
    toXHTML.olist = new ElementRule({ tag: "ol",
        regex: /(^|\n)(#[^*#].*(\n|$)([*#]{2}.*(\n|$))*)+/, capture: 0,
        replaceRegex: /(^|\n)[*#]/g, replaceString: "$1" });
    toXHTML.li = new ElementRule({tag: "li", regex: /.+(\n[*#].+)*/, capture: 0});

    // Tables
    toXHTML.table = new ElementRule({ tag: "table",
        regex: /(^|\n)(\|.*\|[ \t]*(\n|$))+/, capture: 0 });
    toXHTML.tr = new ElementRule({ tag: "tr",
        regex: /(^|\n)(\|.*)\|[ \t]*(\n|$)/, capture: 2 });
    toXHTML.td = new ElementRule({ tag: "td",
        regex: /[|]+([^|]*)/, capture: 1 });

    // Kinds of text block:
    //   - paragraph is the fallback for the root rule
    //     and consists of blocks of text separated by blank lines
    //   - singleLine is used within lists
    toXHTML.singleLine = new ElementRule({ regex: /.+/, capture: 0 });
    toXHTML.paragraph = new ElementRule({ tag: "p",
        regex: /(^|\n)([ \t]*[^\s].*(\n|$))+/, capture: 0 });

    // Strongly emphasised text is surrounded by double-* characters
    toXHTML.strong = new ElementRule({ tag: "strong", capture: 1,
        regex: /\*\*([^*]*(?:\*[^*]+)*)\*\*/ });

    // Emphasised text is surrounded by double-/ characters
    // It must skip http:// or ftp:// internally
    // (This would be a lot easier to write with negative lookbehind!)
    toXHTML.em = new ElementRule({ tag: "em", capture: 1,
        regex: "\\/\\/(" + // Starts with a double-/
            "[^\\/hf]*(?:" + "\\/?(?:http:\\/?|ftp:\\/?)*(?:" + "h(?:t(?:tp?)?)?" + "|" + "f(?:tp?)?" + "|" + "(?:" +
            "h[^t\\/hf]" + "|" + "ht[^t\\/hf]" + "|" + "htt[^p\\/hf]" + "|" + "http[^:\\/hf]" + "|" + "http:[^\\/hf]" +
            "|" + "http:\\/[^\\/hf]" + "|" + "http:\\/\\/" + "|" + "f[^t\\/hf]" + "|" + "ft[^p\\/hf]" + "|" +
            "ftp[^:\\/hf]" + "|" + "ftp:[^\\/hf]" + "|" + "ftp:\\/[^\\/hf]" + "|" + "ftp:\\/\\/" + ")" + "[^\\/hf]*" +
            ")" + "|" + "\\/[^\\/hf][^\\/hf]*" + ")*" + ")" + "\\/\\/" // Ends with a double-/
    });

    // Links
    toXHTML.linkPattern = "[^\\]|\\n]*(?:\\][^\\]|\\n]+)*";
    toXHTML.urlProtocols = "(?:http|https|ftp|afs|news|nntp|mid|cid|mailto|" + "wais|prospero|telnet|gopher)";
    toXHTML.urlPattern = toXHTML.urlProtocols + ":" + "[^\\]|\\n]*(?:\\][^\\]|\\n]+)*";
    toXHTML.loneURLPattern = "(?:" + toXHTML.urlProtocols + ":[\\$-:=\\?-Z_a-z~]+[\\$-+\\/-Z_a-z~-])";

    toXHTML.rawURL = new MarkupRule("(" + toXHTML.loneURLPattern + ")", function (r) {
        return "<a href=\"" + r[1] + "\">" + r[1] + "</a>";
    });
    toXHTML.unnamedURL = new MarkupRule("\\[\\[(" + toXHTML.urlPattern + ")\\]\\]", function (r) {
        return "<a href=\"" + r[1] + "\">" + r[1] + "</a>";
    });
    toXHTML.unnamedLink = new MarkupRule("\\[\\[(" + toXHTML.linkPattern + ")\\]\\]", function (r) {
        this.children = [ toXHTML.singleLine ];
        var link = this.markUp(r[1]);
        return "<a href=\"" + link + "\">" + link + "</a>";
    });
    toXHTML.namedURL = new MarkupRule("\\[\\[(" + toXHTML.urlPattern + ")\\|(.*?)\\]\\]", function (r) {
        return "<a href=\"" + r[1] + "\">" + r[2] + "</a>";
    });
    toXHTML.namedLink = new MarkupRule("\\[\\[(" + toXHTML.linkPattern + ")\\|(.*?)\\]\\]", function (r) {
        this.children = [ toXHTML.singleLine ];
        var link = this.markUp(r[1]);
        var value = toXHTML.singleLine.markUp(r[2]);
        return "<a href=\"" + link + "\">" + value + "</a>";
    });

    // Images
    toXHTML.img = new MarkupRule("{{([^|\\n{}][^|\\n}]*(?:}[^|\\n}]+)*)\\|([^|\\n}]*(?:}[^|\\n}]+)*)}}", function (r) {
        return "<img src=\"" + r[1] + "\" alt=\"" + r[2] + "\"/>";
    });

    // Children of lists
    toXHTML.ulist.children = toXHTML.olist.children = [toXHTML.li];
    toXHTML.li.children = [toXHTML.olist, toXHTML.ulist, toXHTML.singleLine];

    // Children of table items
    toXHTML.table.children = [toXHTML.tr];
    toXHTML.tr.children = [toXHTML.td];
    toXHTML.td.children = [toXHTML.singleLine];

    // Children within blocks
    toXHTML.singleLine.children = toXHTML.paragraph.children = toXHTML.strong.children = toXHTML.em.children = toXHTML.tt.children =
        [
            toXHTML.strong, toXHTML.em, toXHTML.br, toXHTML.rawURL, toXHTML.unnamedURL, toXHTML.unnamedLink,
            toXHTML.namedURL, toXHTML.namedLink, toXHTML.tt, toXHTML.img, toXHTML.vt
        ];

    // The root rule used to start the parser
    toXHTML.root = new MarkupRule();
    toXHTML.root.children = [
        toXHTML.h1, toXHTML.h2, toXHTML.h3, toXHTML.h4, toXHTML.h5, toXHTML.h6, toXHTML.hr, toXHTML.olist,
        toXHTML.ulist, toXHTML.preBlock, toXHTML.table
    ];
    toXHTML.root.fallback = new MarkupRule();
    toXHTML.root.fallback.children = [toXHTML.paragraph];

//// Do the rendering ////////////////////////////////////////////////////////
// Apply each rule, and use whichever matches first in the text
// If there is a tie, use whichever is first in the list of rules
    MarkupRule.prototype.markUp = function (text) {
        var head = "";
        var tail = "" + text;
        var matches = [];
        var i;

        for (i = 0; i < this.children.length; i++) {
            matches[i] = tail.match(this.children[i].regex);
        }
        var best = false;
        var b_i = false;
        for (i = 0; i < this.children.length; i++) {
            if (matches[i] && (!best || best.index > matches[i].index)) {
                best = matches[i];
                b_i = i;
            }
        }
        while (best) {
            if ((best.index > 0) && (this.fallback)) {
                head += this.fallback.markUp(tail.substring(0, best.index));
            } else {
                head += tail.substring(0, best.index);
            }
            head += this.children[b_i].rule(best);
            var chopped = best.index + best[0].length;
            tail = tail.substring(chopped);
            for (i = 0; i < this.children.length; i++) {
                if (matches[i]) {
                    if (matches[i].index >= chopped) {
                        matches[i].index -= chopped;
                    } else {
                        matches[i] = tail.match(this.children[i].regex);
                    }
                }
            }
            best = false;
            for (i = 0; i < this.children.length; i++) {
                if (matches[i] && (!best || best.index > matches[i].index)) {
                    best = matches[i];
                    b_i = i;
                }
            }
        }
        if (tail.length > 0 && this.fallback) {
            tail = this.fallback.markUp(tail);
        }
        return head + tail;
    };

    return Component.extend({
        setup: {
            template: null,
            text: undefined,
            'wiki-length': 0
        },

        initialize: function () {
            this.watch('text', this.renderAsync);
        },

        pasteContent: function () {
            var self = this;
            self.place.setText(this.processWiki(this.get('text')), true);

            if (self.place.canChange['wiki-length']) {
                self.set('wiki-length', self.place.getText().trim().length);
            }

            return self.place;
        },

        processWiki: function (text) {
            if (!text) {
                return "";
            }

            text = toXHTML(text);
            return text;
        }
    });
});
