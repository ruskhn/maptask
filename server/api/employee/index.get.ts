import { EMPLOYEE_LIST } from "~/server/mocks";

export default defineEventHandler(async (event) => {
  return EMPLOYEE_LIST;
});
