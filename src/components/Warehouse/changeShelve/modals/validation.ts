import Joi from "joi";

const shelveReg = /^([A-Z]){1,}_([A-Z]){1,}_([0-9]){1,}$/;

const validator = Joi.object({
  active_code: Joi.string().required().regex(shelveReg).messages({
    "string.empty": "active_code#Podaj kod lokalizacji",
    "string.pattern.base": "active_code#Zły format kodu",
  }),
  new_code: Joi.string().required().regex(shelveReg).messages({
    "string.empty": "new_code#Podaj kod lokalizacji",
    "string.pattern.base": "new_code#Zły format kodu",
  }),
});

export default (formData: { active_code: string; new_code: string }) => {
  const { error } = validator.validate(formData, { abortEarly: false });

  if (error !== undefined) {
    return error;
  }
};
