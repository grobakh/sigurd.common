define('controls/items/items', ['core/view/component', 'core/view/template'], function (Component, Template) {

    return Component.extend({
        setup: {
            template: null,
            builder: undefined,
            'before-builder': undefined,
            'after-builder': undefined,
            'empty-builder': undefined,
            'before-fragment': undefined,
            'after-fragment': undefined,
            'empty-fragment': undefined,
            'item-fragment': undefined,
            filter: undefined,
            source: undefined,
            'even-class': undefined,
            'isEmpty': false  //use only for backWay
        },

        initialize: function () {

            if (this.place.nodeName === 'tbody' || this.place.nodeName === 'option') {
                _.log('Items "' + this.place.nodeName + '" place warning.');
            }

            var source = this.get('source');

            if (source && source.addHandler) {
                source.addHandler('add', this.renderAsync);
                source.addHandler('remove', this.renderAsync);
                source.addHandler('swap', this.renderAsync);
                source.addHandler('reset', this.renderAsync);
            }

            this.watch("source", this.onSourceChange);
            this.watch("filter", this.renderAsync);

            if (!this.get('item-fragment')) {
                this.put('item-fragment', this.get('content-fragment'));
                this.put('content-fragment');
            }
        },

        onSourceChange: function () {
            var oldSource = this.previous('source');
            var source = this.get('source');

            if (oldSource && oldSource.removeHandler) {
                oldSource.removeHandler('add', this.renderAsync);
                oldSource.removeHandler('remove', this.renderAsync);
                oldSource.removeHandler('swap', this.renderAsync);
                oldSource.removeHandler('reset', this.renderAsync);
            }

            this.renderAsync();

            if (source && source.addHandler) {
                source.addHandler('add', this.renderAsync);
                source.addHandler('remove', this.renderAsync);
                source.addHandler('swap', this.renderAsync);
                source.addHandler('reset', this.renderAsync);
            }
        },

        buildItem: function (item) {
            var self = this;

            var itemFragment = self.get('item-fragment').clone();

            var builder = self.get('builder');

            if (builder) {
                builder(itemFragment, item);
            }

            itemFragment.iterate(function (child) {
                child.itemValue = item;
            });

            return itemFragment;
        },

        buildOptionalItem: function (fragmentName) {
            var self = this;
            var fragment = self.get(fragmentName + '-fragment').clone();
            var builder = self.get(fragmentName + '-builder');
            if (builder) {
                builder(fragment);
            }
            return fragment;
        },

        buildItems: function () {
            var self = this;

            var source = self.get('source');

            if (source) {
                var data = source.items ? source.items : source;

                if (data.length) {
                    var items = new Template("");

                    var filteredData = _(data).filter(function (item) {
                        if (self.get('filter') && !self.get('filter')(item)) {
                            return false;
                        }
                        return true;
                    });

                    var isEmpty = filteredData.length === 0;

                    if (isEmpty) {

                        if (self.get('empty-fragment')) {
                            return self.buildOptionalItem('empty');
                        }

                    } else {

                        if (self.get('before-fragment')) {
                            items.appendFragment(self.buildOptionalItem('before'));
                        }

                        _(filteredData).each(function (item) {
                            items.appendFragment(self.buildItem(item));
                        });

                        if (self.get('after-fragment')) {
                            items.appendFragment(self.buildOptionalItem('after'));
                        }

                    }
                    self.set('isEmpty', isEmpty);

                    return items;
                }
            }

            if (self.get('empty-fragment')) {
                return self.buildOptionalItem('empty');
            }

            return null;
        },

        pasteContent: function () {
            var self = this;
            var contentFragment = this.buildItems();
            var presenter = self.place.pins.content || self.place;
            presenter.setFragment(contentFragment);
        },

        destroy: function () {
            var source = this.get('source');

            if (source && source.removeHandler) {
                source.removeHandler('add', this.renderAsync);
                source.removeHandler('remove', this.renderAsync);
                source.removeHandler('swap', this.renderAsync);
                source.removeHandler('reset', this.renderAsync);
            }

            Component.prototype.destroy.call(this);
        }

    });
});
