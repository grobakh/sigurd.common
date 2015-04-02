define("controls/expander/expander.xhtml", {}, function () {
    return {
        "templateCss": "controls_expander_expander",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "id": "controller"
                }
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "expander"
                },
                "props": {
                    "id": "content"
                }
            }
        ]
    }
});