define('controls/drag/drag', {
    Component: 'core/view/component',
    resourceService: instance('core/services/resourceService')
}, function (imported) {

    return imported.Component.extend({
        setup: {
            template: null,
            canDrag: "true",
            canAccept: "false",
            dragData: undefined,
            onAccept: undefined,
            onDragOver: undefined,
            onDragLeave: undefined
        },

        initialize: function () {
            var self = this;
            self.watch('canDrag', self.update);
        },

        update: function () {
            var self = this;
            if (self.get('canDrag')) {
                self.place.setAttribute('draggable', "true");
            } else {
                self.place.removeAttribute('draggable');
            }
        },

        attachElements: function () {
            var self = this;
            self.update();

            self.place.attach('dragstart', function (event) {
                event.dataTransfer.setData('firefoxHack', 'firefox requires some data on this event to allow drag');

                imported.resourceService.set('dragType', "component");
                imported.resourceService.set('dragData', self.get('dragData'));
            });


            self.place.attach('drop', function (event) {
                if (!self.get('canAccept')) {
                    return;
                }
                self.place.trigger('dragleave');
                self.get('onAccept').exec(imported.resourceService.get('dragData'));
                imported.resourceService.set('dragData');
                imported.resourceService.set('dragType');
                event.stopPropagation();
                event.preventDefault();
                return false;
            });

            self.place.attach('dragover', function (event) {
                if (!self.get('canAccept') || !self.get('onDragOver') || imported.resourceService.get('dragType') !== "component") {
                    return;
                }
                self.get('onDragOver').exec(imported.resourceService.get('dragData'));
                event.preventDefault();
            });

            self.place.attach('dragleave', function (event) {
                if (!self.get('canAccept') || !self.get('onDragLeave')) {
                    return;
                }
                self.get('onDragLeave').exec(imported.resourceService.get('dragData'));
            });
        }

    });
});
