import { useCallback, useState } from "react";

// 思考：所有API调用都有共同的模式
// 1. 设置请求头（包括X-CS571-ID）
// 2. 处理响应
// 3. 处理错误
// 4. 提供加载状态
export const useApi = () => {
  // request state management
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //core request function
  const request = useCallback(async (URL, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(URL, {
        ...options,
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { request, loading, error };
};
