define('controls/photoGallery/photoGallery', {
        Collection: 'core/collection',
        Model: 'core/model',
        Component: 'core/view/component'
    },
    function (imported) {
        return imported.Component.extend({
            setup: {
                template: "controls/photoGallery/photoGallery",
                source: undefined,
                'upload-command': undefined,
                'select-command': undefined,
                'multiple-upload': false
            },

            initialize: function () {
            }
        });
    }
);