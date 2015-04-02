define("controls/popup/modalDialog.xhtml", {}, function () {
    return {
        "templateCss": "controls_popup_modalDialog",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "modalVisible",
                    "tabindex": "0"
                },
                "props": {
                    "id": "wrapper"
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
                                    "id": "modalDialog.closeButton",
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
                                    "class": "header"
                                },
                                "props": {
                                    "id": "header"
                                }
                            },
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "windowContent"
                                },
                                "props": {
                                    "region": "scroller",
                                    "id": "content",
                                    "content-height": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "scroller-content-height",
                                            "mode": "backWay"
                                        }
                                    }
                                },
                                "canChange": {
                                    "content-height": true
                                }
                            },
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "footer"
                                },
                                "props": {
                                    "id": "footer"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});