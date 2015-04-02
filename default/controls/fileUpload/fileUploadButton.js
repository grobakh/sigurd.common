define('controls/fileUpload/fileUploadButton', ['core/view/component'],
    function (Component) {

        var maxFileSize = 100000000;

        return Component.extend({
            setup: {
                template: "controls/fileUpload/fileUploadButton",
                type: "AnyType",
                text: "",
                multiple: false,
                fileName: "",
                command: undefined,
                'upload-url': undefined
            },

            initialize: function () {
                this.watch('multiple', this.updateMultiple);
            },

            getFileInputAcceptType: function (type) {
                switch (type) {
                    case "Image" :
                        return "image/*";
                    case "MSExcel":
                        return "application/vnd.ms-excel";
                    case "JSON" :
                        return "application/json";
                    default:
                        return "*";
                }
            },

            attachElements: function () {
                var self = this;
                var form = self.place.pins.formInput;
                var fileInput = self.place.pins.fileInput;
                var acceptTypeInput = self.place.pins.acceptTypeInput;
                var type = self.get('type');

                acceptTypeInput.setAttribute('value', type);
                fileInput.setAttribute('accept', self.getFileInputAcceptType(type));

                var frameClearing = function () {
                    var frame = document.getElementById('uploadFrame');
                    frame.removeEventListener('load', self.onLoad);
                    fileInput.setValue(); // anti-cache
                };

                if (!self.get('upload-url')) {
                    throw new Error("upload url should be specified for fileUploadButton");
                }

                form.setAttribute('action', loader.combinePath(appConfig.host, self.get('upload-url')));

                fileInput.attach('change', function (e) {
                    var frame = document.getElementById('uploadFrame');
                    frame.addEventListener('load', self.onLoad);

                    var fullPath = fileInput.element.value;
                    if (fullPath) {
                        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                        var fileName = fullPath.substring(startIndex);
                        if (fileName.indexOf('\\') === 0 || fileName.indexOf('/') === 0) {
                            fileName = fileName.substring(1);
                        }
                        self.set('fileName', fileName);
                    }


                    if (e && e.target && e.target.files && e.target.files[0] && e.target.files[0].size) {
                        if (e.target.files[0].size > maxFileSize) {
                            frameClearing();
                            self.get('command').exec('invalidSize');
                            return false;
                        }
                    }

                    form.getElement().submit();
                }, self);

                self.onLoad = function () {
                    var frame = document.getElementById('uploadFrame');
                    frameClearing();

                    var result = _.parseJSON(frame.contentDocument.body.firstChild.innerHTML);
                    if (result === null) {

                        var code = parseInt(frame.contentDocument.head.firstChild.innerHTML, 10);
                        result = {};

                        if (code === 413) {
                            result.error = "invalidSize";
                        }
                        else {
                            result.error = "unknownError";
                        }
                    }

                    result.resourceIds = result.resourceIds || [];

                    if (self.get('command')) {
                        if (self.get('multiple')) {
                            self.get('command').exec(result.error, result.resourceIds), self.get('fileName');
                        }
                        else {
                            self.get('command').exec(result.error, result.resourceIds[0], self.get('fileName'));
                        }
                    }
                };

                //todo dhilt : think about tabindex generalization
                if (self.get('noTabindex')) {
                    fileInput.setAttribute('tabindex', '-1');
                }
                self.updateMultiple();
            },

            updateMultiple: function () {
                var self = this;
                var fileInput = self.place.pins.fileInput;
                var isMultiple = self.get('multiple');
                if (isMultiple) {
                    fileInput.setAttribute('multiple');
                }
                else {
                    fileInput.removeAttribute('multiple');
                }
            },

            detachElements: function () {
                var self = this;

                var input = self.place.pins.fileInput;

                if (input) {
                    input.detach('change');
                }

                var frame = document.getElementById('uploadFrame');
                if (frame) {
                    frame.removeEventListener('load', self.onLoad);
                }
            }
        });
    });
