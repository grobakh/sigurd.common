define('controls/tabs/tabs', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: null,
                value: undefined
            },

            initialize: function () {
                this.watch('value', this.update);
            },

            attachElements: function () {
                if (this.get('attach-click')) {
                    this.place.attach("click", this.change, this);
                }
            },

            change: function (event) {
                var eventTarget = event.target;
                var value = this.get('value');

                var target = this.place.find(function (child) {
                    return child.getElement() === eventTarget;
                });

                this.place.trace(target, function (candidate) {
                    if (candidate.props.hasOwnProperty('tabs-value')) {
                        value = candidate.props['tabs-value'];
                    }
                });

                this.set('value', value);
            },

            update: function () {
                var self = this;

                self.place.eachChild(function (child) {
                    child.removeClass('active');

                    if (child.props['tabs-value'] === _.toString(self.get('value'))) {
                        child.addClass('active');
                    }
                });
            }
        });
    });
