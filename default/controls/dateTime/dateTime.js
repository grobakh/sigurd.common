define('controls/dateTime/dateTime', ['core/view/component'],
    function (Component) {

        return Component.extend({
            setup: {
                template: "controls/label/label",
                value: undefined,
                //format : "Y-M-D h:m",
                format: "localDate",
                'today-text': undefined
            },

            initialize: function () {
                this.watch('value', this.update);
            },

            update: function () {
                var dateTime = Number(this.get('value'));
                var result = this.get('format');

                if (dateTime) {
                    var setup = new Date();
                    var now = new Date();

                    setup.setTime(dateTime);

                    var fullYear = setup.getFullYear();
                    var month = setup.getMonth() + 1;
                    var date = setup.getDate();
                    var hours = setup.getHours();
                    var minutes = setup.getMinutes();
                    var seconds = setup.getSeconds();

                    var zero = function (value) {
                        return (value < 10) ? "0" + value : "" + value;
                    };

                    var isToday = now.getFullYear() === fullYear &&
                        now.getMonth() + 1 === month &&
                        now.getDate() === date;

                    if (isToday && this.get('today-text')) {
                        result = this.get('today-text');
                    } else if (result === 'localDate') {
                        var options = {year: "numeric", month: "short", day: "numeric"};
                        result = setup.toLocaleDateString("ru-RU", options);
                    } else {
                        result = result.replace('Y', fullYear)
                            .replace('M', zero(month))
                            .replace('D', zero(date))
                            .replace('h', zero(hours))
                            .replace('m', zero(minutes))
                            .replace('s', zero(seconds));
                    }
                    this.place.pins.text.setText(result);
                }
            }

        });

    });

