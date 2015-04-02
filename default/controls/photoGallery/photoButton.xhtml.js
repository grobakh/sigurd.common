define("controls/photoGallery/photoButton.xhtml", {}, function () {
    return {
        "templateCss": "controls_photoGallery_photoButton",
        "children": [
            {
                "nodeName": "span",
                "props": {
                    "region": "image",
                    "image-id": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "imageId"
                        }
                    },
                    "image-width": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "imageWidth"
                        }
                    },
                    "image-height": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "imageHeight"
                        }
                    }
                },
                "attrs": {
                    "class": ""
                },
                "canChange": {
                    "image-id": true,
                    "image-width": true,
                    "image-height": true
                }
            }
        ]
    }
});