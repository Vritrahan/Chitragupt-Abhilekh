(function () {
    var hour = 12;
    var minutes = 00;
    var meridian = "AM";
    var fullTime = "12:00 AM";
    var audio = new Audio("{% static audio/alarm.mp3}");
    audio.addEventListener("ended", function () {
        this.currentTime = 0;
        this.play();
    }, false);
    $("#timepicker1").timepicker({
        template: "dropdown"
        , defaultTime: "current"
        , showMeridian: "false"
        , showInputs: "true"
    });
    $('#timepicker1').timepicker('setTime', '12:00 AM');
    $("#timepicker1").timepicker().on("changeTime.timepicker", function (e) {
        hour = e.time.hours;
        minutes = e.time.minutes;
        meridian = e.time.meridian;
        fullTime = e.time.value;
    });
    $("#clock").click(function () {
        vex.dialog.prompt({
            message: "Note for alarm?"
            , placeholder: "My time is none of your business!"
            , callback: function (value) {
                var cause = value;
                if (!cause) {
                    return;
                }
                console.log("Alloted Time is : " + fullTime);
                var alarmId = "Time" + (fullTime.replace(' ', '')).replace(':', 'L');
                $("<tr id='" + alarmId + "'><td>" + cause + "</td><td>" + fullTime + "</td></tr>").insertAfter("#alarmTableHeader");
                if (meridian == "PM") {
                    hour += 12;
                }
                else if (hour == 12) {
                    hour = 0;
                }
                var alarmMils = hour * 3600 + minutes * 60;
                console.log(hour);
                console.log(minutes);
                alarmMils = alarmMils * 1000;
                var ct = new Date($.now());
                var currentTime = ct.getHours() * 3600 + ct.getMinutes() * 60 + ct.getSeconds();
                currentTime *= 1000;
                var dt = alarmMils - currentTime;
                if (dt < 0) {
                    dt = 24 * 3600 * 1000 + dt;
                }
                console.log("mils :" + dt);
                setTimeout(function () {
                    audio.play();
                    vex.dialog.alert("Note : " + cause);
                    //audio.pause();
                    //audio.currentTime = 0;
                    console.log(alarmId);
                    $("#" + alarmId).remove();
                }, dt);
            }
        })
    });
    var storedNotes = localStorage.getItem("stickyNotes");
    var notesCollection = [];
    if (storedNotes) {
        var ls = JSON.parse(storedNotes);
        notesCollection = ls.collection;
        for (var i = 0; i < ls.size; i++) {
            $("#notes").append("<li noteNum='" + i + "'class='notesRemove'><p>" + notesCollection[i] + "</p></li>");
        }
    }
    $("#addNewNoteButton").click(function () {
        vex.dialog.prompt({
            message: 'Give appropriate text for sticky note?'
            , placeholder: 'ChitraguptaAbhilekh'
            , callback: function (value) {
                var noteId = notesCollection.length;
                notesCollection.unshift(value);
                $("#notes").prepend("<li noteNum='" + noteId + "'class='notesRemove'><p>" + value + "</p></li>");
                var collection = {
                    collection: notesCollection
                    , size: notesCollection.length
                };
                localStorage.removeItem("stickyNotes");
                localStorage.setItem("stickyNotes", JSON.stringify(collection));
            }
        });
    });
    $(".notesRemove").click(function () {
        var index = $(this).attr("noteNum");
        notesCollection.splice(index, 1);
        $(this).remove();
        var collection = {
            collection: notesCollection
            , size: notesCollection.length
        };
        localStorage.removeItem("stickyNotes");
        localStorage.setItem("stickyNotes", JSON.stringify(collection))
    });
    
    $("#logout").click(function () {
        $.get("/dash/logout", function(success) {
            vex.dialog.alert("User logged out!!!");
        });
    });
})();