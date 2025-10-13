//评论数据管理
//1.获取评论数据
//2.添加评论数据

import { useCallback, useState } from "react";
import { useApi } from "./useApi";
import { useEffect } from "react";
export const useComments = () => {
  const [comments, setComments] = useState([]);
  const { request } = useApi();

  const fetchComments = useCallback(async () => {
    try {
      const data = await request("https://cs571.org/rest/s25/ice/comments");
      setComments(data);
    } catch (error) {
      console.error("fetch comments error:", error);

      alert("Fetch comments failed.");
    }
  }, [request]);

  const addComment = useCallback(
    async (comment) => {
      try {
        await request("https://cs571.org/rest/s25/ice/comments", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment }),
        });

        fetchComments();
        return true;
      } catch (error) {
        alert("Add comment failed.");
        return false;
      }
    },
    [request, fetchComments]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, fetchComments, addComment };
};
