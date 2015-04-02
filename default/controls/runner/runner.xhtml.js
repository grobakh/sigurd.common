define("controls/runner/runner.xhtml", {}, function () {
    return {
        "templateCss": "controls_runner_runner",
        "children": [
            {
                "nodeName": "span",
                "attrs": {
                    "class": "text"
                },
                "props": {
                    "id": "text"
                }
            },
            {
                "nodeName": "span",
                "attrs": {
                    "class": "bar"
                },
                "props": {
                    "id": "bar"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "runner"
                        },
                        "props": {
                            "id": "runner"
                        }
                    }
                ]
            }
        ]
    }
});