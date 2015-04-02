define('controls/button/button', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/button/button",
                text: '',
                'command': undefined,
                'command-data': undefined,
                'ctrl-command': undefined,
                'ctrl-data': undefined,
                'double-command': undefined,
                'double-data': undefined,
                'down-command': undefined,
                'focus-event': undefined,
                'no-text': false,
                enabled: true
            },

            initialize: function () {
                var self = this;

                self.watch('no-text', self.update);
                self.watch('text', self.update);
                self.watch('change', self.update);
                self.watch('focus-event', self.focus);
                self.watch('enabled', self.update);
            },

            attachElements: function () {
                var self = this;

                self.place.attach('click', self.submit, self);
                self.place.attach('dblclick', self.doubleSubmit, self);
                self.place.attach('mousedown', self.mouseDown, self);

                self.place.attach('keyup', function (event) {
                    if (event.keyCode === 32) {
                        self.submit(event);
                    }
                });
            },

            update: function () {
                if (this.get('no-text')) {
                    return;
                }

                var buttonText = this.place.pins.buttonText || this.place.createFragment();
                var title = this.place.pins.title || this.place.createFragment();

                buttonText.setText(this.get('text'));
                title.setAttribute('title', this.get('text'));

                if (this.get('enabled')) {
                    buttonText.removeAttribute('disabled');
                    title.removeClass('disabled');
                }
                else {
                    buttonText.setAttribute('disabled', 'disabled');
                    title.addClass('disabled');
                }
            },

            submit: function (event) {
                if (!this.get('enabled')) {
                    return;
                }

                var command;
                var data;

                if (event.altKey || event.ctrlKey) {
                    command = this.get('ctrl-command');
                    data = this.get('ctrl-data');
                } else {
                    command = this.get('command');
                    data = this.get('command-data');
                }

                if (command && command.exec) {
                    command.exec(data);
                    event.preventDefault();
                    event.stopPropagation();
                }
            },

            doubleSubmit: function (event) {
                if (!this.get('enabled')) {
                    return;
                }

                var command = this.get('double-command');

                if (command && command.exec) {
                    command.exec(this.get('double-data'));
                    event.preventDefault();
                    event.stopPropagation();
                }
            },

            mouseDown: function (event) {
                if (!this.get('enabled')) {
                    return;
                }
                var command = this.get('down-command');

                if (command && command.exec) {
                    command.exec();
                    //event.preventDefault();
                    event.stopPropagation();
                }
            },

            canFocus: function () {
                return false;
            },

            focus: function () {
                if (this.place.pins.buttonText) {
                    this.place.pins.buttonText.setFocus();
                }
            }
        });
    });
