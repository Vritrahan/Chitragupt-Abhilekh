(function () {
    $("#viewRestock").click(function () {
        $.ajax({
            url: "/dash/getDataForRestockTable"
            , success: function (result) {
                console.log(result.data);
                var collection = result.data;
                var index = 0;
                $(".removableRestockRow").remove();
                for (var i = 0; i < collection.length; i++) {
                    var value = collection[i];
                    $("<tr class='removableRestockRow'><td>" + (++index) + "</td><td>" + value.item + "</td><td>" + value.category + "</td>" + value.stock + "</td><td>" + value.price + "</td></tr>").insertAfter("#restockHeader");
                };
            }
        });
        $.ajax({
            url: "/dash/getAllData"
            , success: function (result) {
                var collection = result;
                var index = 0;
                $.each(collection, function (key, value) {
                    $("#restock-category").append("<option class='removabledatafield' value='" + key + "'>" + key + "</option>");
                });
                $("#restock-category").change(function () {
                    var category = $("#restock-category").find(":selected").text();
                    alert(category);
                    $("#item-category").html("");
                    var arr = collection[category];
                    for (var i = 0; i < collection[category].length; i++) {
                        var value = arr[i];
                        $("#item-category").append("<option class='removabledatafield' value='" + value.item + "'>" + value.item + "</option>");
                    }
                });
            }
        });
    });
    $("#restockButton").click(function () {
        var itemName = $("#restock-item").find(":selected").text();
        var categoryName = $("#restock-category").find(":selected").text();
        var quantity = $("#restock-quantity").val();
        var restockedItem = {
            item: itemName
            , category: categoryName
            , quantity: quantity
        };
        $.ajax({
            url: "/dash/restockItems"
            , data: restockedItem
            , success: function (result) {
                vex.dialog.alert("Item restocked successfully");
                $("#restockForm").trigger("reset");
            }
        });
    });
    $("#viewNotification").click(function () {
        $.ajax({
            url: "/dash/outofstockitems"
            , success: function (result) {
                var collection = result.data;
                var index = 0;
                $(".removableNotificationOutOfStockRow").remove();
                for(var i = 0; i < collection.length; i++) {
                    var value = collection[i]; 
                    $("<tr class='removableNotificationOutOfStockRow'><td>" + (++index) + "</td><td>" + value.item + "</td><td>" + value.category + "</td></tr>").insertAfter("#outOfStockTableHeader");
                }
            }
        });
        $.ajax({
            url: "/dash/lowstockitems"
            , success: function (result) {
                var collection = result.data;
                var index = 0;
                $(".removableNotificationLowQuantityRow").remove();
                for(var i = 0; i < collection.length; i++) {
                    var value = collection[i];
                    $("<tr class='removableNotificationOutOfStockRow'><td>" + (++index) + "</td><td>" + value.item + "</td><td>" + value.category + "</td><td>" + value.stock + "</td></tr>").insertAfter("#minimumquantityTableHeader");
                }
            }
        });
    });
    $("#viewReports").click(function () {
        $.ajax({
            url: "/dash/totalSalesData"
            , success: function (result) {
                var collection = result.data;
                var index = 0;
                $(".removableReportRow").remove();
                for(var i = 0; i < collection.length; i++) {
                    var value = collection[i];
                    $("<tr class='removableReportRow'><td>" + (++index) + "</td><td>" + value.item + "</td><td>" + value.category + "</td><td>" + value.stock + "</td><td>" + value.sold + "</td><td>" + (value.sold * value.price) + "</td></tr>").insertAfter("#reportTableHeader");
                }
            }
        });
    });
    var currentCash = 0.0;
    var serialNumber = 0;
    var itemInCart = [];
    $("#addNewItemWindow").click(function () {
        $.ajax({
            url: "/dash/fetchProductData"
            , success: function (result) {
                var collection = result;
                /*var collection = {
                    "toothbrush": {
                        1: {
                            item: "colgate"
                            , price: 5.0
                            , quantity: 8
                        }
                    }
                    , "condoms": {
                        2: {
                            item: "manforce"
                            , price: 15.0
                            , quantity: 18
                        }
                    }*/
                //AJAX
                var isFirst = true;
                $.each(collection, function (key, value) {
                    alert(key);
                    $("#category").append("<option class='removabledata' value='" + key + "'>" + key + "</option>");
                    if (isFirst) {
                        $.each(collection[category], function (key, value) {
                            $("#item").append("<option class='removabledata' value='" + value.item + "'>" + value.item + "</option>");
                            if (isFirst) {
                                $("#quantity").attr("max", value.quantity);
                                $("#localPrice").val(value.price);
                                isFirst = false;
                            }
                        });
                        $("#quantity").attr("max", value.quantity);
                        $("#localPrice").val(value.price);
                        isFirst = false;
                    }
                });
                isFirst = true;
                $("#category").change(function () {
                    var category = $("#category").find(":selected").text();
                    $("#item").html("");
                    $.each(collection[category], function (key, value) {
                        $("#item").append("<option class='removabledata' value='" + value.item + "'>" + value.item + "</option>");
                        if (isFirst) {
                            $("#quantity").attr("max", value.quantity);
                            $("#localPrice").val(value.price);
                            isFirst = false;
                        }
                    });
                });
                $("#item").change(function () {
                    var itemName = $("#item").find(":selected").text();
                    var categoryName = $("#category").find(":selected").text();
                    $.each(collection[categoryName], function (key, value) {
                        if (value.item == itemName) {
                            $("#quantity").attr("max", value.quantity);
                            $("#localPrice").val(value.price);
                        }
                    });
                });
            }
        });
    });
    $('#addToCart').click(function () {
        var category = $('#category').find(":selected").text();
        var item = $('#item').find(":selected").text();
        var quantity = $('#quantity').val();
        var localPrice = Number($('#localPrice').val());
        currentCash = currentCash + quantity * localPrice;
        alert(currentCash);
        $("<tr class='removableRow'><td>" + (++serialNumber) + "</td><td>" + category + "</td><td>" + item + "</td><td>" + quantity + "</td><td>" + (quantity * localPrice) + "</td></tr>").insertBefore("#netTotal");
        $("#netTotalPrice").text(currentCash);
        var cartObj = {
            category: category
            , item: item
            , quantity: quantity
        }
        itemInCart.push(cartObj);
        $("#addNewItemForm").trigger("reset");
    });
    $("#checkOut").click(function () {
        $.ajax({
            url: "/dash/checkout/",
            type:"POST"
            , data: {
                items: itemInCart
                , totalProfit: currentCash
                , csrfmiddlewaretoken: '{{ csrf_token }}'
            }
            , success: function (result) {
                $(".removableRow").remove();
                $("#netTotalPrice").text(0);
                currentCash = 0.0;
                serialNumber = 0;
                itemInCart = [];
                alert("Last Transaction was successful!");
                $("#addNewItemForm").trigger("reset");
            },
            
        });
    });
    $("#viewObjectives").click(function () {
        vex.dialog.alert('Note : Click on sticky notes to take them off!');
    });
})();