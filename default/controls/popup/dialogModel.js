define('controls/popup/dialogModel', ['core/model'],
    function (Model) {
        return Model.extend({
            initialize: function (commands) {
                return this.constructor.fromModel(this, commands);
            }
        }, {
            fromModel: function (model, commands) {
                model.put('isVisible', false);

                model.showDialog = function () {
                    model.set('isVisible', true);
                };

                model.def('doShowDialog', model.showDialog);

                model.hideDialog = function () {
                    model.set('isVisible', false);
                };

                model.def('doHideDialog', model.hideDialog);

                if (commands) {
                    for (var key in commands) {
                        if (commands.hasOwnProperty(key) && _.isFunction(commands[key])) {
                            model.def(key, commands[key]);
                        }
                    }
                }

                return model;
            }
        });
    });