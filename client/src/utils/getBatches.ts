export const getBatches = (batchData:[]) => {
    const batches = batchData?.map((batch: { [key: string]: string }) => {
      return {
        text: batch?.batchCode,
        value: batch?.batchCode,
      };
    });
    return batches
}