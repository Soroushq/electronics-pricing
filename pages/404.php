<?php
http_response_code(404);
?>
<div class="text-center py-5">
    <h1 class="display-1">404</h1>
    <h2 class="mb-4">صفحه مورد نظر یافت نشد</h2>
    <p class="lead mb-4">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>
    <a href="<?php echo BASE_URL; ?>" class="btn btn-primary">
        <i class="fas fa-home"></i> بازگشت به صفحه اصلی
    </a>
</div> 