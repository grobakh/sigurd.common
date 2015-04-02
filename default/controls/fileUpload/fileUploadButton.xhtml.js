define("controls/fileUpload/fileUploadButton.xhtml", {}, function () {
    return {
        "templateCss": "controls_fileUpload_fileUploadButton",
        "children": [
            {
                "nodeName": "form",
                "attrs": {
                    "class": "upload",
                    "method": "post",
                    "enctype": "multipart/form-data",
                    "target": "uploadFrame"
                },
                "props": {
                    "id": "formInput"
                },
                "children": [
                    {
                        "nodeName": "span",
                        "attrs": {
                            "class": "label"
                        },
                        "props": {
                            "region": "label",
                            "text": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "text"
                                }
                            }
                        },
                        "canChange": {
                            "text": true
                        }
                    },
                    {
                        "nodeName": "input",
                        "attrs": {
                            "class": "file",
                            "type": "file",
                            "name": "resource",
                            "accept": "*"
                        },
                        "props": {
                            "id": "fileInput"
                        },
                        "unary": true
                    },
                    {
                        "nodeName": "input",
                        "props": {
                            "id": "acceptTypeInput"
                        },
                        "attrs": {
                            "type": "hidden",
                            "name": "acceptType",
                            "value": "AnyType"
                        },
                        "unary": true
                    }
                ]
            }
        ]
    }
});