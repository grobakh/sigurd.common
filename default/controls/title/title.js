define('controls/title/title', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: null,
                lexeme: undefined,
                token: undefined,
                prefix: "",
                suffix: "",
                'default': "Goodwix"
            },

            initialize: function () {
                var self = this;

                self.watch("lexeme", self.update);
                self.watch("token", self.update);
                self.watch("prefix", self.update);
                self.watch("suffix", self.update);

            },

            attachElements: function() {
            },


            update: function () {
                var title="";
                if (this.get('lexeme')) {
                    title += this.get('prefix') || "";
                    title +=  this.get('lexeme')[this.get('token')] || "";
                    title += this.get('suffix') || "";
                    window.document.title = title || this.get('default');
                }
                else {
                    window.document.title = this.get('default');
                }
            }

        });
    });
