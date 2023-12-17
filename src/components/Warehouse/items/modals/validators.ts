import Joi from "joi";

const barcodeReg = /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/;
const snReg = /^[A-z0-9]{3,}$/;

export default {
  createItem: Joi.object({
    barcode: Joi.string().required().regex(barcodeReg).messages({
      "string.empty": "Podaj kod kreskowy",
      "string.pattern.base": "Zły format kodu",
    }),
    sn: Joi.string().required().regex(snReg).messages({
      "string.empty": "Podaj numer seryjny",
      "string.pattern.base": "Zły format sn",
    }),
  }),
};
