// $(document).on('turbolinks:load', function() {


//     var num = $(".numOfSubtopics")[1].value;
//     $(".subtopicsInfo")[1].innerHTML = "";
//     for (i = 0; i < num; i++) {
//         $(".subtopicsInfo")[1].innerHTML += '<input placeholder="Название подраздела" name="topic[subtopics][' + i + '][text]">'+
//                                             '<input placeholder="Ссылка на материал" name="topic[subtopics][' + i + '][link]">'+
//                                             '<hr>';
//     }

//     $(".numOfSubtopics").on("change",function(){
//         $(".subtopicsInfo")[1].innerHTML = "";
//         for (i = 0; i < this.value; i++) {
//             $(".subtopicsInfo")[1].innerHTML += '<input placeholder="Название подраздела" name="topic[subtopics][' + i + '][text]">'+
//                                                 '<input placeholder="Ссылка на материал" name="topic[subtopics][' + i + '][link]">'+
//                                                 '<hr>';
//         }
//     });

//     $(".add-subtopic-sign").on("click", function(){
//         topicID = $(this)[0].dataset.id;
//         $(".add-subtopic-form").show();

//         $("form").attr("action", "/topics/" + topicID);
//         $("form").attr("method", "post");

//     })

//     $(".close").on("click", function() {
//         $(".add-subtopic-form").hide();
//     })
// })
