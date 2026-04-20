document.addEventListener('DOMContentLoaded', () => {

    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const loginForm = document.getElementById('login-form');
    const adminUser = document.getElementById('admin-user');
    const adminPass = document.getElementById('admin-pass');
    
    // Simple basic auth for demo (In real life, use Firebase Auth here!)
    // Credentials: admin / wofle2026
    
    // Check if already logged in via SessionStorage
    if(sessionStorage.getItem('dabali_admin_logged')) {
        showDashboard();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(adminUser.value === 'admin' && adminPass.value === 'wofle2026') {
            sessionStorage.setItem('dabali_admin_logged', 'true');
            showDashboard();
        } else {
            alert('Identifiants incorrects.');
        }
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.removeItem('dabali_admin_logged');
        dashboardScreen.style.display = 'none';
        loginScreen.style.display = 'block';
    });

    function showDashboard() {
        loginScreen.style.display = 'none';
        dashboardScreen.style.display = 'flex';
        renderAdminDishes();
    }

    // --- DASHBOARD LOGIC ---
    const addDishForm = document.getElementById('add-dish-form');
    const adminDishesList = document.getElementById('admin-dishes-list');

    function renderAdminDishes() {
        const dishes = window.DabaliDB.getDishes();
        adminDishesList.innerHTML = '';
        
        dishes.forEach(dish => {
            const el = document.createElement('div');
            el.className = 'admin-dish-item';
            el.innerHTML = `
                <div class="admin-dish-info">
                    <h4>${dish.name}</h4>
                    <p>${dish.category.toUpperCase()} - ${dish.price}</p>
                </div>
                <button class="btn-delete" data-id="${dish.id}"><i class="fas fa-trash"></i></button>
            `;
            adminDishesList.appendChild(el);
        });

        // Attach delete events
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if(confirm('Voulez-vous vraiment supprimer ce plat ?')) {
                    window.DabaliDB.deleteDish(id);
                    renderAdminDishes(); // refresh
                }
            });
        });
    }

    addDishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newDish = {
            name: document.getElementById('dish-name').value,
            category: document.getElementById('dish-category').value,
            price: document.getElementById('dish-price').value,
            img: document.getElementById('dish-img').value,
            desc: document.getElementById('dish-desc').value
        };

        window.DabaliDB.addDish(newDish);
        
        alert('Plat ajouté avec succès !');
        addDishForm.reset();
        renderAdminDishes();
    });

});
