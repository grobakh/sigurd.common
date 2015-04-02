define("controls/url/imageUrl.xhtml", {}, function () {
    return {
        "templateCss": "controls_url_imageUrl",
        "children": [
            {
                "nodeName": "a",
                "props": {
                    "id": "text"
                },
                "children": [
                    {
                        "nodeName": "span",
                        "props": {
                            "region": "image",
                            "no-image": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "noImage"
                                }
                            },
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
                        "canChange": {
                            "no-image": true,
                            "image-id": true,
                            "image-width": true,
                            "image-height": true
                        }
                    }
                ]
            }
        ]
    }
});