define("controls/multiCheckbox/multiCheckbox.xhtml", {}, function () {
    return {
        "templateCss": "controls_multiCheckbox_multiCheckbox",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "region": "items",
                    "id": "itemBlock",
                    "source": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "source"
                        }
                    }
                },
                "attrs": {
                    "class": "itemsBlock"
                },
                "canChange": {
                    "source": true
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "item"
                        },
                        "children": [
                            {
                                "nodeName": "span",
                                "props": {
                                    "region": "checkbox",
                                    "id": "itemCheckbox",
                                    "context": {
                                        "extensionName": "item",
                                        "params": {
                                        }
                                    },
                                    "command": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "doChange"
                                        }
                                    },
                                    "command-data": {
                                        "extensionName": "context",
                                        "params": {
                                        }
                                    },
                                    "value": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "isChecked",
                                            "mode": "twoWay"
                                        }
                                    },
                                    "autocommit": "select",
                                    "focus-event": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "focusEvent"
                                        }
                                    },
                                    "enabled": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "isEnabled"
                                        }
                                    }
                                },
                                "canChange": {
                                    "context": true,
                                    "command": true,
                                    "command-data": true,
                                    "value": true,
                                    "focus-event": true,
                                    "enabled": true
                                }
                            },
                            {
                                "nodeName": "span",
                                "props": {
                                    "region": "label",
                                    "id": "itemText",
                                    "context": {
                                        "extensionName": "item",
                                        "params": {
                                        }
                                    },
                                    "text": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "displayValue"
                                        }
                                    },
                                    "enabled": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "isEnabled"
                                        }
                                    }
                                },
                                "canChange": {
                                    "context": true,
                                    "text": true,
                                    "enabled": true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});