const allItems = async (_parent: any, _args: any, context: any) => {
  console.log("hits all items api");
  return "Hello world";
};

export { allItems };
