import {useState} from "react"
import {GoChevronLeft, GoChevronRight} from "react-icons/go"

const visiblePages = 5

const getPages = (current, total, maxVisible = visiblePages) => {
    const pages = []
    if (total <= maxVisible || current <= maxVisible) {
        for (let i = 1; i <= maxVisible; i++) {
            pages.push(i)}
        return pages
    }

    const visibleWindow = maxVisible - 2
    const end = Math.min(current, total - 1)
    const start = Math.max(1, end - visibleWindow + 1)
    const windowEnd = Math.min(start + visibleWindow - 1, total - 1)

    for (let i = start; i <= windowEnd; i++) {
        pages.push(i)}
    pages.push("...")
    pages.push(total)
    return pages
}

// no page redirection yet
const Pagination = (props) => {
    const {pageNumber} = props
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageClick = (page) => {
        setCurrentPage(page)
    }
    const handleRightClick = () => {
        setCurrentPage((prev) => Math.min(prev + 1, pageNumber))
    }
    const handleLeftClick = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const visiblePages = getPages(currentPage, pageNumber)

    return (
        <div className="flex flex-row">
            {currentPage > 1 && (<button onClick = {handleLeftClick} className="cursor-pointer">
                <GoChevronLeft/>
            </button>)}
            {visiblePages.map((page) =>
                page === "..." ? (
                    <div key="dot" className="flex items-center p-2">...</div>
                ) : (
                    page === currentPage ? (
                    <div key={page}
                        onClick={() => handlePageClick(page)}
                        className={"hover:bg-gray-100 flex items-center border p-2 cursor-pointer bg-gray-100"}>
                        {page}
                    </div>
                    ) : (
                    <div key={page}
                        onClick={() => handlePageClick(page)}
                        className={"hover:bg-gray-100 flex items-center border p-2 cursor-pointer"}>
                        {page}
                    </div>
                    )

                )
            )}
            {currentPage < pageNumber && (<button onClick = {handleRightClick} className="cursor-pointer">
                <GoChevronRight/>
            </button>)}
        </div>
    )

}

export default Pagination
