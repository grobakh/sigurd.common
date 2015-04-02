define('controls/multiCheckbox/multiCheckbox', {
    Component: 'core/view/component',
    Model: 'core/model',
    Collection: 'core/collection'
}, function (imported) {

    return imported.Component.extend({
        setup: {
            template: "controls/multiCheckbox/multiCheckbox",
            source: undefined,
            'selected-items': undefined,
            enabled: true,
            lexeme: undefined,
            'focus-event': undefined
        },

        initialize: function () {
            var self = this;

            self.def('doChange', function () {
                self.commit();
            });

            self.onSelectedItemsChanged = _.bind(self.updateSelectedItems, self);
        },

        attachElements: function () {
            var self = this;

            self.watch('source', self.sourceInit);
            self.watch('lexeme', self.sourceInit);
            self.watch('enabled', self.setEnabled);
            self.watch('selected-items', self.initSelectedItems);
            self.watch('focus-event', self.focusValue);

            self.sourceInit();
            self.initSelectedItems();
        },

        detachElements: function () {
            var self = this;
            if (self.get('selected-items')) {
                self.get('selected-items').removeHandler('change', self.onSelectedItemsChanged);
            }
        },

        sourceInit: function () {
            var self = this;
            var valuePath = self.get('value-path');
            var displayPath = self.get('display-path');

            if (!self.get('source')) {
                return;
            }

            self.get('source').each(function (sourceItem) {
                if (self.get('lexeme') && !_.isUndefined(self.get('lexeme')[sourceItem])) {
                    var lexeme = self.get('lexeme')[sourceItem];
                    sourceItem.set('displayValue', lexeme);
                } else {
                    if (valuePath && displayPath) {
                        sourceItem.set('displayValue', sourceItem.get(displayPath));
                    } else {
                        sourceItem.set('displayValue', sourceItem);
                    }
                }
                sourceItem.set('isEnabled', self.get('enabled'));
            });

            self.updateSelectedItems();
            self.commit();
        },

        initSelectedItems: function () {
            var self = this;
            var selectedItems = self.get('selected-items');

            if (self.previous('selected-items')) {
                self.previous('selected-items').removeHandler('change', self.onSelectedItemsChanged);
            }

            if (selectedItems) {
                selectedItems.removeHandler('change', self.onSelectedItemsChanged);
                selectedItems.addHandler('change', self.onSelectedItemsChanged);
                self.updateSelectedItems();
            }
        },

        updateSelectedItems: function () {
            var self = this;
            var selectedItems = self.get('selected-items');
            var source = self.get('source');
            var valuePath = self.get('value-path');
            var displayPath = self.get('display-path');

            if (source && selectedItems) {
                source.each(function (item) {
                    if (valuePath && displayPath) {
                        item.set('isChecked', selectedItems.contains(item.get(valuePath)));
                    } else {
                        item.set('isChecked', selectedItems.contains(item));
                    }
                });
            }
        },

        setEnabled: function () {
            var self = this;
            var sourceItems = self.get('source');

            if (sourceItems) {
                sourceItems.each(function (item) {
                    item.set('isEnabled', self.get('enabled'));
                });
            }
        },

        commit: function () {
            var self = this;
            var selectedItems = self.get('selected-items');
            if (!selectedItems) {
                return;
            }
            var source = self.get('source');
            var valuePath = self.get('value-path');

            var data = [];

            if (source) {
                source.each(function (sourceItem) {
                    if (sourceItem.get('isChecked')) {
                        data.push(valuePath ? sourceItem.get(valuePath) : sourceItem);
                    }
                });
            }

            selectedItems.reset(data);
        },

        focusValue: function (model, newValue) {
            var self = this;
            var valuePath = self.get('value-path');
            var source = self.get('source');

            if (newValue && newValue.value && source) {
                var item = source.find(function (sourceItem) {
                    return (valuePath ? sourceItem.get(valuePath) : sourceItem) === newValue.value;
                });

                if (item) {
                    item.set('focusEvent', NaN);
                }
            }
        }
    });
});
