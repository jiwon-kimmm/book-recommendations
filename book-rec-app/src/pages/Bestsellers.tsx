import { ReviewModal } from "../components/ReviewModal";
import { MainPanel, MiddlePane, RightPane } from "../components/MainPanel";
import BookCard from "../components/BookCard";
import { SearchBar } from "../components/SearchBar";
import { dummyRecommendations } from "../data/books";

export default function Bestsellers () {
    return (
        <>
            <BookCard
                title={"Title"}
                author={"Author"}
                rating={"5"}
                summary={"Summary"}
                image_url={"https://m.media-amazon.com/images/I/61su39k8NUL._AC_UF1000,1000_QL80_.jpg"}
                book_id={4}
            />
        </>
    );
} 
