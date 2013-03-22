// Sample runtime
modules['io'] = { loaded: true,
                  exports: {
                      println: __wrap_js_func(["line"], function(ln){
                          $("#taple_console").prepend($("<pre/>").text(String(ln)));
                      })
                  }
                };

$(window).load(function() {
    $("#taple_input_form").submit(function() {
        var msg;
        try {
            var source = $("#taple_input").val();
            var result = eval_taple(source);
            msg = String(result);
            $("#taple_input").val("");
        }
        catch (ex)
        {
            msg = String(ex);
        }
        $("#taple_console").prepend($("<pre/>").text(msg));
        return false;
    })

    $("#taple_input").keyup(function(e) {
        while($(this).outerHeight() < this.scrollHeight) {
            $(this).height($(this).height()+10);
        };
        return true;
    });
})
