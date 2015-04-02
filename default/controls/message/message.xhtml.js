define("controls/message/message.xhtml", {}, function () {
    return {
        "templateCss": "controls_message_message",
        "children": [
            {
                "nodeName": "div",
                "attrs": {
                    "class": "message"
                },
                "props": {
                    "id": "content"
                }
            }
        ]
    }
});