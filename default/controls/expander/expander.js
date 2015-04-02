define('controls/expander/expander', ['core/view/component'], function (Component) {

    return Component.extend({
        setup: {
            template: "controls/expander/expander",
            event: undefined,
            expanded: false,
            'has-controller': true
        },

        initialize: function () {
            this.watch('event', this.update);
            this.watch('has-controller', this.update);
            this.loop('expanded', this.debounce(this.update));
        },

        attachElements: function () {
            var self = this;
            self.place.pins.controller.attach('click', self.toggle, self);
        },

        update: function () {
            var self = this;

            var controller = self.place.pins.controller;
            var children = self.place.pins.content;

            if (self.get('has-controller')) {
                controller.showBlock();
            } else {
                controller.hide();
            }

            if (self.get('expanded')) {
                controller.removeClass('controller-closed').addClass('controller-open');
                children.removeClass('expander-closed').addClass('expander-open');
            } else {
                controller.removeClass('controller-open').addClass('controller-closed');
                children.removeClass('expander-open').addClass('expander-closed');
            }
        },

        toggle: function () {
            this.set('expanded', !this.get('expanded'));
        }
    });
});
