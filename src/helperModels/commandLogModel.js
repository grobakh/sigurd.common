define('src/helperModels/commandLogModel', {
    Model: 'core/model',
    Collection: 'core/collection',
    navigationService: instance('core/services/navigationService'),
    appConfig: instance('appConfig'),
    lexemesService: instance('core/services/lexemesService')

}, function (imported) {
    return imported.Model.extend({
        constructor: function (commandLogJson) {
            var self = this;
            self.constructor.__super__.constructor.call(self);
            var recordCollection = new imported.Collection();
            if (commandLogJson && commandLogJson.data) {
                _.each(commandLogJson.data, function (record) {
                    var recordModel = new imported.Model();

                    recordModel.put('type', record.type);
                    recordModel.put('isError', record.error);
                    recordModel.put('name', record.name);
                    recordModel.put('id', record.id);

                    var targetMessage = imported.lexemesService.getToken('commandLogTarget', record.type);
                    recordModel.put('targetMessage', targetMessage);
                    recordModel.put('targetName', '"' + (record.name || record.id) + '"');

                    if (record.reason) {
                        recordModel.put('reasonName', '"' + record.reason + '"');
                    }

                    self.extendMessages(recordModel);
                    self.createUrlsForRecord(recordModel);
                    recordCollection.add(recordModel);
                });
            }
            self.put('recordCollection', recordCollection);
        },

        extendMessages: function (recordModel) {
            switch (recordModel.get('type')) {
                case 'specificationChange':
                case 'specificationCreate':
                    recordModel.put('targetName',  '"' +  recordModel.get('name') + '"' + ". Код: " + recordModel.get('id')); //todo HACK непонятно что приходит в name (всегда "item"), в reason реальное имя
                    break;
            }
        },

        createUrlsForRecord: function (recordModel) {
            var self = this;
            var targetUrl;
            var id = recordModel.get('id'); //anything can be here
            if (!id) {
                return;
            }

            switch (recordModel.get('type')) {
                case 'aspectCantShrinkChoices':
                case 'specCantUnselectMultichoice':
                case 'specCantRemoveProperty':
                    targetUrl = imported.appConfig.host + '/item?key=' + id;
                    break;

                case 'aspectAlreadyInUse':
                    targetUrl = loader.combinePath(imported.appConfig.host, 'formEditor') + '#' + loader.combinePath('edit', 'serviceInfo', id);
            }
            recordModel.put('targetUrl', targetUrl);

        }

    }, {
        from: function (commandLogJson) {
            var self = this;
            var commandLogModel = new self.prototype.constructor(commandLogJson);
            return commandLogModel;
        }
    })
});