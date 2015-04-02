define('controls/switch/switch', ['core/view/component', 'core/view/template'],
    function (Component, Template) {

        return Component.extend({
            setup: {
                template : null,
                value : undefined
            },

            initialize:function () {
                this.watch('value', this.renderAsync);
            },

            selectFragment : function () {
                if (!this.get('content-fragment')) {
                    return null;
                }

                var blocks = this.get('content-fragment');
                var value = this.get('value');
                var selectedBlock;

                if(!_.isUndefined(value)) {
                    selectedBlock = blocks.findInChildren(function (block) {
                        return block.props['switch-value'] === _.toString(value); //TODO debug VM
                    });
                }

                if(!selectedBlock) {
                    selectedBlock = blocks.findInChildren(function (block) {
                        return block.props['switch-default'] === 'true' ||
                            block.props['switch-default'] === 'undefined';
                    });

                    // Positive default value logic
                    if (value) {
                        var selectedBlockAny = blocks.findInChildren(function (block) {
                            return block.props['switch-default'] === 'any';
                        });

                        if (selectedBlockAny) {
                            selectedBlock = selectedBlockAny;
                        }
                    }
                    /*if(selectedBlock)
                    {
                        this.put('value', selectedBlock.props['switch-value']);
                    }*/
                }

                if (!selectedBlock) {
                    return null;
                }

                return new Template("", [ selectedBlock.clone() ]);
            },

            pasteContent: function () {
                var self = this;
                var selectedTemplate = this.selectFragment();
                var presenter = self.place.pins.content || self.place;
                presenter.setFragment(selectedTemplate);
            }
        });
    });
