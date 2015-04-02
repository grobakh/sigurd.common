define("controls/textInput/textInput.xhtml", {}, function () {
    return {
        "templateCss": "controls_textInput_textInput",
        "children": [
            {
                "nodeName": "input",
                "attrs": {
                    "class": "input",
                    "type": "text",
                    "value": ""
                },
                "props": {
                    "id": "inputField"
                },
                "unary": true
            }
        ]
    }
});