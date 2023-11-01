import { Item } from "../../schema/itemSchema";

const allItems = async (_parent: any, _args: any, _context: any) => {
  try {
    const allItemsWithName = await Item.aggregate([
      {
        $group: {
          _id: null,
          items: {
            $push: {
              k: "$itemName",
              v: {
                itemName: "$itemName",
                itemBarcode: "$itemBarcode",
                itemMRPperUnit: "$itemMRPperUnit",
                itemSellingPricePerUnit: "$itemSellingPricePerUnit"
              },
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $arrayToObject: "$items",
          },
        },
      },
    ]);

    const allItemsWithoutBarcode = await Item.aggregate([
      {
        $match: {
          itemBarcode: { $not: { $type: "number" } }, // Check if itemBarcode is a number
        },
      },
      {
        $group: {
          _id: "noBarcode",
          items: {
            $push: "$itemName",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const allItemsWithBarcode = await Item.aggregate([
      {
        $match: {
          $and: [
            { itemBarcode: { $exists: true } }, // Check if itemBarcode exists
            { itemBarcode: { $type: "number" } }, // Check if itemBarcode is a number
          ],
        },
      },
      {
        $group: {
          _id: "$itemBarcode",
          items: {
            $push: "$itemName",
          },
        },
      },
    ]);


    const result: any = {};

    allItemsWithBarcode.forEach((item) => {
      result[item._id] = item.items;
    });

    return {
      allItemsWithoutBarcode: allItemsWithoutBarcode[0]?.items,
      allItemsWithBarcode: result,
      allItemsWithName: allItemsWithName[0]
    };
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export { allItems };
