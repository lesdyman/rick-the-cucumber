interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const range = 4;
    let start = Math.max(page - Math.floor(range / 2), 1);
    let end = Math.min(start + range - 1, totalPages);

    if (end - start + 1 < range) {
      start = Math.max(end - range + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="join flex justify-center m-10">
      <button
        className="join-item btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        &lt; Prev
      </button>
      {getPageNumbers().map((num) => (
        <button
          key={num}
          className={`join-item btn ${page === num ? "btn-active" : ""}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="join-item btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next &gt;
      </button>
    </div>
  );
};
