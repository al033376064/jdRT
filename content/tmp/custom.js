jQuery.validator.setDefaults({
    errorPlacement: function (error, element) {
        if (element.is(":radio"))
            error.appendTo(element.parent().parent());
        else if (element.is(":checkbox"))
            error.appendTo(element.parent().parent());
        else
            error.appendTo(element.parent());
    },
    errorClass: "ValError",
});