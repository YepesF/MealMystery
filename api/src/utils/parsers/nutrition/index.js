/* eslint-disable indent */
const parseNutrition = (nutrition) => {
    return {
        nutrients: nutrition.nutrients?.map(n => ({
            name: n.name,
            amount: n.amount,
            unit: n.unit,
            percentOfDailyNeeds: n.percentOfDailyNeeds,
        })) || [],
        properties: nutrition.properties?.map(p => ({
            name: p.name,
            amount: p.amount,
            unit: p.unit,
        })) || [],
        flavonoids: nutrition.flavonoids?.map(f => ({
            name: f.name,
            amount: f.amount,
            unit: f.unit,
        })) || [],
        ingredients: nutrition.ingredients?.map(i => ({
            id: i.id,
            name: i.name,
            amount: i.amount,
            unit: i.unit,
            nutrients: i.nutrients?.map(n => ({
                name: n.name,
                amount: n.amount,
                unit: n.unit,
                percentOfDailyNeeds: n.percentOfDailyNeeds,
            })) || [],
        })) || [],
        caloricBreakdown: {
            percentProtein: nutrition.caloricBreakdown?.percentProtein || 0,
            percentFat: nutrition.caloricBreakdown?.percentFat || 0,
            percentCarbs: nutrition.caloricBreakdown?.percentCarbs || 0,
        },
        weightPerServing: {
            amount: nutrition.weightPerServing?.amount || 0,
            unit: nutrition.weightPerServing?.unit || "",
        },
    };
};

export { parseNutrition };
