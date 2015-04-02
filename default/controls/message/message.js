define('controls/message/message', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: 'controls/message/message',
                condition: undefined,
                text: '',
                isPermanent: false
            },

            initialize: function () {
                this.watch('condition', this.update);
            },

            update: function () {
                var self = this;
                if (self.get('condition')) {
                    self.place.pins.content.setText(self.get('text'));
                    self.place.pins.content.addClass('on');
                    self.place.pins.content.removeClass('off');
                    if (!self.get('isPermanent')) {
                        _.delay(function () {
                            self.set('condition');
                        }, 2000);
                    }
                }
                else {
                    self.place.pins.content.addClass('off');
                    self.place.pins.content.removeClass('on');
                }
            }
        });
    });