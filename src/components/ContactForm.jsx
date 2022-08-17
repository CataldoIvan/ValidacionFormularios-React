import { useForm } from "../hook/useForm";
import { FormMessageError } from "../components/FormMessageError/FormMessageError";

const inicialForm = {
  name: "",
  email: "",
  subject: "",
  comments: "",
};

const validationsForm = (form, e) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  switch (e.target.name) {
    case "name":
      if (!form.name.trim()) {
        errors.name = `El campo ${e.target.name} es requerido`;
        return errors;
      }

      break;

    case "email":
      if (!form.email) errors.email = `El campo ${e.target.name} es requerido`;

      break;

    case "subject":
      if (!form.subject)
        errors.subject = `El campo ${e.target.name} es requerido`;

      break;

    case "comments":
      if (!form.comments)
        errors.comments = `El campo ${e.target.name} es requerido`;

      break;

    default:
      break;
  }

  return errors;
};

const ContactForm = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(inicialForm, validationsForm);

  return (
    <>
      <div>
        <h2>Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            onChange={handleChange}
            value={form.name}
            onBlur={handleBlur}
            className={errors.name ? "error" : null}
          />
          {errors.name && <FormMessageError msg={errors.name} />}
          <input
            type="email"
            name="email"
            placeholder="Escribe tu email"
            onChange={handleChange}
            value={form.email}
            onBlur={handleBlur}
            className={errors.email ? "error" : null}
          />
          {errors.email && <FormMessageError msg={errors.email} />}
          <input
            type="text"
            name="subject"
            placeholder="Escribe tu Asunto"
            onChange={handleChange}
            value={form.subject}
            onBlur={handleBlur}
            className={errors.subject ? "error" : null}
          />
          {errors.subject && <FormMessageError msg={errors.subject} />}
          <textarea
            name="comments"
            id="comments"
            cols="10"
            rows="5"
            onChange={handleChange}
            value={form.comments}
            onBlur={handleBlur}
            className={errors.comments ? "error" : null}
          ></textarea>
          {errors.comments && <FormMessageError msg={errors.comments} />}
          <input type="submit" value={"Enviar"} />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
