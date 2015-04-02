define('controls/combo/combo', ['core/view/component', 'core/view/template'],
    function (Component, Template) {
        var notSelected = -1;
        return Component.extend({
            setup: {
                template: "controls/combo/combo",
                source: undefined,
                'selected-value': undefined,
                lexeme: undefined,
                'display-path': undefined,
                'value-path': undefined,
                'focus-event': undefined,
                'enabled': true,
                'autocommit': 'change',
                'empty-text': undefined,
                'default-value': "",
                'items-filter': undefined
            },

            initialize: function () {
                var self = this;

                self.watch('lexeme', self.renderAsync);
                self.watch('selected-value', self.update);
                self.watch('enabled', self.update);
                self.watch('empty-text', self.update);
                self.watch('source', self.sourceUpdate);
                self.watch('focus-event', self.focus);
                self.put('builder', function (presenter, item) {
                    self.setItemPresenter(presenter, item);
                });
                self.put('emptyBuilder', function (presenter) {
                    self.setEmptyItemPresenter(presenter);
                });
            },

            attachElements: function () {
                var self = this;
                this.place.detach('change');

                if (this.get('autocommit') === 'change') {
                    this.place.attach('change', this.commit, this);
                }
                else if (this.get('autocommit') === 'debounced') {
                    this.place.attach('change', _.debounce(function () {
                        self.commit();
                    }, this));
                }

                this.sourceUpdate();
            },

            setItemPresenter: function (itemFragment, item) {
                var display = item;

                if (this.get('lexeme')) {
                    display = this.get('lexeme')[item] ? this.get('lexeme')[item].trim() : "";
                }
                else if (this.get('display-path')) {
                    display = item.getChain(this.get('display-path'));
                }
                var option = itemFragment.getFirstChild();
                option.setText(display);
                option.setValue(this.get('source').indexOf(item));
            },

            setEmptyItemPresenter: function (itemFragment) {
                var self = this;
                var emptyOpt = itemFragment.getFirstChild();
                var emptyText = self.get('empty-text');
                if (emptyText) {
                    emptyOpt.setText(emptyText);
                    emptyOpt.setValue(notSelected);
                }
                else {
                    itemFragment.childList = null;
                }
            },

            update: function () {
                var self = this;
                var select = self.place.pins.select;
                var value = self.get('selected-value');
                if (self.get('source')) {
                    var itemInSource = self.get('source').first(function (item) {
                        if (self.get('value-path')) {
                            item = item.getChain(self.get('value-path'));
                        }
                        return item === value;
                    });

                    select.setValue(self.get('source').indexOf(itemInSource));
                }
                else {
                    select.setValue(notSelected);
                }

                if (self.get('enabled')) {
                    select.removeAttribute('disabled');
                }
                else {
                    select.setAttribute('disabled', 'disabled');
                }
            },

            sourceUpdate: function () {
                var self = this;
                self.update();
                self.commit();
            },

            commit: function () {
                var optionValue = this.place.pins.select.getValue();
                if (!this.get('source')) {
                    this.set('selected-value');
                    return;
                }
                var value = this.get('source').at(optionValue);
                if (value && this.get('value-path')) {
                    value = value.getChain(this.get('value-path'));
                }
                this.set('selected-value', value, false, true);
            },

            reset: function () {
                this.place.pins.select.setValue(this.get('selected-value'));
            },

            focus: function () {
                this.place.pins.select.setFocus();
            },

            canFocus: function () {
                return this.get('enabled');
            }
        });
    });
