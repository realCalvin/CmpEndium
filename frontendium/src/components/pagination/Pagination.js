import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.css';

function PaginationComponent(props) {
    let currentPage = props.currentPage;
    let totalPages = props.totalPages;
    let numOfPages = (window.innerWidth > 700) ? 5 : 3;
    // eslint-disable-next-line
    let [page, setPage] = useState({ start: 1, end: numOfPages })

    if (currentPage > page.end) {
        page.start += numOfPages;
        page.end += numOfPages;
    }
    if (currentPage < page.start) {
        page.start -= numOfPages;
        page.end -= numOfPages;
    }

    let items = [];
    for (let number = page.start; number <= page.end; number++) {
        if (number <= totalPages) {
            items.push(
                <Pagination.Item
                    key={number}
                    id={number}
                    active={number === currentPage}
                    onClick={handlePages}>
                    {number}
                </Pagination.Item>
            );
        }
    }

    function handlePages(e) {
        props.setCurrentPage(Number(e.target.id));
    }

    function handlePrevPage() {
        if (currentPage !== 1) {
            props.setCurrentPage(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage !== totalPages) {
            props.setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div id="Pagination">
            <Pagination>
                <Pagination.Prev onClick={handlePrevPage} />
                {items}
                <Pagination.Next onClick={handleNextPage} />
            </Pagination>
        </div>
    )
}

export default PaginationComponent;