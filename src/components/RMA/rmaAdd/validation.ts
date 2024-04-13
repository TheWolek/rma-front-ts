import Joi from "joi";

const regLines = /\s(\d){1,}$/;
const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validator = {
  firstStep: Joi.object({
    deviceCategory: Joi.string().required().messages({
      "string.empty": "deviceCategory#Wpisz kategorię",
    }),
    deviceProducer: Joi.string().required().messages({
      "string.empty": "deviceProducer#Wpisz producenta",
    }),
    deviceName: Joi.string().required().messages({
      "string.empty": "deviceName#Wpisz model",
    }),
    deviceSn: Joi.string().optional().allow("").min(3).messages({
      "string.min": "deviceSn#Wpisz numer seryjny",
    }),
  }),
  secondStep: Joi.object({
    type: Joi.string().required().valid("1", "2"),
    issue: Joi.string().required().messages({
      "string.empty": "issue#Wpisz opis problemu",
    }),
  }),
  thirdStep: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "name#Wpisz imię i nazwisko",
    }),
    phone: Joi.string().required().allow("").length(9).messages({
      // "string.empty": "phone#Wpisz numer telefonu",
      "string.length": "phone#Wpisz poprawny numer telefonu",
    }),
    email: Joi.string().required().allow("").regex(regEmail).messages({
      // "string.empty": "email#Wpisz adres email",
      "string.pattern.base": "email#Niepoprawny adres email",
    }),
  }),
  addressSection: Joi.object({
    lines: Joi.string().required().regex(regLines).messages({
      "string.empty": "lines#Wpisz ulicę i numer",
      "string.pattern.base": "lines#Wpisz ulicę i numer",
    }),
    postCode: Joi.string().required().length(6).messages({
      "string.empty": "postCode#Wpisz kod pocztowy",
    }),
    city: Joi.string().required().messages({
      "string.empty": "city#Wpisz miejscowość",
    }),
  }),
};

export const validate = (
  formData: { [key: string]: string },
  validator: Joi.ObjectSchema,
  cb: (field: string, message: string) => void
): boolean => {
  const { error } = validator.validate(formData, { abortEarly: false });

  if (error !== undefined) {
    const errorList = error.toString().split(":")[1].split(".");

    errorList.forEach((error) => {
      console.log(error);
      const field = error.split("#")[0].trim();
      const message = error.split("#")[1].trim();
      cb(field, message);
    });
    return false;
  }
  return true;
};
