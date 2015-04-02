define("controls/slider/slider.xhtml", {}, function () {
    return {
        "templateCss": "controls_slider_slider",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "region": "panel",
                    "id": "left",
                    "dynamic": "fast",
                    "left": "0",
                    "width": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "slider-left"
                        }
                    },
                    "right": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "slider-right"
                        }
                    },
                    "top": "0",
                    "bottom": "0"
                },
                "canChange": {
                    "width": true,
                    "right": true
                }
            },
            {
                "nodeName": "div",
                "props": {
                    "region": "panel",
                    "id": "right",
                    "dynamic": "fast",
                    "left": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "slider-left"
                        }
                    },
                    "width": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "slider-right"
                        }
                    },
                    "right": "0",
                    "top": "0",
                    "bottom": "0"
                },
                "canChange": {
                    "left": true,
                    "width": true
                }
            },
            {
                "nodeName": "div",
                "props": {
                    "region": "panel",
                    "id": "dragfield",
                    "dynamic": "fast",
                    "left": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "slider-left"
                        }
                    },
                    "right": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "slider-right"
                        }
                    },
                    "width": "3",
                    "top": "0",
                    "bottom": "0"
                },
                "canChange": {
                    "left": true,
                    "right": true
                },
                "attrs": {
                    "class": "dragfield"
                }
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "blocker"
                },
                "props": {
                    "id": "blocker"
                }
            }
        ]
    }
});