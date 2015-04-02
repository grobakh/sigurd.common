define("controls/previewWindow/previewWindow.xhtml", {}, function () {
    return {
        "templateCss": "controls_previewWindow_previewWindow",
        "children": [
            {
                "nodeName": "img",
                "props": {
                    "id": "image"
                },
                "attrs": {
                    "src": ""
                },
                "unary": true
            }
        ]
    }
});