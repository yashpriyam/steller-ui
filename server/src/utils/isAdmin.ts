import { variableModel } from "@models";

export async function isAdmin(email: string) {
  const response = await variableModel.findOne({ key: "adminEmail" });
  if (response) {
    return response.value[0] === email;
  }

  return false;
}
