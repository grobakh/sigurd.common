define("controls/textInput/textArea.xhtml", {}, function () {
    return {
        "templateCss": "controls_textInput_textArea",
        "children": [
            {
                "nodeName": "textarea",
                "props": {
                    "id": "inputField"
                },
                "attrs": {
                    "rows": "4",
                    "cols": "20"
                }
            }
        ]
    }
});