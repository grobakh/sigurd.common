define("controls/form/hintedField.xhtml", {}, function () {
    return {
        "templateCss": "controls_form_hintedField",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "id": "hint"
                },
                "attrs": {
                    "class": "hint"
                }
            },
            {
                "nodeName": "div",
                "props": {
                    "id": "content"
                },
                "attrs": {
                    "class": "presenter"
                }
            }
        ]
    }
});