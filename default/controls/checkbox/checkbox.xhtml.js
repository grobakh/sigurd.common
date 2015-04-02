define("controls/checkbox/checkbox.xhtml", {}, function () {
    return {
        "templateCss": "controls_checkbox_checkbox",
        "children": [
            {
                "nodeName": "input",
                "attrs": {
                    "type": "checkbox",
                    "value": ""
                },
                "props": {
                    "id": "input"
                },
                "unary": true
            },
            {
                "nodeName": "div",
                "props": {
                    "id": "cover"
                }
            }
        ]
    }
});