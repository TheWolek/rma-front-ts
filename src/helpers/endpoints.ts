const url = "http://localhost:3000";

export const getUrl = (path: string) => `${url}${path}`;

export default {
  login: "/auth/login",
  rmaDictionaryDamageTypes: "/rma/dictionary/getDict/damages",
  rmaDictionaryAccessoriesTypes: "/rma/dictionary/getDict/accessories",
  rmaDictionaryStatusesTypes: "/rma/dictionary/getDict/statuses",
  rmaDictionaryResultTypes: "/rma/dictionary/getDict/results",
  rmaAccessories: "/rma/accessories",
  rmaWaybills: "/rma/waybills",
  rmaCreate: "/rma/create",
  rmaPage: "/rma",
};
