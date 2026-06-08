/* Brew & Basket — news tab filter */
(function () {
  const tabs     = document.querySelectorAll('.tab');
  const articles = document.querySelectorAll('.news-feed article');
  const noResult = document.getElementById('noResults');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      let visible  = 0;

      articles.forEach(a => {
        const cat = a.dataset.cat;
        if (filter === 'all' || cat === filter) {
          a.style.display = '';
          visible++;
        } else {
          a.style.display = 'none';
        }
      });

      if (noResult) noResult.style.display = visible === 0 ? 'block' : 'none';
    });
  });
})();
