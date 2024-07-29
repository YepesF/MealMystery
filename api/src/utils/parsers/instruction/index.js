/* eslint-disable indent */
const parseInstructions = (instructions) => {
    return instructions?.map(instruction => ({
        name: instruction.name,
        steps: instruction.steps?.map(step => ({
            step: step.step,
            number: step.number,
            length: step.length
                ? {
                    unit: step.length.unit,
                    number: step.length.number,
                }
                : null,
            equipment: step.equipment?.map(e => ({
                id: e.id,
                name: e.name,
                image: e.image,
                localizedName: e.localizedName,
            })) || [],
            ingredients: step.ingredients?.map(i => ({
                id: i.id,
                name: i.name,
                image: i.image,
                localizedName: i.localizedName,
            })) || [],
        })) || [],
    })) || [];
};

export { parseInstructions };
