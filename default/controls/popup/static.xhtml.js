define("controls/popup/static.xhtml", {}, function () {
    return {
        "templateCss": "controls_popup_static",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "modalVisible"
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
                                    "class": "windowContent"
                                },
                                "props": {
                                    "id": "content"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});