define("controls/combo/combo.xhtml", {}, function () {
    return {
        "templateCss": "controls_combo_combo",
        "children": [
            {
                "nodeName": "select",
                "props": {
                    "id": "select",
                    "region": "items",
                    "source": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "source"
                        }
                    },
                    "filter": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "items-filter"
                        }
                    },
                    "builder": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "builder"
                        }
                    },
                    "before-builder": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "emptyBuilder"
                        }
                    },
                    "empty-builder": {
                        "extensionName": "templateParent",
                        "params": {
                            "path": "emptyBuilder"
                        }
                    },
                    "before-fragment": {
                        "children": [
                            {
                                "nodeName": "option"
                            }
                        ],
                        "isFragment": true
                    },
                    "empty-fragment": {
                        "children": [
                            {
                                "nodeName": "option"
                            }
                        ],
                        "isFragment": true
                    }
                },
                "canChange": {
                    "source": true,
                    "filter": true,
                    "builder": true,
                    "before-builder": true,
                    "empty-builder": true
                },
                "children": [
                    {
                        "nodeName": "option"
                    }
                ]
            }
        ]
    }
});