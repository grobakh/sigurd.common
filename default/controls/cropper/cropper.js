define('controls/cropper/cropper', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/cropper/cropper",
                'cropper-left': 0,
                'cropper-right': 0,
                'cropper-bottom': 0,
                'cropper-top': 0,
                'result-left': 0,
                'result-top': 0,
                'result-width': 0,
                'result-height': 0,
                'expected-width': undefined,
                'expected-height': undefined,
                'reset-event': undefined,
                'image-id': "",
                serverPath: '/inn/file/image?id=',
                'no-image': "",
                'lock-ratio': undefined,
                maxWidth: 480,
                maxHeight: 480,
                'preview-zoom': 1
            },

            initialize: function () {
                var self = this;
                self.dragState = false;
                self.dragTop = undefined;
                self.dragBottom = undefined;
                self.dragLeft = undefined;
                self.dragRight = undefined;
                self.controlWidth = 0; //10 пикселей и 2 на рамку
                self.limit = 12; // удвоенная ширина полей для тягания плюс минимальный размер изображения
            },

            attachElements: function () {
                var self = this;
                // TODO remove in future
                //this.$el = $(this.place.getElement());

                var image = self.place.pins.image;
                var blocker = self.place.pins.blocker;
                var cropper = self.place.pins.cropper;

                //this.cover.attach('mousedown', '.dragfield, .frame', function() { self.onStartDrag(); });
                cropper.attach('mousedown', function (event) {
                    self.onStartDrag(event);
                });

                blocker.attach('mouseout', function (event) {
                    self.stopDrag(event);
                });

                blocker.attach('mouseup', function (event) {
                    self.stopDrag(event);
                });

                image.detach('load');
                image.attach('load', function () {
                    self.onImageLoad();
                });
                //self.set('expected-height', self.get('expected-height'));

                self.watch('image-id', self.onNewImage);
                self.watch('expected-height', self.findRatio);
                self.watch('expected-width', self.findRatio);
                self.watch('lock-ratio', self.findRatio);

                self.watch('reset-event', self.onNewImage);
            },

            update: function () {
            },

            //measure : function () {
            //Nothing here
            //},

            onNewImage: function () {
                var self = this;
                var image = self.place.pins.image;
                image.hide();
                image.setStyle('width', '100%');
                image.setStyle('height', '100%');

                self.set('result-height');
                self.set('result-width');
                self.set('result-left');
                self.set('result-top');

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
                var cover = self.place.pins.cover;
                var image = self.place.pins.image;
                var imageElement = image.getElement();
                var frame = self.place.pins.frame;
                self.imageWidth = parseInt(imageElement.naturalWidth, 10);
                self.imageHeight = parseInt(imageElement.naturalHeight, 10);
                self.sizeFactor = 1;

                while (self.imageWidth / self.sizeFactor > self.get('maxWidth') ||
                    self.imageHeight / self.sizeFactor > self.get('maxHeight')) {
                    self.sizeFactor++;
                }

                self.width = parseInt(self.imageWidth / self.sizeFactor, 10);
                self.height = parseInt(self.imageHeight / self.sizeFactor, 10);
                image.setStyleNumber('height', self.height);
                image.setStyleNumber('width', self.width);
                frame.setStyleNumber('height', self.height);
                frame.setStyleNumber('width', self.width);
                self.set('cropper-left', 0);
                self.set('cropper-right', 0);
                self.set('cropper-top', 0);
                self.set('cropper-bottom', 0);
                self.set('result-height', self.imageHeight);
                self.set('result-width', self.imageWidth);
                self.set('result-left', 0);
                self.set('result-top', 0);
                image.show('block');

                cover.show('block');
                self.findRatio();
                if (self.ratio) {
                    self.forceRatio();
                }
                self.place.trigger('resize');
                self.setOutput();
            },

            clip: function (variable, lowLimit, highLimit) {
                if (variable < lowLimit) {
                    return lowLimit;
                }
                if (variable > highLimit) {
                    return highLimit;
                }
                return variable;
            },

            findRatio: function () {
                var self = this;
                if (self.get('lock-ratio') && self.get('expected-height') && self.get('expected-width')) {
                    self.ratio = self.get('expected-height') / self.get('expected-width');
                    self.forceRatio();
                }
                else {
                    self.ratio = undefined;
                }
            },

            forceRatio: function () {
                var self = this;
                var shrink;
                var width = self.width - self.get('cropper-left') - self.get('cropper-right');
                var height = self.height - self.get('cropper-top') - self.get('cropper-bottom');
                if (height < width * self.ratio) {
                    shrink = (width - height / self.ratio) >> 1;
                    self.set('cropper-left', self.get('cropper-left') + shrink);
                    self.set('cropper-right', self.get('cropper-right') + shrink);
                }
                else {
                    shrink = (height - width * self.ratio) >> 1;
                    self.set('cropper-top', self.get('cropper-top') + shrink);
                    self.set('cropper-bottom', self.get('cropper-bottom') + shrink);
                }
                self.setOutput();
            },

            /* Эта функция нужна, чтобы понять, как действует следующая
             resizeTopLeft : function(event) {
             event.stopPropagation();
             var self = this;
             var right = self.width - self.get('cropper-right');
             var bottom = self.height - self.get('cropper-bottom');
             var supposedLeft = self.clip(event.pageX - self.dragLeft, 0, right - self.limit);
             var supposedTop = self.clip(event.pageY - self.dragTop, 0, bottom - self.limit);

             if (self.ratio) {
             var supposedHeight = bottom - supposedTop;
             var supposedWidth = right - supposedLeft;
             if (supposedHeight <= supposedWidth * self.ratio) {
             supposedTop = bottom - (supposedWidth * self.ratio);
             if (supposedTop < 0) {
             supposedTop = 0;
             supposedHeight = bottom;
             supposedLeft = right - (supposedHeight / self.ratio);
             }
             }
             else
             {
             supposedLeft = right - (supposedHeight / self.ratio);
             if (supposedLeft < 0) {
             supposedLeft = 0;
             supposedWidth = right;
             supposedTop = bottom - (supposedWidth * self.ratio);
             }
             }
             }

             self.set('cropper-left', supposedLeft);
             self.set('cropper-top', supposedTop);
             },
             */

            resize: function (event, settings) {
                event.stopPropagation();
                event.preventDefault();
                var self = this;
                if ((event.pageX < 0) || (event.pageX > document.body.clientWidth) ||
                    (event.pageY < 0) || (event.pageY > document.body.clientHeight)) {
                    self.stopDrag(event);
                    return;
                }
                var supposedHorizontal = self.clip(settings.moveX * (event.pageX - settings.dragX), 0,
                    settings.horizontalOpposite - self.limit);
                var supposedVertical = self.clip(settings.moveY * (event.pageY - settings.dragY), 0,
                    settings.verticalOpposite - self.limit);

                if (self.ratio) {
                    var supposedHeight = settings.verticalOpposite - supposedVertical;
                    var supposedWidth = settings.horizontalOpposite - supposedHorizontal;
                    if (supposedHeight <= supposedWidth * self.ratio) {
                        supposedVertical = settings.verticalOpposite - (supposedWidth * self.ratio);
                        if (supposedVertical < 0) {
                            supposedVertical = 0;
                            supposedHeight = settings.verticalOpposite;
                            supposedHorizontal = settings.horizontalOpposite - (supposedHeight / self.ratio);
                        }
                    }
                    else {
                        supposedHorizontal = settings.horizontalOpposite - (supposedHeight / self.ratio);
                        if (supposedHorizontal < 0) {
                            supposedHorizontal = 0;
                            supposedWidth = settings.horizontalOpposite;
                            supposedVertical = settings.verticalOpposite - (supposedWidth * self.ratio);
                        }
                    }
                }

                self.set(settings.targetX, supposedHorizontal);
                self.set(settings.targetY, supposedVertical);
            },

            move: function (event, settings) {
                var self = this;
                if ((event.pageX < 0) || (event.pageX > document.body.clientWidth) ||
                    (event.pageY < 0) || (event.pageY > document.body.clientHeight)) {
                    self.stopDrag(event);
                    return;
                }
                var supposedLeft = self.clip(event.pageX - settings.dragX, 0, self.width - settings.width);
                var supposedTop = self.clip(event.pageY - settings.dragY, 0, self.height - settings.height);
                var supposedRight = self.clip(self.width - settings.width - event.pageX + settings.dragX, 0,
                    self.width - settings.width);
                var supposedBottom = self.clip(self.height - settings.height - event.pageY + settings.dragY, 0,
                    self.height - settings.height);

                self.set('cropper-left', supposedLeft);
                self.set('cropper-right', supposedRight);
                self.set('cropper-bottom', supposedBottom);
                self.set('cropper-top', supposedTop);
            },

            stopDrag: function (event) {
                var self = this;
                var frame = self.place.pins.frame;
                if (this.dragState) {
                    var self = this;
                    //this.detach('mousemove.' + this.cid);
                    frame.detach('mousemove');

                    self.dragState = false;
                    self.dragX = undefined;

                    self.setOutput();

                    self.place.pins.blocker.removeClass('blockerActive');

                    event.stopPropagation();
                }
            },

            setOutput: function () {
                var self = this;
                var cover = self.place.pins.cover;
                var left = self.get('cropper-left');
                var right = self.get('cropper-right');
                var bottom = self.get('cropper-bottom');
                var top = self.get('cropper-top');
                var width = cover.getElement().clientWidth;
                var height = cover.getElement().clientHeight;

                self.set('result-height', Math.round((height - top - bottom) * self.sizeFactor));
                self.set('result-width', Math.round((width - left - right) * self.sizeFactor));
                self.set('result-left', Math.round(left * self.sizeFactor));
                self.set('result-top', Math.round(top * self.sizeFactor));

                if (width === 0 || height === 0) {
                    self.set('preview-zoom', 1);
                } else {
                    self.set('preview-zoom', Math.min(self.get('expected-height') / (height - top - bottom),
                        self.get('expected-width') / (width - left - right)) / self.sizeFactor);
                }
            },

            clearSelection: function () {
                //TODO Max Вынести в хелпер?
                if (window.getSelection) {
                    if (window.getSelection().empty) {  // Chrome
                        window.getSelection().empty();
                    } else if (window.getSelection().removeAllRanges) {  // Firefox
                        window.getSelection().removeAllRanges();
                    }
                } else if (document.selection) {  // IE?
                    document.selection.empty();
                }
            },

            onStartDrag: function (event) {
                var self = this;
                var cropper = self.place.pins.cropper;
                var cover = self.place.pins.cover;
                var frame = self.place.pins.frame;
                event.stopPropagation();
                event.preventDefault();
                var settings = {};
                var target = cover.find(function (template) {
                    return template.getElement() === event.target;
                });
                self.dragState = true;
                if (target === cropper) {
                    settings.dragX = event.pageX - self.get('cropper-left');
                    settings.dragY = event.pageY - self.get('cropper-top');
                    settings.width = self.width - self.get('cropper-left') - self.get('cropper-right');
                    settings.height = self.height - self.get('cropper-top') - self.get('cropper-bottom');
                    frame.attach('mousemove', function (event) {
                        self.move(event, settings);
                    });
                }
                else {
                    if (target.hasClass('left')) {
                        settings.horizontalOpposite = self.width - self.get('cropper-right');
                        settings.dragX = event.pageX - self.get('cropper-left');
                        settings.targetX = 'cropper-left';
                        settings.moveX = 1;
                    }
                    else if (target.hasClass('right')) {
                        settings.horizontalOpposite = self.width - self.get('cropper-left');
                        settings.dragX = event.pageX + self.get('cropper-right');
                        settings.targetX = 'cropper-right';
                        settings.moveX = -1;
                    }
                    if (target.hasClass('top')) {
                        settings.verticalOpposite = self.height - self.get('cropper-bottom');
                        settings.dragY = event.pageY - self.get('cropper-top');
                        settings.targetY = 'cropper-top';
                        settings.moveY = 1;
                    }
                    else {
                        settings.verticalOpposite = self.height - self.get('cropper-top');
                        settings.dragY = event.pageY + self.get('cropper-bottom');
                        settings.targetY = 'cropper-bottom';
                        settings.moveY = -1;
                    }
                    frame.attach('mousemove', function (event) {
                        self.resize(event, settings);
                    });
                }


                self.place.pins.blocker.addClass('blockerActive');

                //self.attach('mousemove.' + self.cid, function (event) {

            }
        });
    });
