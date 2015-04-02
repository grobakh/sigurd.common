define('controls/checkbox/checkbox', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/checkbox/checkbox",
                value: undefined,
                enabled: true,
                command: undefined,
                'command-data': undefined,
                autocommit: undefined,
                validator: undefined,
                'commit-event': undefined,
                'reset-event': undefined,
                'focus-event': undefined,
                error: undefined,
                'true': undefined,
                'false': undefined
            },

            initialize: function () {
                var self = this;
                self.debouncedCommit = self.debounce(self.commit);

                self.watch('value', self.update);
                self.watch('enabled', self.update);
                self.watch('commit-event', self.debouncedCommit);
                self.watch('reset-event', self.reset);
                self.watch('focus-event', self.focus);
            },

            attachElements: function () {
                var self = this;

                self.place.pins.input.attach('click', self.onChange, self);

                self.place.attach('keyup', function (event) {
                    if (event.keyCode === 32) {
                        self.onChange(event);
                    }
                });
            },

            update: function () {
                var input = this.place.pins.input;
                var cover = this.place.pins.cover;
                var inputElement = input.getElement();

                if (this.get('value')) {
                    input.setAttribute('checked', 'checked');
                }
                else {
                    input.removeAttribute('checked');
                }
                if (inputElement) {
                    inputElement.checked = this.get('value') ? true : false;
                }

                if (this.get('enabled')) {
                    input.removeAttribute('disabled');
                }
                else {
                    input.setAttribute('disabled', 'disabled');
                }

                if (this.get('tooltip')) {
                    cover.setAttribute('title', this.get('tooltip'));
                }
            },

            onChange: function (event) {
                var self = this;

                if (!this.get('enabled')) {
                    return;
                }

                self.focus();

                if (self.get('autocommit') === 'select') {
                    self.commit();
                } else if (self.get('autocommit') === 'debounced') {
                    self.debouncedCommit();
                }
            },

            commit: function () {
                var self = this;
                var inputElement = this.place.pins.input.getElement();

                if (!this.place.pins) {
                    return;
                }

                var trueValue = self.get('true') !== undefined ? self.get('true') : true;
                var falseValue = self.get('false') !== undefined ? self.get('false') : false;
                self.set('value', inputElement.checked  ? trueValue : falseValue, false, true);

                var command = self.get('command');
                if (command && command.exec) {
                    command.exec(self.get('command-data'));
                }
            },

            reset: function () {
                this.update();
                this.set('error');
            },

            focus: function () {
                this.place.pins.input.setFocus();
            },

            canFocus: function () {
                return this.get('enabled');
            }
        });
    });
