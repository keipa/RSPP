// Bad working 
$(document).on('turbolinks:load', function() {
    $.getScript("http://widget.cloudinary.com/global/all.js")
    $("#upload").click(function(event) {
        cloudinary.openUploadWidget({
                loud_name: 'dzcon8dw0',
                upload_preset: 'kttccpy3',
                cropping: 'server'
            },
            function(error, result) {
                console.log(error, result)
            }, false)
    });
});
