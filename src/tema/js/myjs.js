var execute = (function () {
    return {
        funcao: function () {
            $(".alert-dismissible").fadeTo(2000, 500).slideUp(500, function () {
                $(".alert-dismissible").alert('close');
            });
        }
    }
})(execute || {})