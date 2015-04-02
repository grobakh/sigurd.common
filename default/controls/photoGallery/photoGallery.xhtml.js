define("controls/photoGallery/photoGallery.xhtml", {}, function () {
    return {
        "templateCss": "controls_photoGallery_photoGallery",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "photoBlock"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "photoList"
                        },
                        "props": {
                            "region": "items",
                            "source": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "source"
                                }
                            }
                        },
                        "canChange": {
                            "source": true
                        },
                        "children": [
                            {
                                "nodeName": "div",
                                "props": {
                                    "region": "switch",
                                    "value": {
                                        "extensionName": "item",
                                        "params": {
                                            "path": "state"
                                        }
                                    },
                                    "context": {
                                        "extensionName": "item",
                                        "params": {
                                        }
                                    }
                                },
                                "canChange": {
                                    "value": true,
                                    "context": true
                                },
                                "children": [
                                    {
                                        "nodeName": "div",
                                        "props": {
                                            "switch-value": "image"
                                        },
                                        "children": [
                                            {
                                                "nodeName": "div",
                                                "props": {
                                                    "region": "button",
                                                    "template": "controls/photoGallery/photoButton",
                                                    "class": {
                                                        "extensionName": "context",
                                                        "params": {
                                                            "path": "isSelected"
                                                        }
                                                    },
                                                    "imageWidth": "48",
                                                    "imageHeight": "36",
                                                    "imageId": {
                                                        "extensionName": "context",
                                                        "params": {
                                                            "path": "originalImageId"
                                                        }
                                                    },
                                                    "command": {
                                                        "extensionName": "templateParent",
                                                        "params": {
                                                            "path": "select-command"
                                                        }
                                                    },
                                                    "command-data": {
                                                        "extensionName": "context",
                                                        "params": {
                                                        }
                                                    }
                                                },
                                                "canChange": {
                                                    "class": true,
                                                    "imageId": true,
                                                    "command": true,
                                                    "command-data": true
                                                },
                                                "attrs": {
                                                    "class": "imageButton"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "nodeName": "div",
                                        "props": {
                                            "switch-value": "new"
                                        },
                                        "children": [
                                            {
                                                "nodeName": "div",
                                                "attrs": {
                                                    "class": "addButton"
                                                },
                                                "children": [
                                                    {
                                                        "nodeName": "span",
                                                        "props": {
                                                            "region": "image",
                                                            "no-image": "b2b:icons/no-logo.png"
                                                        }
                                                    },
                                                    {
                                                        "nodeName": "span",
                                                        "attrs": {
                                                            "class": "add-image"
                                                        },
                                                        "props": {
                                                            "region": "controls/fileUpload/fileUploadButton",
                                                            "type": "Image",
                                                            "text": {
                                                                "extensionName": "templateParent",
                                                                "params": {
                                                                    "path": "addImageButton"
                                                                }
                                                            },
                                                            "multiple": {
                                                                "extensionName": "templateParent",
                                                                "params": {
                                                                    "path": "multiple-upload"
                                                                }
                                                            },
                                                            "command": {
                                                                "extensionName": "templateParent",
                                                                "params": {
                                                                    "path": "upload-command"
                                                                }
                                                            }
                                                        },
                                                        "canChange": {
                                                            "text": true,
                                                            "multiple": true,
                                                            "command": true
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "nodeName": "div",
                                        "props": {
                                            "switch-value": "empty"
                                        },
                                        "children": [
                                            {
                                                "nodeName": "div",
                                                "props": {
                                                    "region": "panel"
                                                },
                                                "attrs": {
                                                    "class": "emptyButton"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});