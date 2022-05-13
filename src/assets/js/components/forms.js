if (telSelector) {
  let masked = new Inputmask("+7 (999) 999-99-99");
  masked.mask(telSelector);
}

if (form) {
  const validation = new JustValidate('.form-contacts');
  validation
    .addField('.form-contacts__input-name', [
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
    .addField('.form-contacts__input-email', [
      {
        rule: 'required',
      },
      {
        rule: 'email',
      },
    ])
    .addField('.form-contacts__input-tel', [
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
    ])
    .addField('.form-contacts__input-text', [
      {
        rule: 'required',
      },
      {
        rule: 'minLength',
        value: 3,
      },
      {
        rule: 'maxLength',
        value: 100,
      },
    ])
    .addField('.form-contacts__argeem-input', [
      {
        rule: 'required',
      },
    ]).onSuccess((event) => {
      console.log('sent')
    })
}