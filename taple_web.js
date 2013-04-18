$(window).load(function() {
    $("#taple_input_form").submit(function() {
        var msg;
        try {
            var source = $("#taple_input").val();
            var result = rt.eval(source);
            msg = String(result);
        }
        catch (ex)
        {
            msg = String(ex);
        }
        $("#taple_console").prepend($("<pre/>").text(msg));
        return false;
    })

    $(".sample-code").click(function(e) {
        $.get($(this).attr("href"), function(data) {
            $("#taple_input").val(data).change().focus();
        }, "text");
        return false;
    });

    var autogrow = function(e) {
        if (e.keyCode == 13 && e.ctrlKey)
        {
            $("#taple_input_form").submit();
            return false;
        }
        else
        {
            while($(this).outerHeight() < this.scrollHeight) {
                $(this).height($(this).height()+10);
            };
            return true;
        }
    };

    $("#taple_input").keyup(autogrow).change(autogrow);
})
