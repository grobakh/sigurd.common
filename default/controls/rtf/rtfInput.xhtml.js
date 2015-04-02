define("controls/rtf/rtfInput.xhtml", {}, function () {
    return {
        "templateCss": "controls_rtf_rtfInput",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "contenteditable": "true",
                    "class": "rtf-input",
                    "tabindex": "0"
                },
                "props": {
                    "id": "inputField"
                }
            },
            {
                "nodeName": "div",
                "props": {
                    "region": "label",
                    "text": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "count-label"
                        }
                    },
                    "visible": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "isValidCount"
                        }
                    }
                },
                "canChange": {
                    "text": true,
                    "visible": true
                }
            }
        ]
    }
});