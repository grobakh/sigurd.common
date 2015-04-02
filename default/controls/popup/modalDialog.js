define('controls/popup/modalDialog', ['core/view/component'], function (Component) {

    return Component.extend({
        setup: {
            template: "controls/popup/modalDialog",
            visible: false,
            command: undefined,
            'header-fragment': undefined,
            'footer-fragment': undefined,
            'scroller-content-height': undefined
        },

        initialize: function () {
            var self = this;
            self.minimalMargin = 34; //Минимальный отступ от верхнего и нижнего краёв экрана

            self.debouncedRemeasure = self.debounce(self.remeasure);

            self.hide = self.debounce(function () {
                if (!self.get('visible')) {
                    self.place.addClass(self.hideClass);
                }
            }, 200);

            self.def('doCancel', function () {
                var command = self.get('command');

                if (command && command.exec) {
                    command.exec('cancel');
                }

                var context = this.get('context');
                if (context && context.get('doCancel')) {
                    context.get('doCancel').exec();
                }
            });

            self.def('doCommit', function () {
                self.invokeOnChild('commit');

                var command = self.get('command');

                if (command && command.exec) {
                    command.exec('commit');
                }

                var context = this.get('context');
                if (context && context.get('doCommit')) {
                    context.get('doCommit').exec();
                }
            });

            self.loop('scroller-content-height', self.debouncedRemeasure);
        },

        attachElements: function () {
            var self = this;
            if (self.place.pins.content.props.region === "scroller") {
                self.measure =  function () {
                    Component.prototype.measure.call(self);
                    self.debouncedRemeasure();
                };
            }
            self.updateVisibility();
        },

        attachControls: function () {
            var self = this;
            self.place.pins.blocker.attach('mousedown', function (event) {
                event.stopPropagation();
                event.preventDefault();
            });

            self.place.pins.blocker.attach('click', function (event) {
                event.stopPropagation();
                event.preventDefault();

                self.place.pins.wrapper.setFocus();

                var command = self.get('command');
                if (command && command.exec) {
                    command.exec('blocker');
                }

                self.get('doCancel').exec();
            });

            self.place.pins.wrapper.attach('keydown', function (event) {
                if (event.keyCode === 27) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            });

            self.place.pins.wrapper.attach('keyup', function (event) {
                if (event.keyCode === 27) {
                    event.stopPropagation();
                    event.preventDefault();
                    var command = self.get('command');
                    if (command && command.exec) {
                        command.exec('blocker');
                    }

                    self.get('doCancel').exec();
                }
            });
        },

        detachControls: function () {
            var self = this;
            if (self.place.pins.blocker) {
                self.place.pins.blocker.detach('mousedown');
                self.place.pins.blocker.detach('click');
            }

            if (self.place.pins.wrapper) {
                self.place.pins.wrapper.detach('keyup');
                self.place.pins.wrapper.detach('keydown');
            }
        },

        detachElements: function () {
            if (!this.hidden) {
                this.detachControls();
            }
        },

        updateVisibility: function () {
            var self = this;

            if (!self.place.getElement()) {  //Однократный вызов до рендеринга элемента
                if (!self.hideClass) {
                    self.hideClass = self.get('hide-class') || 'system_none';
                }
                self.animateClass = 'popup-hide';
                if (!self.get('visible')) {
                    self.place.addClass(self.hideClass);
                }
            }
            else if (self.get('visible')) {
                self.attachControls();
                self.place.removeClass(self.hideClass);
                self.measure();
                self.place.pins.window.removeClass(self.animateClass);
                self.stealedFocus = document.activeElement;
                self.setFocusToInput();
            } else {
                self.detachControls();
                self.place.pins.window.addClass(self.animateClass);
                self.hide();
                if (self.stealedFocus && self.stealedFocus.focus) {
                    self.stealedFocus.focus();
                }
                self.measure();
            }
        },

        setFocusToInput: function () {
            this.place.pins.wrapper.setFocus();
        },

        remeasure: function () {
            var self = this;

            if (!self.place.pins) { // если скроллер внутри требует перемеряться раньше времени
                return;
            }

            var fullHeight = window.innerHeight ||
                Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            var marginsChanged = false;

            if (self.place.pins.header && self.place.pins.content.getStyleNumber('margin-top') !== self.place.pins.header.outerHeight(true)) {
                self.place.pins.content.setStyleNumber('margin-top', self.place.pins.header.outerHeight(true));
                marginsChanged = true;
            }

            if (self.place.pins.footer && self.place.pins.content.getStyleNumber('margin-bottom') !== self.place.pins.footer.outerHeight(true)) {
                self.place.pins.content.setStyleNumber('margin-bottom', self.place.pins.footer.outerHeight(true));
                marginsChanged = true;
            }

            var empty = fullHeight - self.place.pins.content.outerHeight(true);
            //var scrollHeight = self.content.childByDataId('content').childByDataId('inner').outerHeight(true) + 1;
            var scrollHeight = self.get('scroller-content-height') + 1;

            //единичка добавлена потому, что эксплорер путает целые и дробные значения
            var overflow = scrollHeight - self.place.pins.content.getStyleNumber('height');
            if (overflow < 0) {
                self.place.pins.content.setStyleNumber('height', self.place.pins.content.getStyleNumber('height') + overflow);
                empty = empty - overflow;
                overflow = 0;
            }
            if (self.place.pins.content.getStyleNumber('height') > fullHeight - self.minimalMargin) {
                overflow = scrollHeight - fullHeight + self.minimalMargin;
                empty = self.minimalMargin;
            }
            if (overflow > 0) {
                empty = empty - overflow;
            }
            //}

            if (empty < self.minimalMargin) {
                empty = self.minimalMargin;
            }

            if ((self.desiredTop !== (empty >> 1)) || (self.desiredHeight !== fullHeight - empty) ||
                marginsChanged) {
                self.desiredTop = (empty >> 1);
                self.desiredHeight = fullHeight - empty;

                if (self.get('visible')) {
                    self.place.pins.window.setStyleNumber('height', self.desiredHeight);
                    self.place.pins.window.setStyleNumber('margin-top', self.desiredTop);
                    self.place.pins.content.setStyleNumber('height',
                        self.desiredHeight - self.place.pins.content.outerHeight(true) + self.place.pins.content.getStyleNumber('height'));
                    Component.prototype.measure.call(self);
                }
            }

        }
    });
});
