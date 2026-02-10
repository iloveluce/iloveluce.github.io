document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('tr[data-href]').forEach(function(row) {
        row.addEventListener('click', function() {
            window.open(this.dataset.href, '_blank', 'noopener,noreferrer');
        });
    });
});
