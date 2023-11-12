import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuizList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchChapters() {
      // database related works
      const db = getDatabase();
      const quizsRef = ref(db, "chapters");
      const chapterQuery = query(
        quizsRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(chapterQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setChapters((prevChapters) => {
            return [...prevChapters, ...Object.values(snapshot.val())];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchChapters();
  }, [page]);

  return {
    loading,
    error,
    chapters,
    hasMore,
  };
}
