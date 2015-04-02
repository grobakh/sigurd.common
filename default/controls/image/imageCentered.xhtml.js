define("controls/image/imageCentered.xhtml", {}, function () {
    return {
        "templateCss": "controls_image_imageCentered",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "image-wrapper"
                },
                "children": [
                    {
                        "nodeName": "span",
                        "children": [
                            {
                                "value": "&nbsp;",
                                "unary": true
                            }
                        ]
                    },
                    {
                        "nodeName": "img",
                        "props": {
                            "id": "image"
                        },
                        "unary": true
                    },
                    {
                        "nodeName": "span",
                        "children": [
                            {
                                "value": "&nbsp;",
                                "unary": true
                            }
                        ]
                    }
                ]
            }
        ]
    }
});