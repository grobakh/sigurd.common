define('controls/imageUploader/imageUploader', {
    DialogModel: 'controls/popup/dialogModel',
    networkService: instance('core/services/networkService')
}, function (imported) {
    return imported.DialogModel.extend({
        initialize: function (settingsObject) {
            var self = this;

            imported.DialogModel.prototype.initialize.call(self, {
                doCommit: function () {
                    if (!self.noImage) {
                        self.processImage();
                    }
                    self.hideDialog();
                },

                doCancel: function () {
                    self.set('cropperReset', {});
                    self.hideDialog();
                },

                doSetResource: function (error, resourceId) {
                    self.setResource(error, resourceId);
                }
            });

            self.put('fixedRatio', true);

            self.successProcess = settingsObject.successProcess;

            return self;
        },

        showUploader: function (imageId, customData) {
            var self = this;
            self.customData = customData;
            self.set('originalImageId', imageId);
            self.noImage = imageId ? false : true;

            self.showDialog();
        },

        setResource: function (error, resourceId) {
            if (error === "ok") {
                var self = this;
                if (!self.get('isVisible')) {
                    self.showDialog();
                }
                self.set('originalImageId', resourceId);
                self.noImage = false;
            }
            else {
                var data = error;
                switch (error) {
                    case 'invalidType':
                        data = { errorCode: "errors.imageUploaderIncorrectType", error: error};
                        break;
                    case 'invalidSize':
                        data = { errorCode: "errors.imageUploaderInvalidSize", error: error};
                    break;
                    case 'incorrectFormat':
                        data = { errorCode: "errors.imageUploaderIncorrectFormat", error: error};
                        break;
                }

                if (future.onErrorHandler) {
                    future.onErrorHandler(data);
                }
            }
        },

        processImage: function () {
            var self = this;

            var processOptions = {
                imageId: self.get('originalImageId'),
                x: self.get('cropperLeft'),
                y: self.get('cropperTop'),
                width: self.get('cropperWidth'),
                height: self.get('cropperHeight')
            };

            future.when(imported.networkService.postObjectAsync("processImage", processOptions)).then(
                function (response) {
                    if (self.successProcess) {
                        self.successProcess(response.imageId, self.get('originalImageId'), self.customData);
                    }
                },
                function (e) {
                    if (e.error === "invalidImageSize") {
                        return { errorCode: "errors.imageUploaderInvalidSize", error: e.error};
                    }
                });
        }

    });
});