    </div><!-- /.container -->

    <footer class="footer mt-5 py-3 bg-light">
        <div class="container">
            <div class="text-center">
                <p class="text-muted mb-0">
                    &copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?> - تمامی حقوق محفوظ است
                </p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    
    <!-- Select2 -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    
    <!-- Persian Datepicker -->
    <script src="https://unpkg.com/persian-date@latest/dist/persian-date.min.js"></script>
    <script src="https://unpkg.com/persian-datepicker@latest/dist/js/persian-datepicker.min.js"></script>
    
    <!-- Custom JS -->
    <script src="<?php echo BASE_URL; ?>/assets/js/main.js"></script>
    
    <script>
        // راه‌اندازی Select2
        $(document).ready(function() {
            $('.select2').select2({
                theme: 'bootstrap-5',
                dir: 'rtl'
            });
        });
        
        // راه‌اندازی Datepicker
        $(document).ready(function() {
            $('.datepicker').persianDatepicker({
                format: 'YYYY/MM/DD',
                initialValue: false,
                autoClose: true
            });
        });
        
        // فعال‌سازی tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // فعال‌سازی popovers
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
        
        // تایید حذف
        document.querySelectorAll('.delete-confirm').forEach(function(element) {
            element.addEventListener('click', function(e) {
                if (!confirm('آیا از حذف این مورد اطمینان دارید؟')) {
                    e.preventDefault();
                }
            });
        });
    </script>
</body>
</html> 