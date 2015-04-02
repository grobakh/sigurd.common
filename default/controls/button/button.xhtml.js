define("controls/button/button.xhtml", {}, function () {
    return {
        "templateCss": "controls_button_button",
        "children": [
            {
                "nodeName": "button",
                "props": {
                    "id": "buttonText"
                },
                "attrs": {
                    "type": "button"
                }
            }
        ]
    }
});