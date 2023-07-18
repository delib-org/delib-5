export function updateArray(
  currentArray: Array<any>,
  newItem: any,
  updateByProperty: string
): Array<any> {
  try {
    const arrayTemp = [...currentArray];

    if (!newItem[updateByProperty]) {
      throw new Error(`Item dont have property ${updateByProperty}`);
    }
    //find in array;
    const index = arrayTemp.findIndex(
      (item) => item[updateByProperty] === newItem[updateByProperty]
    );
    if (index === -1) arrayTemp.push(newItem);
    else {
      const oldItem = JSON.stringify(arrayTemp[index]);
      const newItemString = JSON.stringify({ ...arrayTemp[index], ...newItem });
      if (oldItem !== newItemString) arrayTemp[index] = { ...arrayTemp[index], ...newItem };


    }

    return arrayTemp;
  } catch (error) {
    console.error(error);
    return currentArray;
  }
}