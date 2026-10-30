$(function () {

    console.log('working');

    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
        var registerBtn = document.querySelector('#btn-1598934641228');
        registerBtn.removeAttribute('disabled');
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change')
    }

    $('#mycontact-form').validator();

    $('#mycontact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#mycontact-form').find('.messages').html(alertBox);
                        $('#mycontact-form')[0].reset();
                        grecaptcha.reset();
                    }
                }
            });
            return false;
        }
    })
});