define('controls/scroller/scroller', ['core/view/component'], function (Component) {

    return Component.extend({
        setup: {
            template: "controls/scroller/scroller",
            offset: 6,
            'content-height': 0
        },

        initialize: function () {
            var self = this;
            self.width = 12; //ширина скроллера
            self.size = 12;  //размер кнопок по вертикали
            self.step = 32;  //шаг промотки по стрелочкам
            self.miniStep = 6; //шаг промотки по клику на верх/низ
            self.hidden = true; //скрыт по умолчанию
            self.mozillaMultiplier = -10; //скорость скролла колесом мыши для Mozilla, с минусом.
            self.keyboardExclusions = ['select-one', 'select-multiple', 'textarea']; //забирают себе клавиатуру

            self.doubleSize = self.size << 1;

            self.debouncedRemeasure = self.debounce(self.remeasure);
            self.debouncedRefresh = self.debounce(self.refresh);
        },

        measure: function () {
            Component.prototype.measure.call(this);
                    this.debouncedRemeasure();
                },

        attachElements: function () {
            var self = this;
            self.targetElement = self.place.pins.target.getElement();

            var fullOffset = self.get('offset') + self.width;
            self.guts = undefined;
            self.place.pins.topScrolled.setStyleNumber('right', fullOffset);
            self.place.pins.bottomScrolled.setStyleNumber('right', fullOffset);
            self.place.pins.target.setStyleNumber('right', fullOffset);

            var mutationObserver = window.MutationObserver || window.WebKitMutationObserver ||
                window.MozMutationObserver;

            if (mutationObserver !== undefined) { // Standards compliant
                self.observer = new mutationObserver(self.debouncedRemeasure);
                self.observer.observe(self.targetElement, {
                    childList: true,
                    attributes: true,
                    characterData: true,
                    subtree: true
                });
            }
            else {  //Old browsers & Presto
                self.place.attach('DOMSubtreeModified', function (event) {
                    self.debouncedRemeasure();
                }, self);

                self.place.attach('DOMNodeInserted', function (event) {
                    self.debouncedRemeasure();
                }, self);

                self.place.attach('DOMNodeRemoved', function (event) {
                    self.debouncedRemeasure();
                }, self);

                self.place.attach('DOMAttrModified', function (event) {
                    self.debouncedRemeasure();
                }, self);
            }

            self.place.pins.target.attach('resize', function (event) {
                event.stopPropagation();
                self.debouncedRemeasure();
            });
        },

        attachControls: function () {
            var self = this;
            self.place.pins.downButton.attach('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();
                self.place.pins.downButton.addClass('active');
                self.moveDown(self.step);
                self.startScroll = setTimeout(function () {
                    self.autoScroll = setInterval(function () {
                        self.moveDown(self.step);
                    }, 50);
                }, 200);
            });

            self.place.pins.bottomScrolled.attach('mousedown', function (event) {
                event.stopPropagation();
                self.moveDown(self.miniStep);
                self.startScroll = setTimeout(function () {
                    self.autoScroll = setInterval(function () {
                        self.moveDown(self.miniStep);
                    }, 50);
                }, 200);
            });

            self.place.pins.upButton.attach('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();
                self.place.pins.upButton.addClass('active');
                self.moveUp(self.step);
                self.startScroll = setTimeout(function () {
                    self.autoScroll = setInterval(function () {
                        self.moveUp(self.step);
                    }, 50);
                }, 200);
            });

            self.place.pins.topScrolled.attach('mousedown', function (event) {
                event.stopPropagation();
                self.moveUp(self.miniStep);
                self.startScroll = setTimeout(function () {
                    self.autoScroll = setInterval(function () {
                        self.moveUp(self.miniStep);
                    }, 50);
                }, 200);
            });

            self.place.pins.rightScroller.attach('mousedown', function (event) {
                event.stopPropagation();
                //if (event.offsetY < self.place.pins.scrolltab.tab.getElement().offsetTop) {   //Not working in FF
                if (event.clientY < self.place.pins.scrolltab.getElement().getBoundingClientRect().top) {
                    self.moveUp(self.page);
                }
                else {
                    self.moveDown(self.page);
                }

            });

            function clearIntervals() {
                self.place.pins.upButton.removeClass('active');
                self.place.pins.downButton.removeClass('active');
                clearInterval(self.startScroll);
                clearInterval(self.autoScroll);
            }

            self.place.pins.upButton.attach('mouseup', clearIntervals);
            self.place.pins.upButton.attach('mouseout', clearIntervals);
            self.place.pins.downButton.attach('mouseup', clearIntervals);
            self.place.pins.downButton.attach('mouseout', clearIntervals);
            self.place.pins.topScrolled.attach('mouseup', clearIntervals);
            self.place.pins.topScrolled.attach('mouseout', clearIntervals);
            self.place.pins.bottomScrolled.attach('mouseup', clearIntervals);
            self.place.pins.bottomScrolled.attach('mouseout', clearIntervals);

            self.place.attach('keydown', function (event) {
                if (self.keyboardExclusions.indexOf(event.target.type) === -1) {

                    if (event.keyCode === 38) {
                        event.stopPropagation();
                        self.moveUp(self.step);
                    }
                    if (event.keyCode === 40) {
                        event.stopPropagation();
                        self.moveDown(self.step);
                    }
                    if (event.keyCode === 33) {
                        event.stopPropagation();
                        self.moveUp(self.page);
                    }
                    if (event.keyCode === 34) {
                        event.stopPropagation();
                        self.moveDown(self.page);
                    }
                    if (event.keyCode === 36) {
                        event.stopPropagation();
                        self.scrollTo(0);
                    }
                    if (event.keyCode === 35) {
                        event.stopPropagation();
                        self.scrollTo(self.downLimit);
                    }

                }
            });

            self.place.pins.scrolltab.attach('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();
                self.place.pins.scrolltab.addClass('active');
                self.place.pins.scrollBlocker.addClass('scroll-blocker-active');
                self.startingPointY = event.pageY;
                self.startingOffsetY = self.targetElement.scrollTop;
                self.place.attach('mousemove', function (e) {
                    self.onMouseMove(e);
                });

            });

            self.place.pins.scrollBlocker.attach('mouseup', function (event) {
                event.stopPropagation();
                self.place.pins.scrolltab.removeClass('active');
                self.place.detach('mousemove');
                self.place.pins.scrollBlocker.removeClass('scroll-blocker-active');
                self.startingPointY = undefined;

            });

            self.place.pins.scrollBlocker.attach('mouseout', function (event) {
                self.place.detach('mousemove');

                self.startingPointY = undefined;
                event.stopPropagation();
                self.place.pins.scrollBlocker.removeClass('scroll-blocker-active');
            });

            self.place.attach('DOMMouseScroll', function (event) {
                event.stopPropagation();
                self.mouseWheel(self.mozillaMultiplier * event.detail);
            });

            self.place.attach('mousewheel', function (event) {
                //var self = this;
                event.stopPropagation();
                self.mouseWheel(event.wheelDelta);
            });

            self.place.pins.target.attach('focus', function () {
                if (self.targetElement.scrollTop > 0) {
                    self.place.pins.topScrolled.addClass('active-scrolled');
                }
                else {
                    self.place.pins.topScrolled.removeClass('active-scrolled');
                }
                if (self.targetElement.scrollTop < self.downLimit) {
                    self.place.pins.bottomScrolled.addClass('active-scrolled');
                }
                else {
                    self.place.pins.bottomScrolled.removeClass('active-scrolled');
                }
                self.debouncedRefresh();
            }, self);
        },

        detachElements: function () {
            var self = this;
            if (!self.hidden) {
                self.detachControls();
            }
            if (self.observer) {
                self.observer.disconnect();
            } else {  //Old browsers & Presto
                self.place.detach('DOMSubtreeModified');
                self.place.detach('DOMNodeInserted');
                self.place.detach('DOMNodeRemoved');
                self.place.detach('DOMAttrModified');
            }

            if (self.place.pins.target) {
                self.place.pins.target.detach('resize');
            }
        },

        detachControls: function () {
            var self = this;

            clearInterval(self.startScroll);
            clearInterval(self.autoScroll);

            self.place.pins.downButton.detach('mousedown');
            self.place.pins.upButton.detach('mousedown');
            self.place.pins.bottomScrolled.detach('mousedown');
            self.place.pins.topScrolled.detach('mousedown');
            self.place.pins.rightScroller.detach('mousedown');

            self.place.pins.upButton.detach('mouseup');
            self.place.pins.upButton.detach('mouseout');
            self.place.pins.downButton.detach('mouseup');
            self.place.pins.downButton.detach('mouseout');
            self.place.pins.topScrolled.detach('mouseup');
            self.place.pins.topScrolled.detach('mouseout');
            self.place.pins.bottomScrolled.detach('mouseup');
            self.place.pins.bottomScrolled.detach('mouseout');

            self.place.detach('keydown');

            self.place.pins.scrolltab.detach('mousedown');

            self.place.pins.scrollBlocker.detach('mouseup');

            self.place.detach('mousemove');

            self.place.pins.scrollBlocker.detach('mouseout');

            self.place.detach('DOMMouseScroll');

            self.place.detach('mousewheel');

            self.place.pins.target.detach('focus');
        },

        onMouseMove: function (event) {
            event.stopPropagation();
            this.scrollTo(Math.floor(this.startingOffsetY + ((event.pageY - this.startingPointY) * this.ratio)));
        },

        scrollTo: function (newValue) {
            if (newValue >= this.downLimit) {
                this.targetElement.scrollTop = this.downLimit;
                this.place.pins.bottomScrolled.removeClass('active-scrolled');
                this.place.pins.topScrolled.addClass('active-scrolled');
            }
            else {
                if (newValue <= this.upLimit) {
                    this.targetElement.scrollTop = this.upLimit;
                    this.place.pins.topScrolled.removeClass('active-scrolled');
                }
                else {
                    this.targetElement.scrollTop = newValue;
                    this.place.pins.topScrolled.addClass('active-scrolled');
                }
                this.place.pins.bottomScrolled.addClass('active-scrolled');
            }
            this.refresh();
        },

        moveDown: function (step) {
            if (this.targetElement.scrollTop + step >= this.downLimit) {
                this.targetElement.scrollTop = this.downLimit;
                this.place.pins.bottomScrolled.removeClass('active-scrolled');
            } else {
                this.targetElement.scrollTop = this.targetElement.scrollTop + step;
                this.place.pins.bottomScrolled.addClass('active-scrolled');
            }
            this.place.pins.topScrolled.addClass('active-scrolled');
            this.refresh();
        },

        moveUp: function (step) {
            if (this.targetElement.scrollTop <= this.upLimit + step) {
                this.targetElement.scrollTop = this.upLimit;
                this.place.pins.topScrolled.removeClass('active-scrolled');
            } else {
                this.targetElement.scrollTop = this.targetElement.scrollTop - step;
                this.place.pins.topScrolled.addClass('active-scrolled');
            }
            this.place.pins.bottomScrolled.addClass('active-scrolled');
            this.refresh();
        },

        mouseWheel: function (delta) {
            this.scrollTo(this.targetElement.scrollTop - delta);
        },

        refresh: function () {
            // Фейк. Назначается в remeasure.
        },

        refreshNormal: function () {  // Fast duplication used
            this.place.pins.scrolltab.setStyleNumber('height', this.tabHeight);
            this.place.pins.scrolltab.setStyleNumber('top', parseInt(
                (this.place.pins.rightScroller.getElement().clientHeight - this.tabHeight - this.doubleSize) *
                    (this.targetElement.scrollTop - this.upLimit) / (this.downLimit - this.upLimit) + this.size, 10)
            );
        },

        refreshSmall: function () {
            //Здесь пока ничего нет
        },

        remeasure: function () {
            var self = this;

            if (!(self.targetElement)) {  //перестраховка
                _.log('scroller attempts to measure itself before rendering');
                return;
            }

            var scrollerHeight;
            var viewport = self.targetElement.clientHeight;
            var guts = self.place.pins.content.getElement().clientHeight;

            self.set('content-height', guts);

            if (self.upLimit) {
                self.targetElement.scrollTop = self.targetElement.scrollTop + self.place.pins.content.getElement().offsetTop - self.upLimit;
            }
            self.upLimit = self.place.pins.content.getElement().offsetTop;

            if (!viewport || ((guts !== undefined) && (guts <= viewport))) {
                self.targetElement.scrollTop = self.upLimit;
                self.place.pins.rightScroller.hide();
                self.detachControls();
                self.hidden = true;
                self.place.pins.bottomScrolled.removeClass('active-scrolled');
                self.place.pins.topScrolled.removeClass('active-scrolled');
            }
            else {
                if (self.hidden) {
                    self.place.pins.rightScroller.show('block');
                    self.hidden = false;
                    self.attachControls();
                }
                self.downLimit = self.upLimit + guts - viewport;
                scrollerHeight = self.place.pins.rightScroller.getElement().clientHeight;
                if (viewport > 2 * self.step) {
                    self.page = viewport - self.step;
                }
                else {
                    self.page = viewport;
                }
                self.tabHeight = Math.floor(
                    (scrollerHeight - self.doubleSize) * viewport / guts);
                if (self.tabHeight < self.size) {
                    self.tabHeight = self.size;
                }
                if (scrollerHeight < (self.size << 2)) {
                    self.place.pins.scrolltab.hide();
                    self.refresh = self.refreshSmall;
                    if (scrollerHeight < self.doubleSize) {
                        self.place.pins.upButton.setStyleNumber('height', (scrollerHeight >> 1) + 1);
                        self.place.pins.downButton.setStyleNumber('height', (scrollerHeight >> 1) + 1);
                    }
                    else {
                        self.place.pins.upButton.setStyleNumber('height', self.size);
                        self.place.pins.downButton.setStyleNumber('height', self.size);
                    }
                }
                else {
                    self.place.pins.scrolltab.show('block');
                    self.refresh = self.refreshNormal;
                    self.place.pins.upButton.setStyleNumber('height', self.size);
                    self.place.pins.downButton.setStyleNumber('height', self.size);
                }
                self.ratio = (self.downLimit - self.upLimit) / (scrollerHeight - self.tabHeight - self.doubleSize);
                if (self.targetElement.scrollTop > self.upLimit) {
                    self.place.pins.topScrolled.addClass('active-scrolled');
                }
                else if (self.targetElement.scrollTop < self.upLimit) {
                    self.targetElement.scrollTop = self.upLimit;
                }
                if (self.targetElement.scrollTop < self.downLimit) {
                    self.place.pins.bottomScrolled.addClass('active-scrolled');
                }
                else if (self.targetElement.scrollTop > self.downLimit) {
                    self.targetElement.scrollTop = self.downLimit;
                }
                self.refresh();
            }

        }
    });
});
