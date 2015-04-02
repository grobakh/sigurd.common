define('controls/label/label', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/label/label",
                text: ""
            },

            initialize: function () {
                this.watch('text', this.update);
            },

            update: function () {
                this.place.pins.text.setText(this.get('text'));
            }
        });
    });
