define('controls/form/errors', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: null,
                error: undefined,
                css: 'controls_form_errors'
            },

            initialize: function () {
                this.watch('content-fragment', this.renderAsync);
                this.watch('error', this.update);
            },

            update: function () {
                var self = this;
                var errorPresenter = self.place;
                var errorString = _.toString(self.get('error'));

                errorPresenter.eachChild(function(errorItem) {
                    var errorItemId = errorItem.props.id;

                    if (errorItemId === errorString) {
                        errorItem.showInlineBlock();
                    } else {
                        errorItem.hide();
                    }
                });
            }
        });
    });
