
(function () {
  // Scope: sirf #mobilemenudesignsec ke andar
  const section = document.getElementById('mobilemenudesignsec');
  if (!section) return;

  const overlay      = section.querySelector('.overlay');
  const menuContainer= section.querySelector('.menu-container');
  const header       = section.querySelector('.menu-header');
  const menuIcon     = section.querySelector('.menu-icon');
  const menuContent  = section.querySelector('.menu-content');

  // OPTIONAL: agar kahin demo-content ho to blur kar denge,
  // warna safely skip (no error).
  const demoContent  = document.querySelector('.demo-content'); // may be null

  function openMenu() {
    menuContent.classList.add('expanded');
    menuIcon.classList.add('active');
    header.classList.remove('collapsed');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    if (demoContent) demoContent.classList.add('blur');
  }

  function closeMenu() {
    menuContent.classList.remove('expanded');
    menuIcon.classList.remove('active');
    header.classList.add('collapsed');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    if (demoContent) demoContent.classList.remove('blur');
  }

  window.toggleMenu = function () {
    const isExpanded = menuContent.classList.contains('expanded');
    if (isExpanded) closeMenu(); else openMenu();
  };

  window.closeMenu = closeMenu;

  // Close on overlay click
  overlay?.addEventListener('click', closeMenu);

  // Menu items par click → close + navigate (default behavior rehne do)
  section.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      closeMenu();
      // yahan e.preventDefault() mat karein agar real navigation chahiye
    });
  });

  // Enquiry button example
  const enquiryBtn = section.querySelector('.enquiry-btn');
  enquiryBtn?.addEventListener('click', (e) => {
    // close + your logic
    closeMenu();
    // ...open enquiry modal etc.
  });
})();
