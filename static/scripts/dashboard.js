(function () {
    var currentCash = 0.0;
    var serialNumber = 0;
    var itemInCart = [];
    $('.tile').each(function () {
        var $this = $(this)
            , page = $this.data('page-name')
            , bgcolor = $this.css('background-color')
            , textColor = $this.css('color');
        $this.on('click', function () {
            $('.' + page).css({
                'background-color': bgcolor
                , 'color': textColor
            }).find('.close-button').css({
                'background-color': textColor
                , 'color': bgcolor
            });
        });
    });

    function showDashBoard() {
        for (var i = 1; i <= 3; i++) {
            $('.col' + i).each(function () {
                $(this).addClass('fadeInForward-' + i).removeClass('fadeOutback');
            });
        }
    }

    function fadeDashBoard() {
        for (var i = 1; i <= 3; i++) {
            $('.col' + i).addClass('fadeOutback').removeClass('fadeInForward-' + i);
        }
    }
    $('.tile').each(function () {
        var $this = $(this)
            , pageType = $this.data('page-type')
            , page = $this.data('page-name');
        $this.on('click', function () {
            if (pageType === "s-page") {
                fadeDashBoard();
                $('.' + page).addClass('slidePageInFromLeft').removeClass('slidePageBackLeft');
            }
            else {
                $('.' + page).css('z-index', '10');
                $('.' + page).addClass('openpage');
                fadeDashBoard();
            }
        });
    });
    $('.r-close-button').click(function () {
        $(this).parent().css('z-index', '-10');
        $(this).parent().addClass('slidePageLeft').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
            $(this).removeClass('slidePageLeft').removeClass('openpage');
        });
        $(this).removeClass("opened");
        showDashBoard();
    });
    $('.s-close-button').click(function () {
        $(this).parent().removeClass('slidePageInFromLeft').addClass('slidePageBackLeft');
        showDashBoard();
    });
    $('#addToCart').click(function () {
        var category = $('#category').find(":selected").text();
        var item = $('#item').find(":selected").text();
        var quantity = $('#quantity').val();
        var localPrice = Number($('#localPrice').val());
        currentCash = currentCash + quantity * localPrice;
        alert(currentCash);
        $("<tr class='removableRow'><td>" + (++serialNumber) + "</td><td>" + category + "</td><td>" + item + "</td><td>" + quantity + "</td><td>" + (quantity * localPrice) 
          + "</td></tr>").insertBefore("#netTotal");
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
        //AJAX call here for itemInCart
        $(".removableRow").remove();
        $("#netTotalPrice").text(0);
        currentCash = 0.0;
        serialNumber = 0;
        itemInCart = [];
        alert("Last Transaction was successful!");
        $("#addNewItemForm").trigger("reset");
    });
    $("#addNewItemWindow").click(function () {});
})();