$.ajax({
    url: "/dash/categoryGraphData"
    , success: function (result) {
        var categoriesForChart = result;
        //alert(result);
        var categoriesLabel = [];
        var categoriesFrequency = [];
        $.each(categoriesForChart, function (key, value) {
            categoriesLabel.push(key);
            categoriesFrequency.push(value);
        });
        var data = {
            labels: categoriesLabel
            , series: categoriesFrequency
        };
        var options = {
            labelInterpolationFnc: function (value) {
                return value[0]
            }
        };
        var responsiveOptions = [
  ['screen and (min-width: 640px)', {
                chartPadding: 30
                , labelOffset: 100
                , labelDirection: 'explode'
                , labelInterpolationFnc: function (value) {
                    return value;
                }
  }]
  , ['screen and (min-width: 1024px)', {
                labelOffset: 80
                , chartPadding: 20
  }]
];
        new Chartist.Pie('.drawCategoriesChart', data, options, responsiveOptions);
    }
});
/*var categoriesForChart = {
    "ToothPaste": 18
    , "Condoms": 108
    , "Stationary": 205
};*/
//Item charts
var itemsForChart = {
    "colgate": 18
    , "manforce": 108
};
/*//Ajax here
var itemLabel = [];
var itemFrequency = [];
$.each(itemsForChart, function (key, value) {
    itemLabel.push(key);
    itemFrequency.push(value);
});
alert(itemLabel);
var data2 = {
    labels: itemLabel
    , series: itemFrequency
};
var options2 = {
    labelInterpolationFnc: function (value) {
        return value[0]
    }
};
var responsiveOptions2 = [
  ['screen and (min-width: 640px)', {
        chartPadding: 30
        , labelOffset: 100
        , labelDirection: 'explode'
        , labelInterpolationFnc: function (value) {
            return value;
        }
  }]
  , ['screen and (min-width: 1024px)', {
        labelOffset: 80
        , chartPadding: 20
  }]
];
new Chartist.Pie('.drawItemChart', data2, options2, responsiveOptions2);*/