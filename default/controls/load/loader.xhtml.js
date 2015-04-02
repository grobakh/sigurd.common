define("controls/load/loader.xhtml", {}, function () {
    return {
        "templateCss": "controls_load_loader",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "region": "panel",
                    "visible": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "loading"
                        }
                    },
                    "top": "0",
                    "bottom": "0",
                    "left": "0",
                    "right": "0"
                },
                "attrs": {
                    "class": "blocker"
                },
                "canChange": {
                    "visible": true
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "loader"
                        },
                        "children": [
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "textComment"
                                },
                                "props": {
                                    "region": "label",
                                    "text": {
                                        "extensionName": "token",
                                        "params": {
                                            "path": "commonActions.loadingData"
                                        }
                                    }
                                },
                                "canChange": {
                                    "text": true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});