$(document).on('turbolinks:load', function() {

    var num = $(".numOfSubtopics").val();
    if (num) {
        $(".subtopicsInfo")[0].innerHTML = "";
        for (i = 0; i < num; i++) {
            $(".subtopicsInfo")[0].innerHTML += '<input placeholder="Название подраздела" name="topic[subtopics][' + i + '][text]">' +
                '<input placeholder="Ссылка на материал" name="topic[subtopics][' + i + '][link]">' +
                '<hr>';
        }

        $(".numOfSubtopics").on("change", function() {
            $(".subtopicsInfo")[0].innerHTML = "";
            for (i = 0; i < this.value; i++) {
                $(".subtopicsInfo")[0].innerHTML += '<input placeholder="Название подраздела" name="topic[subtopics][' + i + '][text]">' +
                    '<input placeholder="Ссылка на материал" name="topic[subtopics][' + i + '][link]">' +
                    '<hr>';
            }
        });

        $(".add-topic-sign").on("click", function() {
            $(".add-topic-form").show();
        })

        $(".close").on("click", function() {
            $(".add-topic-form").hide();
        })
    }

    $('#add_topic_button').click(function(e) {
        var link = $('#smart_id_topic').val();
        if (link == 'galleries' || link == 'about') {
            link = '/' + link;
        } else {
            link = '/topics/' + link;
        }
        $('#link_topic').val(link)
    })
})
