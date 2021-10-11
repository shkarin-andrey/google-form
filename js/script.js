$(document).ready(function(){

  function validateForms(form) {
    $(form).validate({
      wrapper: "li",
      rules: {
        name: {
          required: true
        },
        link: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите свое имя'
        },
        link: 'Пожалуйста, введите ссылку на форму',
        email: {
          required: 'Пожалуйста, введите свою почту',
          email: 'Неправильно введен адрес почты'
        }
      }
    });
  }
  validateForms('.form');

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val('');
      $('.form, .subtitle__color-red').fadeOut();
      $('.header-subtitle').text('Ответ записан.');
      $('.subtitle__color-blue').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  $('.subtitle__color-blue').click(function() {
    $('.form, .subtitle__color-red').fadeIn();
    $('.header-subtitle').text('На вакансию HTML верстальщик');
    $('.subtitle__color-blue').fadeOut();
  });
});

const wrapper = document.querySelectorAll('.wrapper'),
      input = document.querySelectorAll('input'),
      line = document.querySelectorAll('.form__line-bottom'),
      lineTwo = document.querySelectorAll('.form__line-bottom-two'),
      errorLabel = document.querySelectorAll('.error'),
      btn = document.querySelector('.btn');

for (let i = 0; i < input.length; i++) { 

  input[i].addEventListener('focus', () => {
    line[i].style.display = 'block';

    if (wrapper[i + 1].style.borderColor == 'red') {
      line[i].classList.add('form__line-bottom-two');
    } else {
      line[i].classList.remove('form__line-bottom-two');
    }
  });
  
  input[i].addEventListener('blur', () => {
    line[i].style.display = 'none';

    if (input[i].value == '') {
      input[i].style.borderColor = 'red';
      wrapper[i + 1].style.borderColor = 'red';
    } else {
      input[i].style.borderColor = '#dadce0';
      wrapper[i + 1].style.borderColor = '#dadce0';
    }
  });
}



