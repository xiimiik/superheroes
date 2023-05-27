import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useSearchParams } from "react-router-dom";

const getNumbers = (from, to) => {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
};

const PaginationTemplate = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = 5;
  const pageCount = Math.ceil(total / perPage);
  const maxPageLinks = 3;
  const pageOffset = Math.floor(maxPageLinks / 2);
  const pageStart = Math.max(1, currentPage - pageOffset);
  const pageEnd = Math.min(pageCount, pageStart + maxPageLinks - 1);
  const pageNumbers = getNumbers(pageStart, pageEnd);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  const changeToPrevPage = () => {
    setSearchParams({ page: currentPage - 1 });
  };

  const changeToNextPage = () => {
    setSearchParams({ page: currentPage + 1 });
  };

  const handle = (num) => {
    setSearchParams({ page: num });
  };

  return (
    <Pagination aria-label="Page navigation example" size="lg" className="d-flex justify-content-center">
      <PaginationItem disabled={isFirstPage} >
        <PaginationLink previous onClick={changeToPrevPage}/>
      </PaginationItem>
      {pageNumbers.map((num) => (
        <PaginationItem key={num} active={num === currentPage}>
          <PaginationLink onClick={() => handle(num)}>{num}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={isLastPage} >
        <PaginationLink next onClick={changeToNextPage}/>
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationTemplate;
