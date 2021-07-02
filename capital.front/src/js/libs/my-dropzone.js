$(document).ready(function() {
  $(function(){
    // Dropzone.autoDiscover = false;
    // Dropzone.options.dropzone = false;
    // let dropZoneElement = document.getElementById('photoDropzone');
    let dropZoneElements = document.getElementsByClassName('photoDropzone');
    
    if (dropZoneElements.length) {
       globalVariables.myDropzone = [];

      for (var i = 0; i < dropZoneElements.length; i++) {
        let dropzone = new Dropzone(dropZoneElements[i], { 
          url: "/calculator/requests-temp-image",
          paramName: 'img',
          maxFilesize: 3,
          addRemoveLinks: true,
          dictDefaultMessage: "Добавить фото",
          dictResponseError: 'Server not Configured',
          acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
          uploadMultiple: true,
          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
          // hiddenInputContainer: '#photoDropzone',   
          // autoProcessQueue: false,

          // success: function(file, response) 
          // {
          //     console.log(file);
          //     console.log(response);
          // },
          // error: function(file, response)
          // {
          //    return false;
          // },

           
          init: function(){
            var self = this;
            var fileNames = [];
            var isSpecialPage = $(self.element).closest('.specialPage').length;

            // config
            self.options.addRemoveLinks = true;
            self.options.dictRemoveFile = "Удалить фото";
            // let newInput = $('<input class="js_hidden filesInput" type="file" name="files[]" multiple="true">');
            // $('#photoDropzone').append(newInput);

            function hasElement(array, element) {
              let has = false;
              for (let i = 0; i < array.length; i++) {
                if(array[i] === element) {
                  has = true; break;
                } 
              }
              return has;
            }

            // var newFileList = [];
            let input = null;

            if ( isSpecialPage ) {
              input = $(`<input name="files" 
                                type="hidden" 
                                data-validate="required" 
                                data-error-text="${globalVariables.messages.isPhoto}">`);
            } else {
              input = $('<input name="files" type="hidden">');
            }
            // input[0].value = newFileList;
            $(self.element).append(input) ;

            //New file added
            self.on("addedfile", function (file) {
              // console.log('added');
              // let names = ['http://capital.loc/storage/temp/9nnaI7VtbMfHt08WZRue5Lm6Oumh3mfAKRD0jtkH.jpeg', 'http://capital.loc/storage/temp/QEpimuvkpjn0k38TDjQN8LeWNS5KCqMmbdcGvfUR.jpeg']; 
              //  if (fileNames.length == 0) {
              //   console.log(file);
              //     // fileNames.push('a0');
              //     fileNames.push(file);
              // } else {
              //   for (let i = 0; i < 2; i++) {
              //     // $(self.element).append($('<input name="files[]" type="hidden" ' + 'value="' + response.names[i] + '">'));
              //     console.log(file);
              //     console.log(fileNames);
              //     hasElement(fileNames, file) ? null : fileNames.push(file);
              //   }
              // }

              // console.log(fileNames);
              
              // input[0].value = fileNames;
              // console.log(input[0].value);
              //
              // console.log('new file added ', file);
              // console.log($(self.element));
              // input[0].value = "sjdfksdlfnsdjkfn.jpg";
              // $(self.element).append(input) ;

              // newFileList.push('file'+i);
              // input[0].value = '[' + newFileList + ']';
              // i++;

              // fileList.push( $('.dz-hidden-input')[0].files[0] );
              // console.log('fileList: ', fileList)
              // console.log('inputs list: ', $('.dz-hidden-input')[0].files)
              // $('.dz-hidden-input')[0].files[3] = file;
              // console.log('inputs list2: ', $('.dz-hidden-input')[0].files)


              // newFileList = createFileList(file);
              // console.log(newFileList)

              // newInput[0].files = fileList;
              // $('.filesInput')[0].files = createFileList($('.dz-hidden-input')[0].files[0])

              // self.options.autoQueue = false;

            });
            // success files start
            self.on("success", function(file, response) {
              // console.log("success");
              if (fileNames.length == 0) {
                for (let i = 0; i < response.names.length; i++) {
                  fileNames.push(response.names[i]);
                }
              } else {
                for (let i = 0; i < response.names.length; i++) {
                  // $(self.element).append($('<input name="files[]" type="hidden" ' + 'value="' + response.names[i] + '">'));
                  hasElement(fileNames, response.names[i]) ? null : fileNames.push(response.names[i]);
                }
              }
              // console.log('fileNames: ' + fileNames);              
              input[0].value = fileNames;
              // console.log('input[0].value: ' + input[0].value);

              $(self.element).closest('form').find('.resultBlock .imgWrapper > img').attr('src', fileNames[0]);

            });
            self.on("removedfile", function(file) {
              // console.log(file.name);
              // let str = 'temp/' + file.name;
              // console.log(str)
              // for (let i = 0; i < fileNames.length; i++) {
              //   if ( fileNames[i] === str ) {
              //     fileNames.splice(i, 1); break;
              //   }
              // }

              // axios({ 
              //   method: 'post',
              //   url: '/calculator/requests-temp-image/'+,
              //   data: data,
              // }).then( response => {
              //   console.log(response)
              //   if (response.status == 200) {
              //     // response
              //   }
              // }).catch( error => {
              //   // console.log(axios.defaults.headers.common['X-CSRF-TOKEN'])
              //   console.error(error)
              // });


              // var name = file.name;  
              //  $.ajax({
              //   type: 'POST',
              //   url: 'allegati.php?delete=true&id='+idIncarico,
              //   data: "fileId="+name,
              //   dataType: 'html'
              // });
            });

            // Send file starts
            self.on("sending", function (file, xhr, formData) {
              // console.log('upload started', file);

              $('.meter').show();
            });
            
            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
              // console.log("progress ", progress);
              $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
              // console.log("progress ", progress);
              $('.meter').delay(999).slideUp(999);
            });
            self.on("reset", function() {
              fileNames = [];
            })            
          }

        });

        globalVariables.myDropzone.push(dropzone) 
        // console.log(globalVariables.myDropzone)
      }
    }
  })
});