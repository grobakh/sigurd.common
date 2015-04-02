define("controls/form/simpleField.xhtml", {}, function () {
    return {
        "templateCss": "controls_form_simpleField",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "id": "content"
                },
                "attrs": {
                    "class": "presenter"
                }
            },
            {
                "nodeName": "div",
                "props": {
                    "id": "error"
                },
                "attrs": {
                    "class": "error"
                }
            }
        ]
    }
});