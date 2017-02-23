$(document).on('turbolinks:load', function() {
  $(".pagination li.prev a,.pagination li.prev span").text('← Назад')
  $(".pagination li.next a,.pagination li.next span").text('Вперед →')
})
