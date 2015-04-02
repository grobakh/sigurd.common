define('controls/complex/item/categoryPicker',
    { Component: 'core/view/component',
        Collection: 'core/collection',
        Model: 'core/model'
    }, function (imported) {

        return imported.Component.extend({
            setup: {
                template: "controls/complex/item/categoryPicker",
                source: undefined,
                'category': undefined,
                'subcategory': undefined,
                'specification': undefined,
                'selected-specification': undefined,
                'reset-event': undefined
            },

            initialize: function () {
                var self = this;
                self.watch('source', self.updateSource);
                self.loop('category', self.selectCategory);
                self.loop('subcategory', self.selectSubcategory);
                self.loop('selected-specification', self.selectSpecification);
                self.watch('specification', self.restoreSpecification);
                self.watch('reset-event', self.reset);
                self.updateSource();
                self.restoreSpecification();
            },

            attachElements: function () {
            },

            update: function () {
            },

            updateSource: function () {
                var self = this;
                var source = self.get('source');
                if (source) {
                    self.set('categorySource', self.categoryModelInit({subcategories: source}).get('subcategories'));
                }
            },

            selectCategory: function () {
                var self = this;
                var category = self.getCategoryByCode(self.get('category'));
                if (category) {
                    self.set('subcategorySource', category.get('subcategories'));
                }
                else {
                    self.set('subcategorySource');
                }
            },

            selectSubcategory: function () {
                var self = this;
                var subcategory = self.getCategoryByCode(self.get('subcategory'));
                if (subcategory) {
                    self.set('specificationSource', subcategory.get('subcategories'));
                }
                else {
                    self.set('specificationSource');
                }
            },

            selectSpecification: function () {
                var self = this;
                self.set('specification', self.get('selected-specification'), false, true);
            },

            restoreSpecification: function () {
                var self = this;
                var specCode = self.get('specification');
                if (specCode) {
                    var specification = self.getCategoryByCode(specCode);
                    var subcategory = specification.get('parent');
                    var category = subcategory.get('parent');
                    self.set('category', category.get('code'));
                    self.set('subcategory', subcategory.get('code'));
                    self.set('selected-specification', specCode);
                }
                else {
                    self.set('selected-specification', '');
                }
            },

            reset: function () {
                var self = this;
                if (self.get('reset-event')) {
                    self.set('category');
                }
            },

            getCategoryByCode: function (code) {
                var self = this;
                var source = self.get('categorySource');
                if (!code) {
                    return;
                }

                var findCategory = function (category, code) {
                    if (category.get('code') === code) {
                        return category;
                    }
                    var subcategories = category.get('subcategories');
                    if (!subcategories) {
                        return;
                    }
                    for (var i = 0; i < subcategories.items.length; i++) {
                        var result = findCategory(subcategories.items[i], code);
                        if (result) {
                            return result;
                        }
                    }
                };

                for (var i = 0; i < source.items.length; i++) {
                    var result = findCategory(source.items[i], code);
                    if (result) {
                        return result;
                    }
                }
            },

            categoryModelInit: function (category, parent) {
                var self = this;
                var categoryModel = new imported.Model(category);
                categoryModel.set('parent', parent);
                if (category.subcategories && category.subcategories.length) {
                    var subcategories = imported.Collection.from(category.subcategories, function (category) {
                        return self.categoryModelInit(category, categoryModel);
                    });
                    categoryModel.set('subcategories', subcategories);
                }
                return categoryModel;
            }

        });
    });
