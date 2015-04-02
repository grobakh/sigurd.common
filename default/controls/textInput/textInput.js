define('controls/textInput/textInput', ['core/view/component'], function (Component) {

    return Component.extend({
        setup: {
            template: "controls/textInput/textInput",
            placeholder: undefined,
            text: undefined,
            autocommit: "debounced",
            inputDebounceTime: 500,
            'commit-event': undefined,
            'focus-event': undefined,
            'command-event': undefined,
            'command': undefined,
            'command-data': undefined,
            'command-text': undefined,
            'command-enabled': true,
            'select-on-focus': undefined,
            readonly: false,
            enabled: true,
            error: undefined,
            wrap: undefined,
            type: "text",
            autocomplete: false,
            'field-name': undefined,
            'count-left': 1500,
            'max-count': 1500
        },

        initialize: function () {
            var self = this;
            var text = self.get('text');
            self.def('doInputCommand', function () {
                var command = self.get('command');

                if (command && command.exec) {
                    command.exec(self.get('command-data'));
                }
            });

            self.watch("placeholder", self.update);
            self.watch("text", self.update);
            self.watch('readonly', self.update);
            self.watch('enabled', self.update);
            self.watch('commit-event', self.commit);
            self.watch('focus-event', self.focus);
            self.watch('type', self.update);
            self.watch('name', self.update);
            self.watch('max-count', self.setCountLeft);

            self.setCountLeft();
        },

        attachElements: function () {
            var self = this;
            var input = self.place.pins.inputField;

            if (self.get('command-event')) {
                input.attach('keydown', function (event) {

                    var runCommand = function () {
                        self.commit();

                        var command = self.get('command');

                        if (command && command.exec) {
                            command.exec(self.get('command-data'));
                            event.stopPropagation();
                        }
                    };

                    if (event.keyCode === 13 && self.get('command-event') === 'enter') {
                        runCommand();
                    }

                    if (event.keyCode === 32 && event.ctrlKey && self.get('command-event') === 'ctrl+space') {
                        runCommand();
                    }
                });
            }

            if (self.get('select-on-focus')) {
                input.attach('focus', function () {
                    _.defer(function () {
                        input.setSelection();
                    });
                });
            }

            self.setCommitMode();

            if (self.get('focus-event') === 'whenInDOM') {
                self.focus();
            }

        },

        setCommitMode: function () {
            var self = this;
            var autoMode = self.get("autocommit") || "debounced";
            var input = self.place.pins.inputField;

            if (autoMode === "input") {
                input.attach("input", self.commit, self);
            } else if (autoMode === "debounced") {
                input.attach("input", _.debounce(function () {
                    self.commit();
                }, self.get('inputDebounceTime')), self);
                input.attach("change", self.commit, self);
            } else if (autoMode === "lostFocus") {
                input.attach("change", self.commit, self);
            }
        },

        update: function () {
            var self = this;
            var input = self.place.pins.inputField;
            var text = self.get('text');
            input.setAttribute('placeholder', self.get('placeholder'));

            input.setText(text, true);

            self.setCountLeft();

            if (self.get('autocomplete')) {
                input.setAttribute('autocomplete', 'on');
            }
            else {
                input.removeAttribute('autocomplete');
            }

            if (self.get('readonly')) {
                input.setAttribute('readonly', 'readonly');
            } else {
                input.removeAttribute('readonly');
            }

            if (self.get('enabled')) {
                input.removeAttribute('disabled');
            }
            else {
                input.setAttribute('disabled', 'disabled');
            }

            if (self.get('wrap')) {
                input.setAttribute('wrap', self.get('wrap'));
            }

            input.setAttribute('type', self.get('type'));

            if (self.get('field-name')) {
                input.setAttribute('name', self.get('field-name'));
                input.setAttribute('x-autocompletetype', self.get('field-name'));
            } else {
                input.removeAttribute('name');
                input.removeAttribute('x-autocompletetype');
            }

            if (self.get('focus-event')) //not sure if its good, but sometimes we need to put focusEvent in our model before control was rendered
            {                           //in this case we have to call focus when our element was drawn and updated
                self.focus();
            }
        },

        commit: function () {
            var self = this;
            var value = self.place.pins.inputField.getValue();
            var text = self.get('text');
            self.set("text", value, false, true);
            self.setCountLeft();
        },

        setCountLeft: function () {
            var self = this;
            var text = self.get('text');
            self.set('count-left', self.get('max-count') - (text ? text.length : 0));
        },

        focus: function () {
            var self = this;
            self.set('focus-event', undefined, false, true); //drop focus event after executing to prevent double execution (on update)
            _.debounce(function () {    //todo In first render cycle our root container has display=none style,
                self.place.pins.inputField.setFocus(); //it will be shown right after attachElements phase, when
            })();                                      //root asyncResult in component InternalRender will be released.
        },                                     //probably, somehow we should refactor this code.

        canFocus: function () {
            var self = this;
            return !self.get('readonly') && self.get('enabled');
        }
    });
});
