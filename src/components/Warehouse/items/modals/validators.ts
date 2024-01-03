import Joi from "joi";

export const barcodeReg = /^RMA\/(\d){8}\/(\d){4}$/;
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
