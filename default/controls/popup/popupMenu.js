define('controls/popup/popupMenu', ['core/view/component'], function (Component) {

    return Component.extend({
        setup : {
            template : "popup/simple",
            visible : false,
            command : undefined,
            text : undefined
        },

        initialize : function () {
            var self = this;
            self.def('doCancel', function () {
                var command = self.get('command');

                if (command && command.exec) {
                    command.exec('cancel');
                }
            });

            self.def('doCommit', function () {
                self.invokeOnChild('commit');

                var command = self.get('command');

                if (command && command.exec) {
                    command.exec('commit');
                }
            });

        },

        attachElements: function() {
            var self = this;

            self.place.pins.blocker.attach('mousedown', function (event) {
                event.stopPropagation();
                event.preventDefault();
            });

            self.place.pins.blocker.attach('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                var command = self.get('command');
                if (command && command.exec) {
                    command.exec('blocker');
                }
            });

        },

        updateVisibility : function () {
            var self = this;
            if (!self.hideClass) {
                self.hideClass = this.get('hide-class') || 'system_none';
            }

            if (self.get('visible')) {
                self.place.removeClass(self.hideClass);
                self.setFocusToInput();
            } else {
                self.place.addClass(self.hideClass);
            }
        },

        setFocusToInput : function () {
          /*      if (component && component.focus) {
                    if (!component.canFocus) {
                        return component;
                    } else if (component.canFocus()) {
                        return component;
                    }
                } */
        }
    });
});
