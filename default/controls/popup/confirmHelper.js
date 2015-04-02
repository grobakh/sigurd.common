define('controls/popup/confirmHelper', {
    DialogModel: 'controls/popup/dialogModel',
    resourceService: instance('core/services/resourceService')
}, function (imported) {
    return {

        initialize: function () {
            var self = this;

            if(!imported.resourceService.get('confirmDialog')) {
                self.confirmDialog = new imported.DialogModel().initialize({
                        doCommit: function () {
                            self.confirmDialog.hideDialog();
                            if (self.onCommit) {
                                self.onCommit();
                            }
                        }, doCancel: function () {
                            self.confirmDialog.hideDialog();
                            if (self.onCancel) {
                                self.onCancel();
                            }
                        }}
                );

                imported.resourceService.set('confirmDialog', self.confirmDialog);
            }
            else {
                self.confirmDialog = imported.resourceService.get('confirmDialog');
            }
        },

        showConfirmDialog: function (entity, commitMethod, rejectMethod, preCheck) {
            if (preCheck && !preCheck()) {
                return;
            }

            var self = this;
            self.entity = entity;

            if(commitMethod) {
                self.onCommit = function() {
                    commitMethod.call(entity);
                };
            }
            if(rejectMethod) {
                self.onCancel =  function() {
                    rejectMethod.call(entity);
                };
            }

            self.initialize();

            self.confirmDialog.showDialog();
        }
    };
});