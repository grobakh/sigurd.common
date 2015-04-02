define("controls/comboBox/optionButton.xhtml", {}, function () {
    return {
        "templateCss": "controls_comboBox_optionButton",
        "children": [
            {
                "nodeName": "button",
                "attrs": {
                    "class": "link",
                    "type": "button",
                    "tabindex": "-1"
                },
                "props": {
                    "id": "buttonText"
                }
            }
        ]
    }
});