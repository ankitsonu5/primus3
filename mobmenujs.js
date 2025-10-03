
        function toggleMenu(menuIcon) {
    const header = menuIcon.parentElement;
    const menuContent = header.nextElementSibling;
    const isExpanded = menuContent.classList.contains('expanded');
    const overlay = document.querySelector('.overlay');
    const demoContent = document.querySelector('.demo-content');
    const body = document.body;

    if (isExpanded) {
        // Collapse
        menuContent.classList.remove('expanded');
        menuIcon.classList.remove('active'); // yaha se icon change hoga
        header.classList.add('collapsed');
        overlay.classList.remove('active');
        demoContent.classList.remove('blur');
        body.classList.remove('menu-open');
    } else {
        // Expand
        menuContent.classList.add('expanded');
        menuIcon.classList.add('active'); // yaha se close icon dikhega
        header.classList.remove('collapsed');
        overlay.classList.add('active');
        demoContent.classList.add('blur');
        body.classList.add('menu-open');
    }
}


        function closeMenu() {
            const menuIcon = document.querySelector('.menu-icon');
            const header = menuIcon.parentElement;
            const menuContent = header.nextElementSibling;
            const overlay = document.querySelector('.overlay');
            const demoContent = document.querySelector('.demo-content');
            const body = document.body;

            // Collapse menu when clicking overlay
            menuContent.classList.remove('expanded');
            menuIcon.classList.remove('active');
            header.classList.add('collapsed');
            overlay.classList.remove('active');
            demoContent.classList.remove('blur');
            body.classList.remove('menu-open');
        }

        // Add click handlers to menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                // Remove active state from all items
                document.querySelectorAll('.menu-item').forEach(i => i.style.background = '');

                // Add active state to clicked item
                this.style.background = '#f0f0f0';
                this.style.color = '#8B4A8C';

                console.log('Navigating to:', this.textContent);
            });
        });

        // Add click handler to enquiry button
        document.querySelector('.enquiry-btn').addEventListener('click', function () {
            console.log('Opening enquiry form...');
            // Add your enquiry logic here
        });