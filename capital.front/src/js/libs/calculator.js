globalFunctions.getData = function (url, callback, params) {

  function query(url, params) {
    axios.get(url, params)
    .then(response => {
        callback(response)        
    })
    .catch(error => {
      console.log(error);
    });
  };

  query(url, params)
}
globalFunctions.getLanguage = function() {
  return document.body.dataset.locale;
};

globalVariables.messages = {
  successResponse: globalFunctions.getLanguage() === 'ru' ? 'Спасибо! ваша заявка принята!' : 'Дякуємо! Ваша заявка прийнята!',
  successDescr: globalFunctions.getLanguage() === 'ru' ? 'Мы свяжемся с вами в ближайшее время.' : "Ми зв'яжемося з вами найближчим часом.",
  errorResponse: globalFunctions.getLanguage() === 'ru' ? 'Ошибка!' : 'Помилка!',
  errorResponseGadgets: globalFunctions.getLanguage() === 'ru' ? 'Для просчета стоимости рекомендуем обратиться по адресу ближайшего отделения.' : 'Для розрахунку вартості радимо звернутись за адресою найближчого відділення.',
  errorDescr: globalFunctions.getLanguage() === 'ru' ? 'Попробуйте еще раз' : 'спробуйте ще раз',
  errorDescr400: globalFunctions.getLanguage() === 'ru' ? 'Превышена максимальная сумма' : 'Перевищено максимальну суму',

  yes: globalFunctions.getLanguage() === 'ru' ? 'Да' : 'Так',
  no: globalFunctions.getLanguage() === 'ru' ? 'Нет' : 'Нi',
  gold: globalFunctions.getLanguage() === 'ru' ? 'Золото' : 'Золото',
  silver: globalFunctions.getLanguage() === 'ru' ? 'Серебро' : 'Срiбло',

  isPhoto: globalFunctions.getLanguage() === 'ru' ? 'Необходимо добавить фото изделия' : 'Необхідно завантажити фото виробу',
  
  transported_to: globalFunctions.getLanguage() === 'ru' ? 'Перенесено в №' : 'Перенесено до №',
  find_nothing: globalFunctions.getLanguage() === 'ru' ? 'Ничего не найдено!' : 'Нічого не знайдено!',
  work_time: globalFunctions.getLanguage() === 'ru' ? 'Время работы' : 'Час роботи',
}

// console.log(globalFunctions)

$(document).ready(function() {
  /* begin calculator staff */
  var models, selectedModel;

  (function(){
    if ( ! $('#calculatorPage').length && ! $('#specialPage').length) return;

    let $hellmarksSelectGold = $('#2');
    let $hellmarksSelectSilver = $('#32');
    let $tariffsSelectGold = $('#3');
    let $tariffsChoosenGold = $('#3_chosen');
    let $statusSelectGold = $('#4');
    let $tariffsSelectSilver = $('#35');
    let $tariffsChoosenSilver = $('#35_chosen');
    let $statusSelectSilver = $('#36');
    let $goldSlider = $('#gold-tab .slider-range');
    let $silverSlider = $('#silver-tab .slider-range');
    let wasSubmited = false;


    function findDropzoneInstance(htmlElement) {
      const element = htmlElement instanceof jQuery ? htmlElement[0] : htmlElement;

      let result;
      if (globalVariables.myDropzone.length) {
        for (var i = 0; i < globalVariables.myDropzone.length; i++) {
          if ( globalVariables.myDropzone[i].element.id === element.id ) {
            result = globalVariables.myDropzone[i]; break;
          }
        }
      }
      return result;       
    }

    function resetForm(formElement) {
      const form = formElement instanceof jQuery ? formElement[0] : formElement;
      form.reset();
      $(form).find('.chosen-wrapper  select').trigger("chosen:updated");

      if ( $(form).is('#technics-form') ) {
        models = null; selectedModel = null;
        form.querySelector('.resultBlock .product-description input[name="price"]').value = '';       
        form.querySelector('.resultBlock .imgWrapper input[name="image"]').value = '';
        let dropzone = findDropzoneInstance( document.getElementById('photoDropzoneGadgets') ) 
        dropzone.removeAllFiles(true);
      }
    }

    function clearResultBlock(formElement) {
      const form = formElement instanceof jQuery ? formElement[0] : formElement;
      form.querySelector('.resultBlock .product-description .name').innerHTML = '';
      form.querySelector('.resultBlock .product-description .price').innerHTML = '';
      // form.querySelector('.resultBlock .imgWrapper > img').src = 'img/image_mock.jpg';
      $(form).find('.resultBlock .imgWrapper > img').hide();
      form.querySelector('.resultBlock .condition > p').innerHTML = '';
      form.querySelector('.resultBlock .set > p').innerHTML = '';     
    }

    function showResultBlock(formElement) {
      const form = formElement instanceof jQuery ? formElement[0] : formElement;
      form.querySelector('.no-result-block').classList.remove('active');
      form.querySelector('.has-result-block').classList.add('active');
      form.querySelector('.resultBlock').classList.add('hasResult');
    }

    function hideResultBlock(formElement) {
      const form = formElement instanceof jQuery ? formElement[0] : formElement;
      form.querySelector('.no-result-block').classList.add('active');
      form.querySelector('.has-result-block').classList.remove('active');
      form.querySelector('.resultBlock').classList.remove('hasResult');
    }

    $('#startBlock').on('click', '.seriesTab', function() {
      let form = $(this).closest('form');
      resetForm(form);
      clearResultBlock(form);
      hideResultBlock(form);
    })

    $('body').on('click', '.hideResult', function() {
      hideResultBlock( $(this).closest('form') );      
    })

    /*=== begin calculator submit ===*/
    function submitCalcForm(formId, tariffChosenId, tariffSelectId, statusChosenId, statusSelectId) {

      if (!ValidationModule.isValid($(formId))) return false;
      // start set Results function
      function setResults(response, formId) {
        // start set intermidiate results
        let overPayment = response.data.overPayment.toFixed(2);
        let amount = response.data.amount.toFixed(2);

        let $overPaymentBlock = $(`${formId} .overPayment-js`);
        let $amountBlock = $(`${formId} .amount-js`);
        let $amountDiscoundBlock = $(`${formId} .amount-discount-js`);
        let $tariffLink = $(`${formId} .js_setTariff`);
        let $choosenTariffText = $(`${tariffChosenId} .chosen-single span`).text();

        function setTarriffText() {
          let $options = $('#3 option');
          // console.log($options);
          for(let i = 0; i < $options.length; i++) {
            let $text = $($options[i]).text();
            // console.log($text);

            if($text == $choosenTariffText) {
              let $tariffText = $($options[i]).data('tariff');
              if($tariffText) {
                // console.log($tariffText);
                
                $tariffLink.text(`"${$tariffText}"`);
                return;
              }
            }
          }
          $tariffLink.text(`"${$choosenTariffText}"`);
        };

        function setDisplayBlocks(formId) {
          let $persentBlock = $(`${formId} .has-result-block .graph-item:nth(1)`);
          let $discountPersentBlock = $(`${formId} .has-result-block .graph-item:nth(2)`);
          // let $options = $('#3 option');
          // console.log($options.length);

          $persentBlock.removeClass('disabled');
          $discountPersentBlock.hide();

          // for(let i = 0; i < $options.length; i++) {
          //   let $text = $($options[i]).text();
          //   if($text == $choosenTariffText) {
          //     let $lowPersentId = $($options[i]).data('id');
          //     console.log($lowPersentId);
              
              // if($lowPersentId == 11) {
              //   $persentBlock.addClass('disabled');
              //   $discountPersentBlock.show();
              // } else {
              //   $persentBlock.removeClass('disabled');
              //   $discountPersentBlock.hide();
              // }
            // }
          // }
        };

        $overPaymentBlock.text(overPayment + ' грн');
        $amountBlock.text(amount + ' грн');
        $amountDiscoundBlock.text((overPayment - (overPayment * 20 / 100)).toFixed(2) + ' грн');
        setTarriffText();
        setDisplayBlocks(formId);
        // end set intermidiate results        

        $(`${formId} .calcModal`).on('click', function(e) {
          e.preventDefault();
          let requestBtn = document.querySelector('#popupRequest .submitButtonWrapper button[type=submit]');
          // start get resultForm fields
          let $resWeight = $('.resWeight-js');
          let $resHalljs = $('.resHall-js');
          let $resStones = $('.resStones-js');
          let $resTariff = $('.resTariff-js');
          let $resDays = $('.resDays-js');
          let $resOverPayment = $('.resOverPayment-js');
          let $resAmount = $('.resAmount-js');
          // end get resultForm fields
          // start set resultForm fields
          $resWeight.text($(`${formId} input[name=weight]`).val());
          $resHalljs.text($(`${formId} select[name=hallmark]`).val());
          $resStones.text($(`${formId} input[name=additions]:checked`).hasClass('yes') ? globalVariables.messages.yes : globalVariables.messages.no);
          $resTariff.text($(`${formId} select[name=tariff]`).val());
          $resDays.text($(`${formId} .slider-range`).slider( 'value' ));
          $resOverPayment.text(overPayment + ' грн');
          $resAmount.text(amount + ' грн');        
          // end set resultForm fields
          // start set resultForm chosen Cities
          let $citiesResSelect = $('#404m');

          function initResFormCities(response) {
            let cities = response.data;
            let cityKey = globalFunctions.getLanguage() === 'ru' ? 'title_ru' : 'title_uk';
            setChosenParams(cities, $citiesResSelect, cityKey);
          };

          let getCalcCities = getCalcData(initResFormCities);
          getCalcCities('/calculator/get-cities');
          // end set resultForm chosen Cities
          // start send finish results
          function requestFinalData(e) {
            e.preventDefault();

            let $calcForm = $(this).closest($('.calculate-form'));
            if (!ValidationModule.isValid($calcForm)) return false;

            let $inputName = $('#401m');
            let $inputPhone = $('#402m');
            let $inputEmail = $('#403m');
            let $chosenCity = $('#404m_chosen .chosen-single span');
            // let files = $('#photoDropzoneModal').get(0).dropzone.getAcceptedFiles();
            let files = $('#popupRequest input[name^=files]');
            let category = formId == '#gold-form' ? globalVariables.messages.gold : globalVariables.messages.silver;


            let finishSubmitData = {
              'weight': Number($resWeight.text()),
              'hallmark': Number($resHalljs.text()),
              'stone': $resStones.text() == globalVariables.messages.yes ? 1 : 0,
              'tariff': $resTariff.text(),
              'term': Number($resDays.text()),
              'overpayment': Number($resOverPayment.text().replace(/\s?[а-я]/gi, '')),
              'amount': Number($resAmount.text().replace(/\s?[а-я]/gi, '')),
              'name': $inputName.val(),
              'phone': $inputPhone.val(),
              'email': $inputEmail.val(),
              'city': $chosenCity.text(),
              'client_status': $(`${statusChosenId} .chosen-single span`).text(),
              'category': category,
            };

            if ( files.val() ) finishSubmitData.files = files.val();

            // console.log(finishSubmitData);

            function handleGoldAndSilverFormsStatistic() {
              if ( dataLayer ) {
                console.log('in handleGoldAndSilverFormsStatistic: category', finishSubmitData.category );
                finishSubmitData.category == 'Золото' ?
                  dataLayer.push({'event': 'calculate_zoloto'}) :
                  dataLayer.push({'event': 'calculate_silver'});
              }
            }

            axios({
              method: 'post',
              url: '/calculator/requests',
              data: finishSubmitData,
              // headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
              // headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Content-Type': 'application/json'},
              // withCredentials: true,
            }).then(function(response) {
              onSuccessSubmit();
              handleGoldAndSilverFormsStatistic();
              PopupModule.closePopup(document.getElementById('popupRequest'));
              // console.log(response.data);
            }).catch(function(error) {
              onErrorSubmit();
              // PopupModule.closePopup(document.getElementById('popupRequest'));
              console.log(error);
            });

          };

          requestBtn.onclick = requestFinalData;
          // end send finish results
        });
      };
      // end set Results function
      // start tariff & status ID  
      function getId(chosenId, selectId) {  
       let chosenText = $(`${chosenId} .chosen-single span`).text();
       let selectOptions = $(`${selectId} option`);
       let selectOptionsText = [];
       for (let i = 0; i < selectOptions.length; i++) {
         selectOptionsText[i] = $(selectOptions[i]).text();
       }
       let selectIndex = selectOptionsText.indexOf(chosenText);
       if (chosenId == '#3_chosen' || chosenId == '#35_chosen') {
        return $(selectOptions[selectIndex]).data('id');
       } else if (chosenId == '#4_chosen' || chosenId == '#36_chosen') {
        return $(selectOptions[selectIndex]).data('id');
       }        
      };
      let tariffIndex = getId(tariffChosenId, tariffSelectId) || $(`${tariffSelectId} option:selected`).data('id') ;
      let statusIndex = getId(statusChosenId, statusSelectId) || $(`${statusSelectId} option:selected`).data('id');
   
      let submitData = {
        'weight': $(`${formId} input[name=weight]`).val(),
        'hallmark': $(`${formId} select[name=hallmark]`).val(),
        'tariff': tariffIndex,
        'status': statusIndex,
        'days': $(`${formId} .slider-range`).slider( 'value' ),
      };
      // console.log(submitData);

      axios.get('/calculator/calculate', {params: submitData})
        .then(function (response) {
          // console.log(response);
          showResultBlock($(formId));
          setResults(response, formId);
        })
        .catch(function (error) {
          onErrorSubmit(error.response.status);
          // console.log(error);
        });

        function onSuccessSubmit() {
            let modal = document.getElementById('popupMessage');
            let modalTitle = modal.querySelector('.title').innerHTML = globalVariables.messages.successResponse;
            let modalContent = modal.querySelector('.description > p').innerHTML = globalVariables.messages.successDescr;
            // resetForm(formElement);                
            PopupModule.openPopup(modal);
        };

        function onErrorSubmit(status) {
          let modal = document.getElementById('popupMessage'); 
          let modalTitle = modal.querySelector('.title').innerHTML = globalVariables.messages.errorResponse;
          let modalContent = modal.querySelector('.description > p').innerHTML = globalVariables.messages.errorDescr;
          if (status === 400) {
            let modalContent = modal.querySelector('.description > p').innerHTML = globalVariables.messages.errorDescr400;
          }
          PopupModule.openPopup(modal);
        };

    };

    $('.calculate-form').on('submit', function() {
      return false;
    });

    $('.calculate-form').on('click', '.submitButton', function(e) {
      e.preventDefault();
      let form = this.form;   

      if ($(this).closest('.calculate-form').is('#gold-form')) {
        submitCalcForm('#gold-form', '#3_chosen', '#3', '#4_chosen', '#4');
      }
      else if ($(this).closest('.calculate-form').is('#silver-form')) {
        submitCalcForm('#silver-form', '#35_chosen', '#35', '#36_chosen', '#36');
      } else if ($(this).closest('.calculate-form').is('#technics-form')) {

        const conditionSelectedElement = form.querySelector('input[name="condition"]:checked');
        const setSelectedElement = form.querySelector('input[name="set"]:checked');
        form.querySelector('.resultBlock .condition > p').innerHTML = conditionSelectedElement.value;
        form.querySelector('.resultBlock .set > p').innerHTML = setSelectedElement.value;
        let toggleBlocksWrapper2 = document.getElementsByClassName('subToggleBlocks-list')[0];
        let seriesTabsBlocksList = document.querySelectorAll('.subToggleBlocks-list > .toggleBlock');
        let technicTabDropzonePhoto = $('#technics-tab .photoDropzone .dz-image img').attr('src');
        if (technicTabDropzonePhoto) {
          form.querySelector('.resultBlock .imgWrapper > img').src = technicTabDropzonePhoto;
          $(form).find('.resultBlock .imgWrapper > img').show();
        }

        function showTechImage(selectedModel, form) {
          let $form = $(form); 
          $form.find('.resultBlock .imgWrapper > img').show();

          if (selectedModel.image) {
            $form.find('.resultBlock .imgWrapper > img').attr("src", selectedModel.image);
          } else {
            $form.find('.resultBlock .imgWrapper > img').hide();
          }
        }

        function showMessageSMS() {
          $('.request-answer').addClass('flex');
        }

        function hideMessageSMS() {
          $('.request-answer').removeClass('flex');
        }

        function setResultsBlock(form, button) {
          return function(response) {
            let finalPrice = Math.floor(response.data);
            form.querySelector('.resultBlock .product-description .name').innerHTML = selectedModel.model;
            // form.querySelector('.resultBlock .product-description .price').innerHTML = 'до ' + finalPrice + ' грн.';
            form.querySelector('.resultBlock .product-description input[name="price"]').value = finalPrice;
            form.querySelector('.resultBlock .imgWrapper input[name="image"]').value = selectedModel.image;

            showMessageSMS();
            showTechImage(selectedModel, form);        

            // showResultBlock(form);
            SwitchTabsModule.switchSeriesTabs(button, seriesTabsBlocksList, globalVariables.currentGroup);
            globalFunctions.animateBlock(toggleBlocksWrapper2);
          }
        }

        if (selectedModel) {
          let conditionMult = conditionSelectedElement.dataset.multiplier;
          let setMult = setSelectedElement.dataset.multiplier;
          let priceUrl = '/calculator/correct-price/'+selectedModel.price+'/'+conditionMult+'/'+setMult;
          globalFunctions.getData(priceUrl, setResultsBlock(this.form, this))
        } else {
          let nameStringArr = [];
          $('#101').val() ? nameStringArr.push( $('#101').val() ) : null;
          $('#102').val() ? nameStringArr.push( $('#102').val() ) : null;
          $('#103').val() ? nameStringArr.push( $('#103').val() ) : null;
          $('#106').val() ? nameStringArr.push( $('#106').val() ) : null;
          $('#107').val() ? nameStringArr.push( $('#107').val() ) : null;
          $('#108').val() ? nameStringArr.push( $('#108').val() ) : null;
          $('#109').val() ? nameStringArr.push( $('#109').val() ) : null;
          let nameString = nameStringArr.join(', ');
          
          form.querySelector('.resultBlock .product-description .name').innerHTML = nameString;
          hideMessageSMS();
          showResultBlock(form);
          SwitchTabsModule.switchSeriesTabs(this, seriesTabsBlocksList, globalVariables.currentGroup);
          globalFunctions.animateBlock(toggleBlocksWrapper2);

        }
      }

    });

    // -----gadgets Submit-----
    // function toggleWideBlock(parent) {
    //   let choseCategoryBlock = parent.getElementsByClassName('choseCategoryBlock')[0];
    //   let successBlock = parent.getElementsByClassName('successBlock')[0];
    //   let resultBlock = parent.parentElement.nextElementSibling;

    //   choseCategoryBlock.classList.contains('active') || successBlock.classList.contains('active') ?
    //     globalFunctions.showBlock(resultBlock, 'js_hide') : globalFunctions.hideBlock(resultBlock, 'js_hide');
    // }

    function submitData(url, data, callback, params) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      function query(url, data, params) {
        axios({ 
          method: 'post',
          url: url,
          data: data,
          // withCredentials: true,
          // headers: { 'Content-Type': 'application/json' },
          // headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        }).then( response => {
          // console.log(response)
          if (response.status == 200) {
            callback(response);
          }

        }).catch( error => {
          console.error(error)
          callback(error);
        });
      };
      
      query(url, data, params);
    }

    function prepareFormData(form) {
      let inputs = form.querySelectorAll('input:not([type=radio])');
      let inputsRadio = form.querySelectorAll('input[type=radio]');
      let selects = form.querySelectorAll('select');
      let textareas = form.querySelectorAll('textarea');

      let formData = {};
      // console.log(textareas)
      if (inputs.length) {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value ? formData[ inputs[i].name ] = inputs[i].value : null;
        }
      }

      if (inputsRadio.length) {
        for (let i = 0; i < inputsRadio.length; i++) {
          let currInput = inputsRadio[i];
          currInput.value && currInput.checked ? 
            formData[ currInput.name ] = currInput.value : 
            null;
        }
      }

      if (selects.length) {
        for (let i = 0; i < selects.length; i++) {
          selects[i].value && selects[i].value != 'placeholder' ? formData[ selects[i].name ] = selects[i].value : null;
        }
      }

      if (textareas.length) {
        for (let i = 0; i < textareas.length; i++) {
          textareas[i].value ? formData[ textareas[i].name ] = textareas[i].value : null;
        }
      }
      
      // formData = JSON.stringify( formData );
      return formData;
    }
    
    function switchShowBtns() {
      $('.js_block_toggle').toggleClass('active');
    }
    
    $('.calculate-form').on('click', '.submitFormButton', function() {
      let currentToggleBlock = $(this).closest('.toggleBlock');
      // console.log(currentToggleBlock);

      if ( ValidationModule.isValid(currentToggleBlock) ) {
        let form = this.form;
        let formData = prepareFormData( form );
        // console.log(form)
        // console.log(formData);

        if (form.id === 'technics-form') {
          $('.toggleBlock.active .prevButton, .toggleBlock.active .seriesTab').on('click', function() {
            if (wasSubmited) {
              switchShowBtns();
              wasSubmited = false;
            }
            $('.toggleBlock.active .prevButton, .toggleBlock.active .seriesTab').off('click');
          });

          function successSubmit(form, button) {
            return function(data) {
              // let resultPageTitle = document.querySelector('.successBlock .page-title');
              // let resultPageCategory = document.querySelector('.successBlock .category-name');
              
              // resultPageCategory.innerHTML = '';
              $('.request-answer').show();
              if (data.status == 200) {
                handleGadgetsStatistic();
                // resetForm(form);
                // clearResultBlock(form);
                // hideResultBlock(form);
                // resultPageTitle.innerHTML = globalVariables.messages.successResponse;
              } else if (data.response && data.response.status == 400) {
                $('.request-answer').hide();
                onErrorSubmit();
              } else if (data.response && data.response.status) {
                $('.request-answer__text').text(globalVariables.messages.errorResponseGadgets); /* !!! */
                // resultPageTitle.innerHTML = globalVariables.messages.errorResponse;
                // resultPageCategory.innerHTML = error;
              }
              
              wasSubmited = true;
              switchShowBtns();
              showResultBlock(form);


              // let toggleBlocksWrapper2 = document.getElementsByClassName('subToggleBlocks-list')[0];
              // let seriesTabsBlocksList = document.querySelectorAll('.subToggleBlocks-list > .toggleBlock');
              // SwitchTabsModule.switchSeriesTabs(button, seriesTabsBlocksList, globalVariables.currentGroup);
              // globalFunctions.animateBlock(toggleBlocksWrapper2);
              // toggleWideBlock(toggleBlocksWrapper2);
            }
          }

          function handleGadgetsStatistic() {
            if ( dataLayer ) {
              console.log('in handleGadgetsStatistic');
              dataLayer.push({'event': 'calculate_technique'});
            }
          }

          function onErrorSubmit() {
            let modal = document.getElementById('popupMessage');
            let modalTitle = modal.querySelector('.title').innerHTML = globalVariables.messages.errorResponseGadgets;
            // let modalContent = modal.querySelector('.description > p').innerHTML = globalVariables.messages.errorResponse;
            PopupModule.openPopup(modal);
          };

          submitData('/calculator/gadgets-requests', formData, successSubmit(form, this) );

        } else if ( form.classList.contains('special_ability_form') ) {
          // console.log('special_ability_form')
          function successSubmit(formElement, formData) {
            return function(response) {
              let modal = document.getElementById('popupMessage');
              if (response.status == 200) {
                let modalTitle = modal.querySelector('.title').innerHTML = globalVariables.messages.successResponse;
                let modalContent = modal.querySelector('.description > p').innerHTML = globalVariables.messages.successDescr;
                resetForm(formElement);                
                handleDiamondsAntiquesClocksJewelryStatistic(formData);
              } else {
                let modalTitle = modal.querySelector('.title').innerHTML = globalVariables.messages.errorResponse;
                let modalContent = modal.querySelector('.description > p').innerHTML = globalVariables.messages.errorDescr;
              }

              PopupModule.openPopup(modal);
            }
          }

          function handleDiamondsAntiquesClocksJewelryStatistic(formData) {
            if ( dataLayer ) {
              console.log('in handleDiamondsAntiquesClocksJewelryStatistic type:', formData.type);
              switch (formData.type) {
                case "diamond":
                  dataLayer.push({'event': 'calculate_diamond'});
                  break;
                case "antiques":
                  dataLayer.push({'event': 'calculate_antiques'});
                  break;
                case "watch":
                  dataLayer.push({'event': 'calculate_clock'});
                  break;
                case "jewelry":
                  dataLayer.push({'event': 'calculate_jewerly'});
                  break;
              }
            }
          }

          submitData('/calculator/special-abilities', formData, successSubmit(form, formData) );
        }

      }
    })
    /*=== end calculator submit ===*/

    function setChosenParams(obj, $select, val) {
      // console.log(obj);
      $select.empty();
      $select.append(`<option value="placeholder" style="display:none">${$select.data('placeholder')}</option>`);
      if(typeof obj[0] === 'string') {
        for (let i = 0; i < obj.length; i++) {
          $select.append(`<option>${obj[i]}</option>`);
        }
      }
      else {
        obj.map((el) => {
          if (el.id) {
            if (el.related_tariff) {
              let isLang = $('body').data('locale') == 'ru' ? 'title_ru' : 'title_uk';
              let relatedTariff = el.related_tariff[isLang];
              // console.log(relatedTariff);
              let dataTariff = relatedTariff.replace(/"/g, "");              
              // console.log(dataTariff);

              $select.append(`<option data-tariff="${dataTariff}" data-id="${el.id}">${el[val]}</option>`);
            } else {
              $select.append(`<option data-id="${el.id}">${el[val]}</option>`);
            }
          }
          else {
            $select.append(`<option>${el[val]}</option>`);
          }
        });
      }
      $select.trigger("chosen:updated");
      // console.log(1);
    };

    function getCalcData(func) {
      return function(url, params) {
        axios.get(url, params)
          .then(response => {
            func(response);
          })
          .catch(error => {
            console.log(error);
          });
      };
    };

    /*=== begin hallmarks ===*/
    function onChangeHallmarksSelect($curSelect, $targetSelect, fn) {
      $curSelect.chosen().change(function(evt, param) {
        $targetSelect.prop('disabled', false).trigger("chosen:updated");
        // console.log(evt);
        // console.log(param);
        fn('/calculator/get-tariffs', {
          params: {
            'hallmark': `${this[this.selectedIndex].value || param.selected}`
          }
        });
      });       
    };

    /*=== begin Gold ===*/
    function initCalcHallmarksGold(response) {
      let hallmarks = response.data;       
      setChosenParams(hallmarks, $hellmarksSelectGold, 'hallmark');
      onChangeHallmarksSelect($hellmarksSelectGold, $tariffsSelectGold, getCalcTariffsGold);
    };

    var getCalcHallmarksGold = getCalcData(initCalcHallmarksGold);
    getCalcHallmarksGold('/calculator/get-hallmarks', {
      params: {
        'category': '1'
      }
    });
    /*=== end Gold ===*/
    /*=== begin Silver ===*/
    function initCalcHallmarksSilver(response) {
      let hallmarks = response.data;
      setChosenParams(hallmarks, $hellmarksSelectSilver, 'hallmark');
      onChangeHallmarksSelect($hellmarksSelectSilver, $tariffsSelectSilver, getCalcTariffsSilver);
    };

    var getCalcHallmarksSilver = getCalcData(initCalcHallmarksSilver);
    getCalcHallmarksSilver('/calculator/get-hallmarks', {
      params: {
        'category': '2'
      }
    });
    /*=== end Silver ===*/
    /*=== end hallmarks ===*/
    
    /*=== begin tariffs ===*/      
    // function setChsnTarfPlchldr (selectId) {
    //   selectId.find('option[value=placeholder]').attr('selected', true);
    //   selectId.trigger("chosen:updated");
    //   console.log(selectId);
    //   console.log(2);
    // };
    /*=== begin Gold ===*/
    function initCalcTariffsGold(response) {
      // console.log(response.data);
      let tarriffs = response.data.filter((item) => item.calc_category_id == 1);
      let isLang = $('body').data('locale') == 'ru' ? 'title_ru' : 'title_uk';
      setChosenParams(tarriffs, $tariffsSelectGold, isLang);
      // setChsnTarfPlchldr($tariffsSelectGold);
      onChangeTariffSelect($tariffsSelectGold, response.data, isLang, $goldSlider, 1, $statusSelectGold);
    };

    var getCalcTariffsGold = getCalcData(initCalcTariffsGold);
    $tariffsSelectGold.prop('disabled', true).trigger("chosen:updated");
    /*=== end Gold ===*/
    /*=== begin Silver ===*/
    function initCalcTariffsSilver(response) {
      let tarriffs = response.data.filter((item) => item.calc_category_id == 2);
      let isLang = $('body').data('locale') == 'ru' ? 'title_ru' : 'title_uk';  
      setChosenParams(tarriffs, $tariffsSelectSilver, isLang);
      // setChsnTarfPlchldr($tariffsSelectSilver);
      onChangeTariffSelect($tariffsSelectSilver, response.data, isLang, $silverSlider, 2, $statusSelectSilver);
    };

    var getCalcTariffsSilver = getCalcData(initCalcTariffsSilver);
    $tariffsSelectSilver.prop('disabled', true).trigger("chosen:updated");  
    /*=== end Silver ===*/
    /*=== end tariffs ===*/
    /*=== begin terms ===*/
    function onChangeTariffSelect($curSelect, data, lang, categorySlider, categoryId, statusSelect) {
      // $curSelect.off();
      $curSelect.chosen().change(function(evt, param) {

        // console.log("========== 1");
        // console.log(data);
        // console.log(param);
        // console.log('this val', $(this).val());
        // console.log(categoryId);
        // console.log(lang);    
        
        let tariffData = data.filter((item) => {
          // console.log(item.calc_category_id == categoryId);
          // console.log(item[lang] == param.selected);
          if (window.innerWidth < 768) {
            return item.calc_category_id == categoryId && item[lang] == $(this).val();
          }
          return item.calc_category_id == categoryId && item[lang] == param.selected;
        });

        // console.log("========== 2");            
        // console.log('tariffData', tariffData);
        // console.log('tariffData[0]', tariffData[0]);
        // console.log('tariffData[0].terms', tariffData[0].terms);
        // console.log('tariffData[0].terms.length', tariffData[0].terms.length);

        let maxDays;
        // if(tariffData[0].terms.length > 1) {
          maxDays = tariffData[0].terms[tariffData[0].terms.length - 1].to;
        // } else {
          // maxDays = 1;
        // }

        categorySlider.slider('option', {
          disabled: false,
          max: maxDays,
          value: 1
        });
        
        let sliderValue = categorySlider.slider('value');

        categorySlider.find('.text').text(sliderValue);

        setChoosenStatuses(data, lang, categoryId, param, statusSelect, $curSelect);

      });       
    };
    /*=== end terms ===*/
    /*=== begin statuses ===*/
    // $statusSelectGold.prop('disabled', true).trigger("chosen:updated");
    // $statusSelectSilver.prop('disabled', true).trigger("chosen:updated");

    function setChoosenStatuses(data, lang, categoryId, param, statusSelect, $curSelect) {
      let tariffData = data.filter((item) => {
        if (window.innerWidth < 768) {
          // console.log('categoryId', categoryId);
          // console.log('$curSelect', $curSelect);
          // console.log($curSelect.val());
          let selectVal = $curSelect.val();

          return item.calc_category_id == categoryId && item[lang] == selectVal;
        }
        return item.calc_category_id == categoryId && item[lang] == param.selected;
      });

      // console.log(tariffData);

      statusSelect.empty();
      // statusSelect.append(`<option value="placeholder" style="display:none">${statusSelect.data('placeholder')}</option>`);
      tariffData[0].statuses.map((el) => {
        statusSelect.append(`<option data-id="${el.id}">${el[lang]}</option>`);
      });
      statusSelect.prop('disabled', false).trigger("chosen:updated");
    };      
    /*=== end statuses ===*/
    
  }());

// ====================================================================
  /*=== begin gadgets ===*/
  (function(){
    if ( ! $('#calculatorPage').length && ! $('#specialPage').length) return;

    function getElementId(element, content) {
      let result;

      if (element) {
        var childs = element.children;

        if (childs) {
          for (var i = 0; i < childs.length; i++) {
            if (childs[i].innerHTML === content) {
              result = childs[i].dataset.id;
              break;
            } 
          }
        }
      }
      return result;
    }

    function getCollectionItem(collection, itemValue, valueKey) {
      let result = null;

      if (collection) {
        for (let i = 0; i < collection.length; i++) {
          if (collection[i][valueKey] == itemValue) {
            result = collection[i];
            break;
          }
        }
      }
      return result;
    }

    // -------- Axios responses API -----------

    function setSelectData(element, data, key, key2) {
      element.empty();
      element.append(`<option value="placeholder" style="display:none">${element.data('placeholder')}</option>`);
      // console.log( data)
      if (data) {
        if ( Array.isArray(data) && typeof data[0] != 'object' ) {
          for (var i = 0; i < data.length; i++) {
            element.append(`<option>${ data[i] }</option>`);
          }
        } else if (typeof data[0] === 'object') {
          data.map((el) => {
            let option = document.createElement('option');
            option.setAttribute('data-id', el.id || 'none');
            option.innerHTML = key2 ? el[key] + ' (' + el[key2] + ')' : el[key];
            // element.append(`<option data-id="${el.id || 'none'}">${el[key]} ${key2 ? el[key2] : ''}</option>`); 
            element.append($(option));
          });
        }

        element.trigger("chosen:updated");
      }
    }

    if ( $('#calculatorPage').length ) {
      let $brandsSelect = $('#311');
      let $modelsSelect = $('#312');
      let $citiesSelect = $('#404');
      let $departmentsSelect = $('#405');

      let setBrands = function(response) {
        setSelectData( $brandsSelect, response.data.brands );
      }
      globalFunctions.getData('/calculator/get-brands', setBrands);

      function setModels(response) {
        models = response.data.models;
        setSelectData($modelsSelect, response.data.models, 'model');
        $modelsSelect.prop('disabled', false).trigger("chosen:updated");
      }
      $modelsSelect.prop('disabled', true).trigger("chosen:updated");
      $brandsSelect.chosen().change(function(e, param) {
        // console.log(this[this.selectedIndex].value)
        let params = {'brand': this[this.selectedIndex].value || param.selected }
        globalFunctions.getData('/calculator/get-models', setModels, {params: params} );
      })

      $modelsSelect.chosen().change(function(e, param) {
        selectedModel = getCollectionItem(models, this[this.selectedIndex].value, 'model');
      })

      /*=== begin step 4 calculate ===*/
      let setCities = function(response) {
        let cityKey = globalFunctions.getLanguage() === 'ru' ? 'title_ru' : 'title_uk';
        setSelectData( $citiesSelect, response.data, cityKey );
      }
      globalFunctions.getData('/calculator/get-cities', setCities);

      function setDepartments(response) {
        // console.log(response.data)
        let departmentKey = globalFunctions.getLanguage() === 'ru' ? 'meta_title_ru' : 'meta_title_uk';
        let addressKey = globalFunctions.getLanguage() === 'ru' ? 'address_ru' : 'address_uk';

        if (response.data.length) {
          // console.log(response.data)
          setSelectData($departmentsSelect, response.data, departmentKey, addressKey);
          $departmentsSelect.prop('disabled', false).trigger("chosen:updated");        
        }
      }
      $departmentsSelect.prop('disabled', true).trigger("chosen:updated");
      $citiesSelect.chosen().change(function(e, param) {
        let id = getElementId(e.target, this[this.selectedIndex].value || param.selected);
        if (id) { globalFunctions.getData('/calculator/get-departments/'+id, setDepartments) }
      })

      /*=== end step 4 calculate ===*/
    }

    if ($('#specialPage').length) {
      let $watchBrandsSelect = $('#301');

      let setBrands = function(response) {
        // console.log(response.data)
        setSelectData( $watchBrandsSelect, response.data, 'brand' );
      }
      globalFunctions.getData('/calculator/get-watches', setBrands);
    }
    

  }());
  /*=== end gadgets ===*/
  

  /* end calculator staff */
});