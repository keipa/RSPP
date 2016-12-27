// Bad working
$(document).on('turbolinks:load', function() {
    $.getScript("http://widget.cloudinary.com/global/all.js")
    $("#upload").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'kttccpy3',
                cropping: 'server'
            },
            function(error, result) {
                console.log(error, result)
            }, false)
    });
});
