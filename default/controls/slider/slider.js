define('controls/slider/slider', ['core/view/component'], function (Component) {

    return Component.extend({
        setup: {
            template: "controls/slider/slider",
            'slider-left': undefined,
            'slider-right': undefined,
            'slider-left-limit': 30,
            'slider-right-limit': 30,
            'left-fragment': undefined,
            'right-fragment': undefined
        },

        initialize: function () {
            var self = this;

            self.dragState = false;
            self.dragX = undefined;
            self.originalMouseMove = document.onmousemove; //just for Mozilla
        },

        attachElements: function () {
            this.place.pins.dragfield.attach('mousedown', this.onStartDrag, this);
            this.place.pins.blocker.attach('mouseup', this.stopDrag, this);
        },

        onMouseMove: function (event) {
            if (!this.dragState) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if ((event.pageX < 0) || (event.pageX > document.body.clientWidth) || (event.pageY < 0) ||
                (event.pageY > document.body.clientHeight)) {
                this.stopDrag(event);
                return;
            }

            if (event.which !== 1) { // проверок кнопок
                this.stopDrag(event);
                return;
            }

            var delta = event.pageX - this.dragX;
            this.dragX = event.pageX;

            var clientWidth = this.place.getElement().clientWidth;
            var value;

            if (this.get('slider-left')) {
                var left = parseInt(this.get('slider-left'), 10);
                value = left + delta;

                value = Math.max(value, this.get('slider-left-limit'));
                value = Math.min(value, clientWidth - this.get('slider-right-limit'));

                this.set('slider-left', value);
            } else if (this.get('slider-right')) {
                var right = parseInt(this.get('slider-right'), 10);
                value = right - delta;

                value = Math.max(value, this.get('slider-right-limit'));
                value = Math.min(value, clientWidth - this.get('slider-left-limit'));

                this.set('slider-right', value);
            }
        },

        stopDrag: function (event) {
            if (!this.dragState) {
                return;
            }

            this.place.detach('mousemove');

            this.dragState = false;
            this.dragX = undefined;

            this.place.pins.blocker.removeClass('blockerActive');

            document.onmousemove = this.originalMouseMove;

            event.stopPropagation();
        },

        onStartDrag: function (event) {
            var self = this;
            event.preventDefault();

            self.dragState = true;
            self.dragX = event.pageX;

            this.place.pins.blocker.addClass('blockerActive');

            self.place.attach('mousemove', function (e) {
                self.onMouseMove(e);
            });

            //Mozilla позволяет мыши при нажатой кнопке выходить за пределы окна и продолжает её отслеживать
            document.onmousemove = function (event) {
                self.stopDrag(event);
            };

            event.stopPropagation();
        }
    });
});
