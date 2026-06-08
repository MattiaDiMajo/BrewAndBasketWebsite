/* Brew & Basket — booking calendar */
(function () {
  const BOOKED_DATES = {
    '2026-6': [3, 7, 14, 21, 28],
    '2026-7': [4, 11, 18],
  };

  let current = new Date(2026, 5, 1); // June 2026
  let selectedDate = null;

  const grid   = document.getElementById('calGrid');
  const title  = document.getElementById('calTitle');
  const prev   = document.getElementById('prevMonth');
  const next   = document.getElementById('nextMonth');
  const input  = document.getElementById('selectedDate');

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const today  = new Date(2026, 5, 8); // today = 8 June 2026

  function render() {
    grid.innerHTML = '';
    const year  = current.getFullYear();
    const month = current.getMonth();
    title.textContent = `${MONTHS[month]} ${year}`;

    const key    = `${year}-${month + 1}`;
    const booked = BOOKED_DATES[key] || [];

    // day-of-week offset (Mon=0)
    const firstDay = new Date(year, month, 1).getDay();
    const offset   = (firstDay === 0) ? 6 : firstDay - 1;
    const daysIn   = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < offset; i++) {
      const e = document.createElement('div');
      e.className = 'day empty';
      grid.appendChild(e);
    }

    for (let d = 1; d <= daysIn; d++) {
      const cell = document.createElement('div');
      const thisDate = new Date(year, month, d);
      let cls = 'day';

      if (booked.includes(d))                               cls += ' booked';
      else if (thisDate < today && !(thisDate - today === 0)) cls += ' past';
      else if (thisDate.toDateString() === today.toDateString()) cls += ' today';

      if (selectedDate &&
          selectedDate.getDate() === d &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year) {
        cls += ' selected';
      }

      cell.className = cls;
      cell.textContent = d;

      if (!cls.includes('booked') && !cls.includes('past')) {
        cell.addEventListener('click', () => selectDate(year, month, d));
      }
      grid.appendChild(cell);
    }
  }

  function selectDate(y, m, d) {
    selectedDate = new Date(y, m, d);
    const formatted = selectedDate.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    if (input) input.value = formatted;
    render();
  }

  if (prev) prev.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); render(); });
  if (next) next.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); render(); });

  if (grid) render();

  /* form submission */
  window.handleSubmit = function (e) {
    e.preventDefault();
    const form    = document.getElementById('bookingForm');
    const success = document.getElementById('formSuccess');
    if (form && success) {
      form.style.display    = 'none';
      success.style.display = 'block';
    }
  };
})();
