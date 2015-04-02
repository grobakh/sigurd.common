define("controls/complex/item/categoryPicker.xhtml", {}, function () {
    return {
        "templateCss": "controls_complex_item_categoryPicker",
        "children": [
            {
                "nodeName": "div",
                "children": [
                    {
                        "nodeName": "span",
                        "props": {
                            "region": "combo",
                            "autocommit": "select",
                            "empty-value": {
                                "extensionName": "token",
                                "params": {
                                    "path": "item.createScreenEmptyCategory"
                                }
                            },
                            "display-path": "title",
                            "value-path": "code",
                            "selected-value": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "category",
                                    "mode": "twoWay"
                                }
                            },
                            "source": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "categorySource"
                                }
                            }
                        },
                        "canChange": {
                            "empty-value": true,
                            "selected-value": true,
                            "source": true
                        }
                    },
                    {
                        "nodeName": "span",
                        "props": {
                            "region": "combo",
                            "autocommit": "select",
                            "source": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "subcategorySource"
                                }
                            },
                            "empty-value": {
                                "extensionName": "token",
                                "params": {
                                    "path": "item.createScreenEmptySubCategory"
                                }
                            },
                            "display-path": "title",
                            "value-path": "code",
                            "selected-value": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "subcategory",
                                    "mode": "twoWay"
                                }
                            }
                        },
                        "canChange": {
                            "source": true,
                            "empty-value": true,
                            "selected-value": true
                        }
                    },
                    {
                        "nodeName": "span",
                        "props": {
                            "region": "combo",
                            "autocommit": "select",
                            "source": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "specificationSource"
                                }
                            },
                            "empty-value": {
                                "extensionName": "token",
                                "params": {
                                    "path": "item.createScreenEmptyView"
                                }
                            },
                            "display-path": "title",
                            "value-path": "code",
                            "selected-value": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "selected-specification",
                                    "mode": "twoWay"
                                }
                            }
                        },
                        "canChange": {
                            "source": true,
                            "empty-value": true,
                            "selected-value": true
                        }
                    }
                ]
            }
        ]
    }
});