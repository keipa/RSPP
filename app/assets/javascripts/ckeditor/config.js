/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';

  /* Filebrowser routes */
  // The location of an external file browser, that should be launched when "Browse Server" button is pressed.
  config.filebrowserBrowseUrl = "/ckeditor/attachment_files";

  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Flash dialog.
  config.filebrowserFlashBrowseUrl = "/ckeditor/attachment_files";

  // The location of a script that handles file uploads in the Flash dialog.
  config.filebrowserFlashUploadUrl = "/ckeditor/attachment_files";

  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Link tab of Image dialog.
  config.filebrowserImageBrowseLinkUrl = "/ckeditor/pictures";

  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Image dialog.
  config.filebrowserImageBrowseUrl = "/ckeditor/pictures";

  // The location of a script that handles file uploads in the Image dialog.
  config.filebrowserImageUploadUrl = "/ckeditor/pictures";

  // The location of a script that handles file uploads.
  config.filebrowserUploadUrl = "/ckeditor/attachment_files";

  config.allowedContent = true;


  config.height = "90rem";

  config.font_names =
    'Roboto Thin/Roboto Thin;' +
    'Roboto/Roboto Light;' +
    'Roboto Regular/Roboto Regular;' +
    'Roboto Medium/Roboto Medium;' +
    'Roboto Bold/Roboto Bold;' +
    'Roboto Black/Roboto Black;'

  config.toolbar = [
    { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
    { name: 'editing', groups: [ 'find' ], items: [ 'Find', 'Replace', '-' ] },
    { name: 'links', items: [ 'Link', 'Unlink' ] },
    { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
    '/',
    { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] }
  ];
}


CKEDITOR.on('dialogDefinition', function( ev ) {
    // Take the dialog name and its definition from the event data.
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;
    var dialog = ev.data.definition.dialog;

    if ( dialogName == 'image' ) {
      dialogDefinition.removeContents('advanced');
      dialogDefinition.removeContents('Link');

      infoTab = dialogDefinition.getContents('info');
      infoTab.remove('txtUrl');
      infoTab.remove('browse');
      infoTab.remove('htmlPreview');
    }

    if ( dialogName == 'link' ) {
      dialogDefinition.removeContents('advanced');
      dialogDefinition.removeContents('upload');

      infoTab = dialogDefinition.getContents('info');
      infoTab.remove('browse');
      infoTab.remove('linkType');
    }

    dialog.on('show', function() {
      if ( dialogName == 'image' ) {

        $("input").each(function() {
          field = $('label[for="' + this.id + '"]').html()
          var fields = [
            "Ширина",
            "Высота",
            "Граница",
            "Вертик. отступ",
            "Гориз. отступ",
            "Выравнивание"
          ]
          if (fields.indexOf(field) != -1) {
            console.log($(this))
            $(this).css({
              "position": "relative",
              "transform": "translateX(50%)",
              "width": "24rem",
            })
            $('label[for="' + this.id + '"]').css({
              "position": "relative",
              "left": "12rem",
            })
          }
        })


        $("a").each(function() {
          field = this.title
          var fields = ["Сохранять пропорции", "Вернуть обычные размеры"]
          if (fields.indexOf(field) != -1) {
            console.log($(this))
            $(this.parentElement).css({
              "position": "relative",
              "left": "25rem",
              "top": "-0.2rem",
            })
          }
        })


        $("select").each(function() {
          field = $('label[for="' + this.id + '"]').html()
          var fields = ["Выравнивание"]
          if (fields.indexOf(field) != -1) {
            console.log($(this))
            $(this).attr('style',
              "position: relative;" +
              "transform: translateX(50%);" +
              "width: 24rem !important;"
            )
            $('label[for="' + this.id + '"]').css({
              "position": "relative",
              "left": "12rem",
            })
          }
        })
      }
    })
});
