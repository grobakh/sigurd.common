define('controls/url/url', {
    component: 'core/view/component',
    navigationService: instance('core/services/navigationService')
}, function (imported) {
    var _isDblClick = false;

    return imported.component.extend({
        setup: {
            template: "controls/url/url",
            text: "",
            tooltip: "",
            'double-command': undefined,
            'focus-event': undefined,
            'new-window': false
        },

        initialize: function () {
            this.watch('text', this.update);
            this.watch('tooltip', this.update);
            this.watch('url', this.update);
            this.watch('target', this.update);
            this.watch('focus-event', this.focus);
        },

        attachElements: function () {
            var self = this;
            if (self.get('double-command')) {
                self.place.pins.content.attach('click', self.singleClickHandler, self);
                self.place.pins.content.attach('dblclick', self.dblClickHandler, self);
            }
        },

        singleClickHandler: function (e) {
            if (e.button !== 0) {
                return;
            }
            var self = this;
            e.preventDefault();
            _isDblClick = false;
            _.delay(function () {
                if (_isDblClick) {
                    return;
                }
                var targetUrl = self.get('target');
                imported.navigationService.routeTo(targetUrl);
            }, 200);  //TODO Dirty hack. Not sure how to handle double click for anchor
        },

        dblClickHandler: function (e) {
            _isDblClick = true;
            var command = this.get('double-command');
            if (command && command.exec) {
                command.exec();
                e.preventDefault();
                e.stopPropagation();
            }
        },

        update: function () {
            var self = this;

            if (self.get('text')) {
                self.place.pins.content.setText(self.get('text'));
            }

            if (self.get('tooltip')) {
                self.place.setAttribute('title', self.get('tooltip'));
            } else {
                self.place.removeAttribute('title');
            }

            if (self.get('url') || self.get('target')) {
                var link = _.toString(self.get('url'));
                if (self.get('target')) {
                    link += '#' + _.toString(self.get('target'));
                }
                if (self.get('isRelative')) {
                    link = loader.combinePath(window.location.href, link);
                }
                self.place.pins.content.setAttribute('href', link);
            } else {
                self.place.pins.content.removeAttribute('href');
            }

            if (self.get('new-window')) {
                self.place.pins.content.setAttribute('target', '_blank');
            }
        },

        focus: function () {
            var self = this;
            if (self.place.pins.content) {
                if (this.place.pins.content) {
                    this.place.pins.content.setFocus();
                }
            }
        }

    });
});
