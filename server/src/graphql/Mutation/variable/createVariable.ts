import { variableModel } from '@models';

export const createVariable = async (
  _parent: undefined,
  args: { variableData: VariableDataType }
): Promise<VariableDataOutputType> => {
  try {
    const { variableData } = args;

    const findVariable = await variableModel.find({ key: variableData.key });

    if (!findVariable?.length) {
      await variableModel.create(variableData);
    }
    console.log({ findVariable });
    console.log(variableData);
    return {
      data: {},
      response: {
        status: 404,
        message: 'Key already exists in variable schema',
      },
    };
} catch (error) {
    console.log(error);
    return {
      data: {},
      response: {
        status: 404,
        message: 'Key already exists in variable schema',
      },
    };
  }
};
