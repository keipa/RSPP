$.getScript("https://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU",function() {
    var map;
    ymaps.ready(function(){
        map = new ymaps.Map("map", {
            center: [53.909291, 27.556747],
            zoom: 17
        });

        $(".ymaps-copyrights-pane").hide();

        var data = {
                hintContent: 'ул. Сторожевская, 5 - офис 15',
            }
        var options = {balloonHasCloseButton: true}
        var myPlacemark = new ymaps.Placemark([53.909340, 27.556807], data, options);

        // Добавление объекта на карту
        map.geoObjects.add(myPlacemark);
    });
});
