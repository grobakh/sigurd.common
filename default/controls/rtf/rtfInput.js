define('controls/rtf/rtfInput',
    { Component: 'core/view/component',
        urlHighLighter: 'controls/rtf/urlHighLighter'
    }, function (imported) {

        return imported.Component.extend({
            setup: {
                template: "controls/rtf/rtfInput",
                placeholder: undefined,
                text: undefined,
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
                'field-name': undefined,
                'count-left': 1500,
                'max-count': 1500
            },

            initialize: function () {
                var self = this;

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
                self.watch('name', self.update);
                self.urlHighLighter = imported.urlHighLighter;
            },

            attachElements: function () {
                var self = this;
                var input = self.place.pins.inputField;
                if (self.get('command-event') === 'enter') {
                    input.attach('keydown', function (event) {

                        if (event.keyCode === 13) {
                            var command = self.get('command');

                            if (command && command.exec) {
                                command.exec(self.get('command-data'));
                                event.stopPropagation();
                            }
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
                var input = self.place.pins.inputField;
                if (self.isDiv) {
                    input.attach("keyup", self.updateCounter, self);
                }
                input.attach("blur", self.blurHandler, self);
            },

            update: function () {
                var self = this;
                var input = self.place.pins.inputField;
                self.isDiv = input.nodeName === 'div';

                input.setAttribute('placeholder', self.get('placeholder'));

                if (self.isDiv) {
                    input.setText(self.get('text'), true);
                } else {
                    input.setText(self.urlHighLighter.removeAllTags(self.get('text')));
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

                if (self.get('field-name')) {
                    input.setAttribute('name', self.get('field-name'));
                    input.setAttribute('x-autocompletetype', self.get('field-name'));
                } else {
                    input.removeAttribute('name');
                    input.removeAttribute('x-autocompletetype');
                }

                self.updateCounter();
            },

            blurHandler: function () {
                var self = this;
                self.commit();
            },

            commit: function () {
                var self = this;
                var text;
                var inputField = self.place.pins.inputField;
                text = self.isDiv ? inputField.getInnerHTML() : inputField.getValue();
                text = self.urlHighLighter.removeAllTags(_.decodeHTML(text)).trim() ?
                    self.urlHighLighter.highLightUrls(text) : '';
                if (self.isDiv) {
                    inputField.setText(text, true);
                }
                self.set('text', _.decodeHTML(text), false, true);
                self.set('isUrl', self.isUrl());
                self.updateCounter();
            },

            updateCounter: function () {
                var self = this;
                var symbolsLeft = self.getSymbolsLeft();
                self.set('count-left', symbolsLeft);
                self.set('isValidCount', symbolsLeft >= 0);
            },

            getCount: function () {
                var self = this;
                var plainText = self.place.pins.inputField.getInnerHTML();
                plainText = self.urlHighLighter.replaceNewLine(plainText);
                plainText = self.urlHighLighter.removeAllTags(plainText);
                plainText = _.decodeHTML(plainText);
                var count = plainText.length;
                if (plainText[0] === '\n' || plainText[plainText.length - 1] === '\n') {
                    count--;
                }
                return count;
            },

            getSymbolsLeft: function () {
                var count = this.getCount();
                return this.get('max-count') - count;
            },

            hasUrl: function () {
                return this.place.pins.inputField.getInnerHTML().match(this.urlHighLighter.getUrlRegExp()) !== null;
            },

            isUrl: function () {
                var self = this;
                var input = self.place.pins.inputField;
                var content = _.decodeHTML(self.urlHighLighter.removeAllTags(input.getInnerHTML()))
                    .trim();
                var urls = content.match(self.urlHighLighter.getUrlRegExp());
                return !!(urls && content === urls[0]);
            },

            focus: function () {
                var self = this;
                self.place.pins.inputField.setFocus();
            },

            canFocus: function () {
                var self = this;
                return !self.get('readonly') && self.get('enabled');
            }
        });
    });
