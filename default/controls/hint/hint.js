define('controls/hint/hint', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup : {
                template : 'controls/hint/hint',
                unfold : false,
                text : ''

            },

            initialize : function () {
                var self = this;
                self.animationTimeout = 100;
                //self.watch('unfold', self.measure);
            },

            attachElements : function () {
                var self = this;

                self.place.attach('click', self.change, self);
                self.place.attach('dblclick', self.change, self);
            },

            isVisible : function () {
                var self = this;
                var hintControlTop = self.place.element.getBoundingClientRect().top;
                var hintBodyTop = self.place.pins.text.element.getBoundingClientRect().top;
                return (hintControlTop > 0) && (hintControlTop < hintBodyTop);
            },

            update : function () {
                var self = this;
                self.place.pins.text.setText(self.get('text'));
                if (self.get('unfold')) {
                    self.unfold();
                }
                else {
                    self.fold();
                }
            },

            change : function () {
                var self = this;
                if (self.get('unfold')) {
                    self.fold();
                }
                else {
                    self.unfold();
                }

            },

            unfold : function () {
                var self = this;
                if (window.foldCurrentHint) {
                    window.foldCurrentHint();
                }
                self.place.addClass("unfolded");
                self.place.pins.hintLine.setStyle('display', "block");
                self.place.pins.hintLine.setStyle('transition', "height " + self.animationTimeout + "ms linear");
                var hintBottom = self.place.element.getBoundingClientRect().bottom;
                var fullHeight = Math.max(
                        document.body.scrollHeight, document.documentElement.scrollHeight,
                        document.body.offsetHeight, document.documentElement.offsetHeight,
                        document.body.clientHeight, document.documentElement.clientHeight
                );
                var hintLineLength = fullHeight - document.body.scrollTop - hintBottom;
                self.place.pins.text.setStyle('opacity', 0);
                self.place.pins.text.setStyle('display', 'block');
                self.place.pins.hintLine.setStyle('height', hintLineLength + "px");
                self.bottomBlockHeight = self.place.pins.text.element.clientHeight;
                var timeout = Math.floor(self.animationTimeout * (window.innerHeight - hintBottom - self.bottomBlockHeight) / hintLineLength);
                self.place.pins.text.setStyle('transition', "opacity 0 linear " + timeout + "ms");
                self.place.pins.text.setStyle('opacity', 1);
                self.set('unfold', true);

                self.remeasure = function () {
                    if (self.get('unfold')) {
                        if (!self.isVisible()) {
                            self.fold();
                        }
                    }
                };

                window.addEventListener('scroll', self.remeasure, false);
                window.addEventListener('resize', self.remeasure, false);
                window.foldCurrentHint = function () {
                    self.fold();
                };
            },

            fold : function () {
                var self = this;
                window.foldCurrentHint = undefined;
                self.place.removeClass("unfolded");
                self.place.pins.hintLine.setStyle('display', "none");
                self.place.pins.hintLine.setStyle('height', 0);
                self.place.pins.text.setStyle('display', "none");
                //Remove the unfolded hint mark
                self.bottomBlockHeight = 0;
                self.set('unfold', false);
                window.removeEventListener('scroll', self.remeasure, false);
                window.removeEventListener('resize', self.remeasure, false);
            }
        });
    });