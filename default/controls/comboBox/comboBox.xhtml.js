define("controls/comboBox/comboBox.xhtml", {}, function () {
    return {
        "templateCss": "controls_comboBox_comboBox",
        "children": [
            {
                "nodeName": "span",
                "props": {
                    "region": "textInput",
                    "id": "inputValue",
                    "autocommit": "input",
                    "text": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "inputValue",
                            "mode": "twoWay"
                        }
                    }
                },
                "attrs": {
                    "class": "inputWrapper"
                },
                "canChange": {
                    "text": true
                }
            },
            {
                "nodeName": "span",
                "props": {
                    "id": "controlButton"
                },
                "attrs": {
                    "class": "controlButton"
                }
            },
            {
                "nodeName": "ul",
                "props": {
                    "region": "items",
                    "id": "itemList",
                    "source": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "processedSource"
                        }
                    },
                    "visible": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "isListVisible"
                        }
                    },
                    "item-fragment": {
                        "children": [
                            {
                                "nodeName": "li",
                                "props": {
                                    "region": "button",
                                    "template": "controls/comboBox/optionButton",
                                    "context": {
                                        "extensionName": "item",
                                        "params": {
                                        }
                                    },
                                    "class": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "isSelected"
                                        }
                                    },
                                    "text": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "value"
                                        }
                                    },
                                    "visible": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "isVisible"
                                        }
                                    },
                                    "command": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "doSelect"
                                        }
                                    },
                                    "command-data": {
                                        "extensionName": "context",
                                        "params": {
                                        }
                                    },
                                    "down-command": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "doStartSelect"
                                        }
                                    }
                                },
                                "attrs": {
                                    "class": "item"
                                },
                                "canChange": {
                                    "context": true,
                                    "class": true,
                                    "text": true,
                                    "visible": true,
                                    "command": true,
                                    "command-data": true,
                                    "down-command": true
                                }
                            }
                        ],
                        "isFragment": true
                    }
                },
                "attrs": {
                    "class": "modalList"
                },
                "canChange": {
                    "source": true,
                    "visible": true
                }
            }
        ]
    }
});