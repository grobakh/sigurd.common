define("controls/hint/hint.xhtml", {}, function () {
    return {
        "templateCss": "controls_hint_hint",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "hint"
                },
                "props": {
                    "id": "hint"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "hintLine"
                        },
                        "props": {
                            "id": "hintLine"
                        }
                    },
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "hintBody"
                        },
                        "props": {
                            "id": "text"
                        }
                    }
                ]
            }
        ]
    }
});