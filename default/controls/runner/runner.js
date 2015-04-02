define('controls/runner/runner', ['core/view/component'], function (Component) {

        return Component.extend({
            setup: {
                template: "controls/runner/runner",
                value: 0,
                maximum: 100,
                text: ""
            },

            initialize: function () {
                this.invalidateProperties = true;
                this.watch('text', this.update);
                this.watch('value', this.setRunner);
                this.watch('maximum', this.setRunner);
            },

            update: function () {
                var self = this;
                self.place.pins.text.setText(self.get('text'));
            },

            measure: function () {
                Component.prototype.measure.call(this);
                this.remeasure();
            },

            remeasure: function () {
                if (!this.invalidateProperties) {
                    return;
                }

                this.invalidateProperties = false;

                var part = parseFloat(this.get('value')) / parseFloat(this.get('maximum'));
                var barWidth = this.place.pins.bar.getStyleNumber('width');

                var width = Math.round(barWidth * part);
                this.place.pins.runner.setStyleNumber('width', width);
                var value = Math.round(100 * part) + "%";
                this.place.pins.text.setText(value);
            },

            setRunner: function () {
                this.invalidateProperties = true;
                this.remeasure();
            }
        });
    });
