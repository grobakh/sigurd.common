define('controls/previewWindow/previewWindow', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/previewWindow/previewWindow",
                'zoom': 1,
                'crop-left': 0,
                'crop-top': 0,
                'image-id': "",
                serverPath: '/inn/file/image?id=',
                'no-image': ""
            },

            initialize: function () {
                var self = this;
                self.watch('image-id', self.onNewImage);
                self.watch('expected-height', self.position);
                self.watch('expected-width', self.position);
                self.watch('crop-left', self.position);
                self.watch('crop-top', self.position);
                self.watch('crop-height', self.position);
                self.watch('crop-width', self.position);
                self.watch('zoom', self.position);
            },

            attachElements: function () {
                var self = this;
                var image = self.place.pins.image;
                image.detach('load');
                image.attach('load', function () {
                    self.onImageLoad();
                });
            },

            onNewImage: function () {
                var self = this;
                var image = self.place.pins.image;
                image.hide();
                image.setStyle('width', '100%');
                image.setStyle('height', '100%');

                var imageId = self.get('image-id');
                if (imageId) {
                    image.setAttribute('src', self.get('serverPath') + imageId);
                }
                else {
                    image.setAttribute('src', '');
                }
            },

            onImageLoad: function () {
                var self = this;
                var image = self.place.pins.image;
                var imageElement = image.getElement();

                self.imageWidth = parseInt(imageElement.naturalWidth, 10);
                self.imageHeight = parseInt(imageElement.naturalHeight, 10);

                self.position();

                image.show('block');
            },

            position: function () {
                var self = this;
                var image = self.place.pins.image;
                var zoom = self.get('zoom') ? parseFloat(self.get('zoom')) : 1;
                var imageWidth = (self.imageWidth || 0) * zoom;
                var imageHeight = (self.imageHeight || 0) * zoom;
                var left = (self.get('crop-left') || 0) * zoom;
                var top = (self.get('crop-top') || 0) * zoom;
                var height = (self.get('crop-height') || 0) * zoom;
                var width = (self.get('crop-width') || 0) * zoom;

                image.setStyleNumber('width', imageWidth);
                image.setStyleNumber('height', imageHeight);
                image.setStyleNumber('left', -left);
                image.setStyleNumber('top', -top);
                self.place.setStyleNumber('height', height);
                self.place.setStyleNumber('width', width);
            }
        });
    });