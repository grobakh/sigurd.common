define("controls/popup/confirm.xhtml", {}, function () {
    return {
        "templateCss": "controls_popup_confirm",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "region": "panel",
                    "id": "wrapper"
                },
                "attrs": {
                    "class": "visible"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "blocker"
                        },
                        "props": {
                            "id": "blocker"
                        }
                    },
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "window"
                        },
                        "props": {
                            "id": "window"
                        },
                        "children": [
                            {
                                "nodeName": "div",
                                "props": {
                                    "region": "button",
                                    "template": "controls/button/imageButton",
                                    "css": "controls_popup_close",
                                    "command": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "doCancel"
                                        }
                                    }
                                },
                                "attrs": {
                                    "class": "x"
                                },
                                "canChange": {
                                    "command": true
                                }
                            },
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "windowContent"
                                },
                                "props": {
                                    "region": "scroller",
                                    "id": "content"
                                },
                                "children": [
                                    {
                                        "nodeName": "div",
                                        "children": [
                                            {
                                                "nodeName": "span",
                                                "attrs": {
                                                    "class": "title"
                                                },
                                                "props": {
                                                    "region": "label",
                                                    "text": {
                                                        "extensionName": "templateParent",
                                                        "params": {
                                                            "path": "text"
                                                        }
                                                    }
                                                },
                                                "canChange": {
                                                    "text": true
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "nodeName": "div",
                                        "attrs": {
                                            "class": "buttons"
                                        },
                                        "children": [
                                            {
                                                "nodeName": "span",
                                                "props": {
                                                    "region": "button",
                                                    "text": {
                                                        "extensionName": "token",
                                                        "params": {
                                                            "path": "commonActions.ok"
                                                        }
                                                    },
                                                    "command": {
                                                        "extensionName": "templateParent",
                                                        "params": {
                                                            "path": "doCommit"
                                                        }
                                                    },
                                                    "css": "controls_button_defaultButton"
                                                },
                                                "canChange": {
                                                    "text": true,
                                                    "command": true
                                                }
                                            },
                                            {
                                                "nodeName": "span",
                                                "props": {
                                                    "region": "button",
                                                    "text": {
                                                        "extensionName": "token",
                                                        "params": {
                                                            "path": "commonActions.cancel"
                                                        }
                                                    },
                                                    "command": {
                                                        "extensionName": "templateParent",
                                                        "params": {
                                                            "path": "doCancel"
                                                        }
                                                    }
                                                },
                                                "canChange": {
                                                    "text": true,
                                                    "command": true
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});