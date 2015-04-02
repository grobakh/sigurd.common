define("controls/code/code.xhtml", {}, function () {
    return {
        "templateCss": "controls_code_code",
        "children": [
            {
                "nodeName": "textarea",
                "attrs": {
                    "rows": "3",
                    "cols": "20"
                },
                "props": {
                    "id": "codeTextArea"
                }
            }
        ]
    }
});