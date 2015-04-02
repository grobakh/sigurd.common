define("controls/imageUploader/imageUploader.xhtml", {}, function () {
    return {
        "templateCss": "controls_imageUploader_imageUploader",
        "children": [
            {
                "nodeName": "div",
                "props": {
                    "region": "controls/popup/modalDialog",
                    "visible": {
                        "extensionName": "context",
                        "params": {
                            "path": "isVisible"
                        }
                    },
                    "header-fragment": {
                        "children": [
                            {
                                "nodeName": "div",
                                "props": {
                                    "region": "label",
                                    "text": {
                                        "extensionName": "templateParent",
                                        "params": {
                                            "path": "dialog-title"
                                        }
                                    }
                                },
                                "canChange": {
                                    "text": true
                                }
                            }
                        ],
                        "isFragment": true
                    },
                    "footer-fragment": {
                        "children": [
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "buttons"
                                },
                                "children": [
                                    {
                                        "nodeName": "span",
                                        "props": {
                                            "region": "button",
                                            "text": {
                                                "extensionName": "token",
                                                "params": {
                                                    "path": "commonActions.save"
                                                }
                                            },
                                            "command": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "doCommit"
                                                }
                                            }
                                        },
                                        "canChange": {
                                            "text": true,
                                            "command": true
                                        }
                                    },
                                    {
                                        "nodeName": "span",
                                        "props": {
                                            "region": "button",
                                            "text": {
                                                "extensionName": "token",
                                                "params": {
                                                    "path": "commonActions.cancel"
                                                }
                                            },
                                            "command": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "doCancel"
                                                }
                                            }
                                        },
                                        "canChange": {
                                            "text": true,
                                            "command": true
                                        }
                                    }
                                ]
                            }
                        ],
                        "isFragment": true
                    }
                },
                "canChange": {
                    "visible": true
                },
                "children": [
                    {
                        "nodeName": "div",
                        "props": {
                            "region": "panel",
                            "visible": {
                                "extensionName": "context",
                                "params": {
                                    "path": "originalImageId"
                                }
                            }
                        },
                        "canChange": {
                            "visible": true
                        },
                        "children": [
                            {
                                "nodeName": "div",
                                "attrs": {
                                    "class": "image-area"
                                },
                                "children": [
                                    {
                                        "nodeName": "div",
                                        "props": {
                                            "region": "cropper",
                                            "no-image": "/client/b2b/icons/no-photo.png",
                                            "expected-width": {
                                                "extensionName": "templateParent",
                                                "params": {
                                                    "path": "expected-width"
                                                }
                                            },
                                            "expected-height": {
                                                "extensionName": "templateParent",
                                                "params": {
                                                    "path": "expected-height"
                                                }
                                            },
                                            "lock-ratio": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "fixedRatio"
                                                }
                                            },
                                            "image-id": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "originalImageId"
                                                }
                                            },
                                            "result-left": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "cropperLeft",
                                                    "mode": "backWay"
                                                }
                                            },
                                            "result-top": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "cropperTop",
                                                    "mode": "backWay"
                                                }
                                            },
                                            "result-height": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "cropperHeight",
                                                    "mode": "backWay"
                                                }
                                            },
                                            "result-width": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "cropperWidth",
                                                    "mode": "backWay"
                                                }
                                            },
                                            "reset-event": {
                                                "extensionName": "context",
                                                "params": {
                                                    "path": "cropperReset"
                                                }
                                            }
                                        },
                                        "canChange": {
                                            "expected-width": true,
                                            "expected-height": true,
                                            "lock-ratio": true,
                                            "image-id": true,
                                            "result-left": true,
                                            "result-top": true,
                                            "result-height": true,
                                            "result-width": true,
                                            "reset-event": true
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "nodeName": "div",
                        "children": [
                            {
                                "nodeName": "span",
                                "props": {
                                    "region": "controls/fileUpload/fileUploadButton",
                                    "type": "Image",
                                    "text": {
                                        "extensionName": "token",
                                        "params": {
                                            "path": "commonActions.uploadImage"
                                        }
                                    },
                                    "command": {
                                        "extensionName": "context",
                                        "params": {
                                            "path": "doSetResource"
                                        }
                                    }
                                },
                                "canChange": {
                                    "text": true,
                                    "command": true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});