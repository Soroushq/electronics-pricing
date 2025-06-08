// توابع کمکی
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner-border text-primary loading-spinner" role="status"></div>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// مدیریت فرم‌ها
document.addEventListener('DOMContentLoaded', function() {
    // فرم‌های AJAX
    const forms = document.querySelectorAll('form[data-ajax="true"]');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            showLoading();

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData
                });

                const result = await response.json();
                
                if (result.success) {
                    showAlert('success', result.message);
                    if (result.redirect) {
                        setTimeout(() => {
                            window.location.href = result.redirect;
                        }, 1000);
                    }
                } else {
                    showAlert('danger', result.message);
                }
            } catch (error) {
                showAlert('danger', 'خطا در ارسال اطلاعات');
                console.error(error);
            } finally {
                hideLoading();
            }
        });
    });

    // نمایش هشدار
    function showAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alert, container.firstChild);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // تایید حذف
    const deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm(this.dataset.confirm)) {
                e.preventDefault();
            }
        });
    });

    // جستجوی زنده
    const searchInputs = document.querySelectorAll('[data-search]');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(async function() {
            const searchTerm = this.value;
            const target = this.dataset.search;
            const resultsContainer = document.querySelector(target);
            
            if (searchTerm.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }

            showLoading();
            try {
                const response = await fetch(`/api/search.php?term=${encodeURIComponent(searchTerm)}`);
                const results = await response.json();
                
                resultsContainer.innerHTML = results.map(item => `
                    <div class="search-result-item">
                        <a href="${item.url}">${item.title}</a>
                    </div>
                `).join('');
            } catch (error) {
                console.error(error);
            } finally {
                hideLoading();
            }
        }, 300));
    });
});

// تابع debounce برای بهینه‌سازی جستجو
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 