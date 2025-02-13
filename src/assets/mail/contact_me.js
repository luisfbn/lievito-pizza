$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

            // console.log(name, phone, email, message);

            console.log("Calling email service...");

            // jQuery.ajax({
            //     type: "POST",
            //     url: 'contact_me.php',
            //     dataType: 'json',
            //     data: {functionname: 'add', arguments: [1, 2]},

            //     success: function (obj, textstatus) {
            //                   if( !('error' in obj) ) {
            //                       yourVariable = obj.result;
            //                   }
            //                   else {
            //                       console.log(obj.error);
            //                   }
            //             }
            // });


            $.ajax({
                url: "/assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success > .alert-success").append("<strong>Tu mensaje fue enviado. </strong>");
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function(xhr, status, error) {

                    // var err = eval("(" + xhr.responseText + ")");
                    // console.log(err.Message);

                    console.log(xhr);

                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text("Ey " + firstName + ", parece que el servidor de correo no quiere trabajar hoy. Por favor, inténtalo más tarde.")
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    //$("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
