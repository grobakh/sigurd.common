define("controls/image/image.xhtml", {}, function () {
    return {
        "templateCss": "controls_image_image",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "id": "box"
                },
                "children": [
                    {
                        "nodeName": "img",
                        "props": {
                            "id": "image"
                        },
                        "unary": true
                    }
                ]
            }
        ]
    }
});