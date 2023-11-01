import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum InventoryItemCategory {
    Bakery
    Random
  }

  type ImageType {
    public_id: String
    secure_url: String
  }

  type UseByDateType {
    date: String
    value: Int
  }

  type SlabPriceArray {
    index: Int
    units: Int
    price: Int
  }

  type ItemData {
    itemName: String
    itemBarcode: Float
    itemStockQuantity: Int
    minimumStockQuantity: Int
    itemMRPperUnit: Float
    itemDiscountPerUnit: Float
    itemPerUnitDiscountPercentage: Float
    isDeleted: Boolean
    permanentlyOutOfStock: Boolean
    itemCostPricePerUnit: Float
    itemSellingPricePerUnit: Float
    createdAt: String
    lastUpdateAt: String
    slabPricing: [SlabPriceArray]
    minStockReached: Boolean
    itemBrandName: String
    itemCategory: InventoryItemCategory
    useByDate: [UseByDateType]
    quantityUnitName: String
    gstPercentage: Float
    itemPerUnitQuantity: Float
    images: [ImageType]
  }

  type allBillingItemsData {
    allItemsWithoutBarcode: [String]
    allItemsWithBarcode: JSON
    allItemsWithName: JSON
  }

  type Query {
    allItems: allBillingItemsData
  }

  type Mutation {
    login: String
  }

  scalar DateTime
  scalar JSON
`;

export default typeDefs;
