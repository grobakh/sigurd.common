define("controls/cropper/cropper.xhtml", {}, function () {
    return {
        "templateCss": "controls_cropper_cropper",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "id": "frame"
                },
                "attrs": {
                    "class": "frame"
                },
                "children": [
                    {
                        "nodeName": "img",
                        "props": {
                            "id": "image"
                        },
                        "attrs": {
                            "class": "image"
                        },
                        "unary": true
                    },
                    {
                        "nodeName": "div",
                        "props": {
                            "id": "cover"
                        },
                        "attrs": {
                            "class": "cover"
                        },
                        "children": [
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "blind"
                                },
                                "props": {
                                    "region": "panel",
                                    "dynamic": "fast",
                                    "width": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-right"
                                        }
                                    },
                                    "right": "0",
                                    "top": "0",
                                    "bottom": "0"
                                },
                                "canChange": {
                                    "width": true
                                }
                            },
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "blind"
                                },
                                "props": {
                                    "region": "panel",
                                    "dynamic": "fast",
                                    "left": "0",
                                    "width": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-left"
                                        }
                                    },
                                    "top": "0",
                                    "bottom": "0"
                                },
                                "canChange": {
                                    "width": true
                                }
                            },
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "blind"
                                },
                                "props": {
                                    "region": "panel",
                                    "dynamic": "fast",
                                    "left": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-left"
                                        }
                                    },
                                    "right": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-right"
                                        }
                                    },
                                    "height": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-bottom"
                                        }
                                    },
                                    "bottom": "0"
                                },
                                "canChange": {
                                    "left": true,
                                    "right": true,
                                    "height": true
                                }
                            },
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "blind"
                                },
                                "props": {
                                    "region": "panel",
                                    "dynamic": "fast",
                                    "left": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-left"
                                        }
                                    },
                                    "right": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-right"
                                        }
                                    },
                                    "top": "0",
                                    "height": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-top"
                                        }
                                    }
                                },
                                "canChange": {
                                    "left": true,
                                    "right": true,
                                    "height": true
                                }
                            },
                            {
                                "nodeName": "div",
                                "props": {
                                    "id": "cropper",
                                    "region": "panel",
                                    "dynamic": "fast",
                                    "overflow": "true",
                                    "left": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-left"
                                        }
                                    },
                                    "right": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-right"
                                        }
                                    },
                                    "top": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-top"
                                        }
                                    },
                                    "bottom": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "cropper-bottom"
                                        }
                                    }
                                },
                                "canChange": {
                                    "left": true,
                                    "right": true,
                                    "top": true,
                                    "bottom": true
                                },
                                "children": [
                                    {
                                        "nodeName": "div",
                                        "attrs": {
                                            "class": "dragfield top left"
                                        }
                                    },
                                    {
                                        "nodeName": "div",
                                        "attrs": {
                                            "class": "dragfield top right"
                                        }
                                    },
                                    {
                                        "nodeName": "div",
                                        "attrs": {
                                            "class": "dragfield bottom left"
                                        }
                                    },
                                    {
                                        "nodeName": "div",
                                        "attrs": {
                                            "class": "dragfield bottom right"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "nodeName": "div",
                        "props": {
                            "id": "blocker"
                        },
                        "attrs": {
                            "class": "blocker"
                        }
                    }
                ]
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "preview"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "props": {
                            "region": "previewWindow",
                            "top": "0",
                            "left": "0",
                            "height": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "expected-height"
                                }
                            },
                            "width": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "expected-width"
                                }
                            },
                            "image-id": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "image-id"
                                }
                            },
                            "dynamic": "true",
                            "zoom": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "preview-zoom"
                                }
                            },
                            "crop-height": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "result-height"
                                }
                            },
                            "crop-width": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "result-width"
                                }
                            },
                            "crop-left": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "result-left"
                                }
                            },
                            "crop-top": {
                                "extensionName": "templateParent",
                                "params": {
                                    "path": "result-top"
                                }
                            }
                        },
                        "canChange": {
                            "height": true,
                            "width": true,
                            "image-id": true,
                            "zoom": true,
                            "crop-height": true,
                            "crop-width": true,
                            "crop-left": true,
                            "crop-top": true
                        }
                    }
                ]
            }
        ]
    }
});