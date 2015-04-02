define("controls/scroller/scroller.xhtml", {}, function () {
    return {
        "templateCss": "controls_scroller_scroller",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "scroll-blocker"
                },
                "props": {
                    "id": "scrollBlocker"
                }
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "top-scrolled"
                },
                "props": {
                    "id": "topScrolled"
                }
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "target",
                    "tabindex": "0"
                },
                "props": {
                    "id": "target"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "inner"
                        },
                        "props": {
                            "id": "content"
                        }
                    }
                ]
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "bottom-scrolled"
                },
                "props": {
                    "id": "bottomScrolled"
                }
            },
            {
                "nodeName": "div",
                "attrs": {
                    "class": "right-scroller"
                },
                "props": {
                    "id": "rightScroller"
                },
                "children": [
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "up button"
                        },
                        "props": {
                            "id": "upButton"
                        }
                    },
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "scrolltab"
                        },
                        "props": {
                            "id": "scrolltab"
                        }
                    },
                    {
                        "nodeName": "div",
                        "attrs": {
                            "class": "down button"
                        },
                        "props": {
                            "id": "downButton"
                        }
                    }
                ]
            }
        ]
    }
});