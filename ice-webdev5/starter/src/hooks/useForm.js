//思考：表单管理共有的模式
//1. 初始化表单字段
//2.处理输入变化
//3.重置表单
//4.获取表单值

import { useCallback, useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return { values, handleChange, resetForm };
};
