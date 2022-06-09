
function(){

  const telSelector= document.querySelector('telSelector')
  if (telSelector) {
    let masked = new Inputmask("+7 (999) 999-99-99");
    masked.mask(telSelector);
  }

if (form) {
  const validation = new JustValidate('.form');
  validation
    .addField('.form-field-name', [
      {
        rule: 'required',
        value: true,
      },
      {
        rule: 'minLength',
        value: 3,
      },
      {
        rule: 'maxLength',
        value: 30,
      },
    ])
    .addField('.form-field-email', [
      {
        rule: 'required',
      },
      {
        rule: 'email',
      },
    ])
    .addField('.form-field-tel', [
      {
        rule: 'required',
      },
      {
        rule: 'function',
        validator: function () {
          const phone = telSelector.inputmask.unmaskedvalue()
          return phone.length === 10
        },
      },
    ]).onSuccess((event) => {
      console.log('sent')
    })
}
}
