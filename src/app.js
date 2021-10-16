const inputs = document.querySelectorAll('input');
// values
const bill = document.querySelector('.bill-value');
const tip = document.querySelector('.custom');
const nop = document.querySelector('.number-input');
// total
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
// wrap
const billWrap = document.querySelector('.bill-wrap');
const tipWrap = document.querySelector('.tip-wrap');
const nopWrap = document.querySelector('.nop');

const tipBtns = document.querySelectorAll('button.btn');

let billVal = 0;
let tipVal = 0;
let nopVal = 0;

bill.value = '';
tip.value = '';
nop.value = '';

// total calculate
const total = (billVal, tipVal, nopVal, tag) => {
  if (billVal <= 0 || tipVal < 5 || nopVal < 2) {
    if (tag.classList.contains('bill-value')) {
      billVal <= 0 ? billInvalid(bill) : billValid(bill);
    }
    if (tag.classList.contains('number-input')) {
      nopVal < 2 ? nopInvalid(nop) : nopValid(nop);
    }
    if (tag.classList.contains('custom')) {
      tipVal < 5 ? customInvalid(tip) : tipValid(tip);
    }
    if (tag.classList.contains('selected')) {
      tipValid(tip);
    }

    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
  } else {
    nopValid(nop);
    billValid(bill);
    tipValid(tip);
    tipAmount.textContent = `$${((billVal * (tipVal / 100)) / nopVal).toFixed(
      2,
    )}`;
    totalAmount.textContent = `$${(
      (billVal + billVal * (tipVal / 100)) /
      nopVal
    ).toFixed(2)}`;
  }
};
// capture data
inputs.forEach((i) => {
  i.addEventListener('input', () => {
    billVal = Number(bill.value);
    tipVal =
      tipWrap.getElementsByClassName('selected').length === 0
        ? Number(tip.value)
        : Number(tipWrap.querySelector('.selected').value);
    nopVal = Number(nop.value);
    total(billVal, tipVal, nopVal, i);
  });
});

tipBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // custom clear
    tipWrap.querySelector('.custom').value = '';
    // clear selected
    tipBtns.forEach((btn) => {
      btn.classList = 'btn';
    });
    // add selected
    btn.classList = 'btn selected';
    tipVal = Number(tipWrap.querySelector('.selected').value);
    total(billVal, tipVal, nopVal, btn);
  });
});

const custom = () => {
  tipBtns.forEach((btn) => {
    btn.classList = 'btn';
  });
};

// validation

// valid
const tipValid = (tag) => {
  let valid = tipWrap.querySelector('.invalid');
  valid.style.display = 'none';
  tag.classList.remove('error');
};
const billValid = (tag) => {
  let valid = billWrap.querySelector('.invalid');
  tag.parentElement.classList.remove('error');
  valid.style.display = 'none';
};
const nopValid = (tag) => {
  let valid = nopWrap.querySelector('.invalid');
  tag.parentElement.classList.remove('error');
  valid.style.display = 'none';
};

// invalid
const customInvalid = (tag) => {
  let invalid = tipWrap.querySelector('.invalid');
  invalid.style.display = 'block';
  tag.classList.add('error');
};
const billInvalid = (tag) => {
  let invalid = billWrap.querySelector('.invalid');
  tag.parentElement.classList.add('error');
  invalid.style.display = 'block';
};
const nopInvalid = (tag) => {
  let invalid = nopWrap.querySelector('.invalid');
  tag.parentElement.classList.add('error');
  invalid.style.display = 'block';
};

const prevent = (dat) => {
  data.preventDefault();
};
