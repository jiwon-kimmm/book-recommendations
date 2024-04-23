import { ReviewModal } from "../components/ReviewModal";
import { MainPanel, MiddlePane, RightPane } from "../components/MainPanel";
import BookCard from "../components/BookCard";

export default function Bestsellers () {
    return (
        <>
            <MiddlePane>
                <BookCard
                    title={"Title"}
                    author={"Author"}
                    rating={"5"}
                    summary={"Summary"}
                    image_url={"https://m.media-amazon.com/images/I/61su39k8NUL._AC_UF1000,1000_QL80_.jpg"}
                />
            </MiddlePane>
            <RightPane>
                <ReviewModal current_book_id={123}></ReviewModal>
            </RightPane>
        </>
    );
} 
