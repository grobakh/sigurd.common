define('controls/image/image', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/image/image",
                'no-image': "",
                'thumbnail-height': "",
                'thumbnail-width': "",
                'image-height': "",
                'image-width': "",
                'image-url': ''
            },

            initialize: function () {
                this.watch('image-url', this.update);
            },

            attachElements: function () {
                var self = this;
                if (self.get('image-width')) {
                    self.place.pins.box.setStyleNumber('width', self.get('image-width'));
                }
                if (self.get('image-height')) {
                    self.place.pins.box.setStyleNumber('height', self.get('image-height'));
                }
                self.place.pins.image.attach('load', function () {
                    self.place.trigger('resize');
                });
            },

            detachElements: function () {
                var self = this;
                self.place.detach('load');
            },

            update: function () {
                var self = this;

                var noImagePath = window.loader.buildPath(self.get('no-image'), 'png');
                var height = self.get('image-height') || self.get('thumbnail-height');
                var width = self.get('image-width') || self.get('thumbnail-width');
                var request = noImagePath;

                var imageUrl = self.get('image-url');
                if (imageUrl) {
                    var size = "";

                    if (width && height) {
                        size = "&width=" + width + '&' + 'height=' + height;
                    }

                    request = self.get('image-url') + size;
                }

                self.place.pins.image.setAttribute('src', request);
                self.trigger('resize');
            }
        });
    });
