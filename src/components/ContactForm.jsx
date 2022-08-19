import { useForm } from "../hook/useForm";
import { FormMessageError } from "../components/FormMessageError/FormMessageError";
import Loading from "./Loading/Loading";
import swal from 'sweetalert';
import Notification from "./Notification/Notification";


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


  switch (e.target.name) {
    case "name":
      if (!form.name.trim()) {
        errors.name = `El campo ${e.target.name} es requerido`;
      } else if (!regexName.test(form.name.trim())) {
        errors.name = `En el campo ${e.target.name} solo se permiten 'Numeros'`;
      } else {
        errors.name = null;
      }

      break;

    case "email":
      if (!form.email) {
        errors.email = `El campo ${e.target.name} es requerido`;
      } else if (!regexEmail.test(form.email.trim())) {
        errors.email = `El ${e.target.name} debe ser valido`;
      } else {
        errors.email = null;
      }

      break;

    case "subject":
      if (!form.subject) {
        errors.subject = `El campo ${e.target.name} es requerido`;
      } else {
        errors.subject = null;
      }

      break;

    case "comments":
      if (!form.comments) {
        errors.comments = `El campo ${e.target.name} es requerido`;
      } else if (form.comments.length > 255) {
        errors.comments = `En el campo ${e.target.name} solo puede escribir 255 caracteres. Escribiste ${form.comments.length} caracteres`;
      } else {
        errors.comments = null;
      }

      break;

    default:
      {
      }
      break;
  }

  return errors;
};
const noti=()=>{
  return  swal("", "Nada que buscar", "warning");
}

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
      <div className="container">
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
            placeholder={"Cant max 255 caracteres"}
            className={errors.comments ? "error" : null}
          ></textarea>
          {errors.comments && <FormMessageError msg={errors.comments} />}
          <input disabled={loading}  type="submit" value={"Enviar"} />
        </form>
        {loading && <Loading/>}
   
        {response.res &&<Notification type={response.type} msj={response.msj}/>}
      </div>
    </>
  );
};

export default ContactForm;
