define("controls/popup/textHeader.xhtml", {}, function () {
    return {
        "templateCss": "controls_popup_textHeader",
        "children": [
            {
                "nodeName": "span",
                "props": {
                    "region": "button",
                    "css": "controls_popup_newTab",
                    "command": {
                        "extensionName": "context",
                        "params": {
                            "path": "doOpenHelpNewTab"
                        }
                    },
                    "text": {
                        "extensionName": "token",
                        "params": {
                            "path": "commonActions.openInNewTab"
                        }
                    }
                },
                "canChange": {
                    "command": true,
                    "text": true
                }
            },
            {
                "nodeName": "span",
                "props": {
                    "region": "button",
                    "css": "controls_popup_print",
                    "command": {
                        "extensionName": "context",
                        "params": {
                            "path": "doPrintHelp"
                        }
                    },
                    "text": {
                        "extensionName": "token",
                        "params": {
                            "path": "commonActions.print"
                        }
                    }
                },
                "canChange": {
                    "command": true,
                    "text": true
                }
            }
        ]
    }
});