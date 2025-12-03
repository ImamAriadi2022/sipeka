
const ReportPagination = ({ pagination, onPageChange }) => {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="report-pagination">
      <div className="pagination-info">
        Menampilkan {startItem}-{endItem} dari {total} laporan
      </div>
      
      <div className="pagination-controls">
        <button 
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          ← Sebelumnya
        </button>
        
        {generatePageNumbers().map(pageNum => (
          <button
            key={pageNum}
            className={`pagination-btn ${page === pageNum ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        
        <button 
          className="pagination-btn"
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};

export default ReportPagination;