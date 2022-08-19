import { useState } from "react";
import { helpFetch } from "../helpers/helperFetch";

export const useForm = (inicialForm, validateForm) => {
  const [form, setform] = useState(inicialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ res: null, type: null });
  let api = helpFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };
  const handleBlur = (e) => {
    handleChange(e);

    let value = validateForm(form, e);

    if (value) {
      setErrors({ ...errors, [e.target.name]: value[e.target.name] });
    } else {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let respuesta;
    //console.log(form);
    if (
      errors.name === null &&
      errors.email === null &&
      errors.subject === null &&
      errors.comments === null
    ) {
      setLoading(true);
      respuesta = api
        .post(`https://formsubmit.co/ajax/${form.email}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: form,
        })
        .then((res) => {
          if(res.success){
            console.log(res);
            setLoading(false);
            setResponse({
              res: true,
              type: "success",
              msj: `mensaje enviado con exito a ${form.email}`,
            });
            setform(inicialForm)
            setTimeout(() => {
              setResponse({ res: null, type: "" });
            }, 4000);
          }else{
            setLoading(false);
            setResponse({
              res: true,
              type: "errort",
              msj: `Hubo un error en la peticion`,
            });
            setTimeout(() => {
              setResponse({ res: null, type: "" });
            }, 4000);

          }
        });

      setTimeout(() => {
        setResponse({ res: null, type: "" });
      }, 4000);
    } else {
      setResponse({
        res: true,
        type: "errort",
        msj: `Los campos no pueden estar vacios`,
      });

      setTimeout(() => {
        setResponse({ res: null, type: "", msj: "" });
      }, 4000);
    }
  };

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
