import Joi from "joi";

const regLines = /\s\d$/;
const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validator = Joi.object({
  deviceCat: Joi.string().required().messages({
    "string.empty": "deviceCat#Wpisz kategorię",
  }),
  deviceProducer: Joi.string().required().messages({
    "string.empty": "deviceProducer#Wpisz producenta",
  }),
  deviceName: Joi.string().required().messages({
    "string.empty": "deviceName#Wpisz model",
  }),
  deviceSn: Joi.string().required().messages({
    "string.empty": "deviceSn#Wpisz numer seryjny",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name#Wpisz imię i nazwisko",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "phone#Wpisz numer telefonu",
  }),
  email: Joi.string().required().regex(regEmail).messages({
    "string.empty": "email#Wpisz adres email",
    "string.pattern.base": "email#Niepoprawny adres email",
  }),
  lines: Joi.string().required().regex(regLines).messages({
    "string.empty": "lines#Wpisz ulicę i numer",
    "string.pattern.base": "lines#Wpisz ulicę i numer",
  }),
  postCode: Joi.string().required().messages({
    "string.empty": "postCode#Wpisz kod pocztowy",
  }),
  city: Joi.string().required().messages({
    "string.empty": "city#Wpisz miejscowość",
  }),
  damageType: Joi.string().required().messages({
    "string.empty": "damageType#Wybierz stan urządzenia",
  }),
  deviceAccessories: Joi.array().items(Joi.number()).min(1).messages({
    "array.min": "deviceAccessories#Wybierz akcesoria",
  }),
  type: Joi.number().required(),
  issue: Joi.string().required().messages({
    "string.empty": "issue#Wpisz opis problemu",
  }),
  damageDescription: Joi.string().optional().allow(""),
});

export default (formData): Joi.ValidationError => {
  const { error } = validator.validate(formData, { abortEarly: false });

  if (error !== undefined) {
    return error;
  }
};
