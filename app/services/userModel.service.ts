import axios from "@/utils/axios";
import { auth } from "@/services/firebase";
import { UserModel } from "@/components/editor/sideBar/components/model/models.types";

export const getModels = async (productId?: string): Promise<UserModel[]> => {
  return [];
};

export const addModel = async (
  productId: string,
  product: Omit<UserModel, "id">
): Promise<void> => {
  console.log("product");
};

export const deleteModel = async (
  ProjectId: string,
  modelId: string
): Promise<void> => {
  console.log("product");
};
