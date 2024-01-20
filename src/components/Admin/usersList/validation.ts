import Joi from "joi";

const validator = Joi.object({
  login: Joi.string().required().messages({
    "string.empty": "login#Wpisz login",
  }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "password#Wpisz hasło",
    "string.min": "password#Hasło musi zawierać min 8 znaków",
  }),
  role: Joi.string().messages({
    "string.empty": "role#Wybierz role",
  }),
});

export default (formData): Joi.ValidationError => {
  const { error } = validator.validate(formData, { abortEarly: false });

  if (error !== undefined) {
    return error;
  }
};
