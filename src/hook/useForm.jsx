import { useState } from "react";

export const useForm = (inicialForm, validateForm) => {
  const [form, setform] = useState(inicialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };
  const handleBlur = (e) => {
      handleChange(e)

      let val=validateForm(form,e)
      console.log(val);
    setErrors({...errors,
        [e.target.name]:val[e.target.name]})
  };
  const handleSubmit = (e) => {};

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
