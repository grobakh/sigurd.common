define('controls/comboBox/comboBox', {
    Component: 'core/view/component',
    Model: 'core/model',
    Collection: 'core/collection'
}, function (imported) {

    return imported.Component.extend({
        setup: {
            template: "controls/comboBox/comboBox",
            inputValue: '',
            value: undefined,
            source: undefined,
            lexeme: undefined,
            enabled: true,
            'must-select': true,
            'list-direction': 'down',
            'list-height': undefined,
            'default-value' : ""
        },

        initialize: function () {
            var self = this;

            self.processedSource = null;

            self.def('doStartToggleList', function () {
                self.preventBlur = true;
            });
            self.def('doToggleList', function () {
                self.preventBlur = false;
                self.toggleList();
            });

            self.def('doStartSelect', function () {
                self.preventBlur = true;
            });
            self.def('doSelect', function (item) {
                self.preventBlur = false;
                self.selectItem(item);
            });
            self.itemToSelect = undefined;
        },

        sourceInit: function () {
            var self = this;

            var processedSource = new imported.Collection();
            self.set('processedSource', processedSource);

            if (!self.get('source')) {
                return;
            }

            self.get('source').each(function (sourceItem) {
                var itemModel = new imported.Model();

                if (self.get('lexeme') && !_.isUndefined(self.get('lexeme')[sourceItem])) {
                    itemModel.put('key', sourceItem);
                    itemModel.put('value', self.get('lexeme')[sourceItem]);
                }
                else {
                    if (self.get('display-path') && self.get('value-path')) {
                        itemModel.put('key', sourceItem.get(self.get('value-path')));
                        itemModel.put('value', sourceItem.get(self.get('display-path')));
                    }
                    else {
                        itemModel.put('key', sourceItem);
                        itemModel.put('value', sourceItem);
                    }
                }

                itemModel.put('isVisible', true);
                processedSource.add(itemModel);
            });
        },

        attachElements: function () {
            var self = this;

            var itemList = self.place.pins.itemList;

            self.watch('source', self.sourceInit);
            self.watch('lexeme', self.sourceInit);
            self.watch('list-height', self.update);
            self.watch('enabled', self.update);
            self.watch('value', self.updateSelectedValue);

            self.sourceInit();
            self.updateSelectedValue();

            self.bindMouseHover();
            self.bindInputControls();

            itemList.attach('mousedown', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        },

        bindMouseHover: function () {
            var self = this;
            var itemList = self.place.pins.itemList;
            var itemButton;

            var getPlaceByDomNode = function (node) {
                var childs = itemList.childList;
                for (var i = 0; i < childs.length; i++) {
                    var btn = childs[i];
                    if (btn.getElement() === node) {
                        return btn;
                    }
                }
            };

            itemList.attach('mouseover', function (event) {
                if (self.blockMouseOver) {
                    self.blockMouseOver = false;
                    return;
                }
                var place = getPlaceByDomNode(event.target);
                if (place) {
                    self.nextItemMouse(place);
                }

            });
        },

        bindInputControls: function () {
            var self = this;
            var input = self.place.pins.inputValue.pins.inputField;

            self.place.pins.controlButton.attach('mousedown', function (e) {
                e.preventDefault();
                self.toggleList();
            }, self);

            input.attach('mousedown', function() {
                if (!self.isListVisible()) {
                    self.showList();
                }
            }, self);


            input.attach('focus', function () {
                self.focusHandler();
            }, self);

            input.attach('blur', function (e) {
                if (!self.preventBlur) {
                    self.hideList();
                }
                self.preventBlur = false;
            }, self);

            input.attach('keydown', function (e) {
                var key = e.keyCode;
                if (key === 27) {
                    self.hideList();
                }
                else if (key === 38 || key === 40) {
                    self.set('isListVisible', true);
                    self.nextItemKeyboard(key === 40);
                }
                else if (key === 13) {
                    self.selectItem(self.itemToSelect);
                }
                else {
                    return true;
                }
                e.preventDefault();
                e.stopPropagation();
            });

            input.attach('keyup', function (e) {
                var key = e.keyCode;
                if (key === 27 || key === 38 || key === 40 || key === 13 || key === 9) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                else {
                    self.inputUpdate();
                }
            });
        },

        updateSelectedValue: function () {
            var self = this;
            var item = self.findItem(self.get('value'));
            self.selectItem(item);
        },

        findItem: function (key) {
            var self = this;
            return self.get('processedSource').find(function (item) {
                return item.get('key') === key;
            });
        },

        setDirectionAndHeight: function () {
            var itemList = this.place.pins.itemList;
            var height = this.get('list-height') ? this.get('list-height') + 'px' : '';
            var direction = this.get('list-direction');
            direction = direction && (direction === 'up' || direction === 'down') ? direction : 'down';

            itemList.setStyle('max-height', height);
            //todo dhilt : что делать с direction ?
        },

        setDisabled: function () {
            var self = this;
            var input = self.place.pins.inputValue.pins.inputField;

            if (self.get('enabled')) {
                input.removeAttribute('disabled');
            }
            else {
                input.setAttribute('disabled', 'disabled');
            }
        },

        focusHandler: function () {
            var self = this;
            if (self.get('selectedItem')) {
                self.updateListVisibility(true);
            } else {
                self.updateListVisibility();
            }
            //self.showList();
        },

        showList: function () {
            this.set('isListVisible', true);
            this.updateListSelection();
            this.autoScrollList();
        },

        hideList: function () {
            var self = this;
            self.itemToSelect = self.get('selectedItem');
            if (self.itemToSelect) {
                self.updateListSelection();
                self.resetScroll();
            }
            this.set('isListVisible', false);
        },

        isListVisible: function () {
            return this.get('isListVisible');
        },

        toggleList: function () {
            var self = this;
            if (self.isListVisible()) {
                self.hideList();
            }
            else {
                var input = self.place.pins.inputValue.pins.inputField.setFocus();
                self.showList();
            }
        },

        updateListVisibility: function (showAll) {
            var self = this;
            self.get('processedSource').each(function (item) {
                item.set('isVisible', showAll ? true : item.get('value').lowerStartsWith(self.get('inputValue')));
            });
        },

        updateListSelection: function () {
            var self = this;
            self.get('processedSource').each(function (item) {
                item.set('isSelected', item === self.get('selectedItem') ? 'selected' : '');
            });
        },

        nextItemMouse: function (itemButton) {
            var self = this;

            if (self.itemToSelect) {
                self.itemToSelect.set('isSelected');
            }
            self.itemToSelect = itemButton.component.get('context');
            self.itemToSelect.set('isSelected', 'selected');
        },

        nextItemKeyboard: function (isDown) {
            var self = this;
            var source = self.get('processedSource');
            var predicate = function (item) {
                return item.get('isVisible');
            };

            if (self.itemToSelect) {
                self.itemToSelect.set('isSelected');
                self.itemToSelect = isDown ?
                    source.next(self.itemToSelect, predicate) : source.previous(self.itemToSelect, predicate);
            } else {
                self.itemToSelect = isDown ? source.first(predicate) : source.last(predicate);
            }
            if (self.itemToSelect) {
                self.itemToSelect.set('isSelected', 'selected');
                self.autoScrollList();
            }
        },

        autoScrollList: function () {
            var self = this;

            var itemList = self.place.pins.itemList;
            var itemListHeight = itemList.element.clientHeight;
            var scrollTop = itemList.element.scrollTop;
            var newScrollTop = scrollTop;
            var itemComponent;
            var itemHeight;
            var itemChildList = itemList.childList;
            var itemTop = 0;

            for (var i = 0, length = itemChildList.length; i < length; i++) {
                itemComponent = itemChildList[i].component;
                itemHeight = itemChildList[i].element.clientHeight;

                if (itemComponent.get('class') === 'selected') {

                    if (itemTop < scrollTop) {
                        newScrollTop = itemTop;
                    }
                    else if (itemTop + itemHeight > itemListHeight + scrollTop) {

                        if (itemTop - itemHeight > scrollTop + itemListHeight) {
                            newScrollTop = itemTop;
                        }

                        newScrollTop = itemHeight + itemTop - itemListHeight;
                    }

                    break;
                }
                itemTop += itemHeight;
            }
            if (scrollTop !== newScrollTop) {
                itemList.element.scrollTop = newScrollTop;
                self.blockMouseOver = true;
            }

        },

        resetScroll: function () {
            if (this.place.pins.itemList.element) {
                this.place.pins.itemList.element.scrollTop = 0;
            }
        },

        selectItem: function (item) {
            var self = this;
            self.set('inputValue', item ? item.get('value') : '');
            self.set('selectedItem', item);
            self.set('value', item ? item.get('key') : self.get('default-value'), false, true);
            self.hideList();
            var showAllItems = !item;
            self.updateListVisibility(showAllItems);
        },

        resetItem: function () {
            this.set('selectedItem');
            if(this.get('must-select') !== "false") {
                this.set('value', this.get('default-value'), false, true);
            }
            else {
                this.set('value', this.get('inputValue'), false, true);
            }
        },

        inputUpdate: function () {
            var self = this;
            var candidate = self.get('processedSource').find(
                function (item) {
                    return item.get('value').lowerEqual(self.get('inputValue'));
                });
            if (candidate) {
                self.selectItem(candidate);
            }
            else {
                self.resetItem();
                self.showList();
                self.updateListVisibility();
            }
        },

        update: function () {
            this.setDirectionAndHeight();
            this.setDisabled();

            if (this.get('selectedItem')) {
                this.selectItem(this.get('selectedItem'));
            }
        }
    });
});
