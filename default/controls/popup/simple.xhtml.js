define("controls/popup/simple.xhtml", {}, function () {
    return {
        "templateCss": "controls_popup_simple",
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