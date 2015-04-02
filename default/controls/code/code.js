define('controls/code/code', ['core/view/component', '/client/common/libs/codemirror/codemirror.js'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/code/code",
                text: '',
                errors: undefined,
                cursor: undefined,
                'save-command': undefined
            },

            initialize: function () {
                var self = this;
                self.previousErrors = [];
                self.cursor = {
                    x: 0,
                    y: 0,
                    yBot: 0
                };
            },

            attachElements: function () {
                var self = this;

                if (!self.codeMirror) {
                    var area = self.place.pins.codeTextArea.getElement();

                    var options = { // описание настроек - http://codemirror.net/doc/manual.html
                        mode: 'seid',
                        tabSize: 2,
                        autoClearEmptyLines: true,
                        lineNumbers: true,
                        matchBrackets: true,
                        gutter: true,
                        autofocus: true,
                        autoCloseBrackets: true,
                        cursorHeight: 1.2,
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

                        extraKeys: {
                            "Ctrl-Q": function (cm) {
                                cm.foldCode(cm.getCursor());
                            },
                            "Ctrl-Space": function (cm) {
                                CodeMirror.showHint(cm, CodeMirror.hint.xml);
                            },
                            "Ctrl-S": function () {
                                self.commit();
                                if (self.get('save-command')) {
                                    self.get('save-command').exec();
                                }
                            },
                            "Tab": function (cm) {
                                cm.execCommand("indentAuto");

                                if ((/^\s*$/).test(cm.getLine(cm.getCursor().line))) {
                                    cm.execCommand("goLineEnd");
                                }
                            }
                        }
                    };

                    self.codeMirror = CodeMirror.fromTextArea(area, options);
                    self.codeMirror.on("change", _.debounce(function () {
                        self.commit();
                    }, 25));
                }

                _.defer(function () {
                    self.updateText();
                    self.updateErrors();
                });

                self.watch("text", self.updateText);
                self.watch("cursor", self.onCursorChange);
                self.watch("errors", self.updateErrors);
            },

            updateText: function () {
                if (!(this.codeMirror && !this.isCommit)) {
                    return;
                }

                this.codeMirror.setValue(this.get('text'));
            },

            commit: function () {
                var self = this;
                self.isCommit = true;
                self.set("text", self.codeMirror.getValue(), false, true);
                self.isCommit = false;
            },

            reset: function () {
                //TODO reset
            },

            focus: function () {
                this.place.pins.codeTextArea.setFocus();
            },

            onCursorChange: function (ob, newValue) {
                if (!_.isUndefined(newValue)) {
                    this.codeMirror.setCursor(newValue.line, newValue.position);
                    this.codeMirror.focus();
                }
            },

            updateErrors: function () {
                if (!(this.codeMirror && !this.isCommit)) {
                    return;
                }

                var self = this;
                var index;

                for (index = self.previousErrors.length; index--;) {
                    this.codeMirror.removeLineClass(self.previousErrors[index], 'background', 'cm-incorrect');
                }

                self.previousErrors = [];

                var errors = _.uniq(self.get('errors'));

                if (errors) {
                    for (index = errors.length; index--;) {
                        self.previousErrors.push(self.codeMirror.addLineClass(errors[index],
                            'background', 'cm-incorrect'));
                    }
                }
            }
        });
    });
