import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import QuizCard from "./QuizCard";
import useChapterList from "../hooks/useChapterList";

export default function HomeCom() {
  const [page, setPage] = useState(1);
  const { loading, error, chapters, hasMore } = useChapterList(page);

  return (
    <div>
      {chapters.length > 0 && (
        <InfiniteScroll
          dataLength={chapters.length}
          hasMore={hasMore}
          loader="Loading..."
          next={() => setPage(page + 8)}
        >
          {chapters.map((chapter) =>
            chapter.noq > 0 ? (
              <Link
                to={{
                  pathname: `/quiz/${chapter.chapterID}`,
                  state: {
                    chapterTitle: chapter.title,
                  },
                }}
                key={chapter.chapterID}
              >
                <QuizCard
                  title={chapter.title}
                  id={chapter.chapterID}
                  noq={chapter.noq}
                />
              </Link>
            ) : (
              <QuizCard
                title={chapter.title}
                id={chapter.chapterID}
                noq={chapter.noq}
                key={chapter.chapterID}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && chapters.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
