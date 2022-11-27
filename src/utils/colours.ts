const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

const generateLocationColours = (locationArray: Array<any>, i: number) => {
    const colours = locationArray.map((e, i)=>{
        return `#${genRanHex(6)}`
    })
    return colours[i]
}

const randomColour = (locationArray: Array<any>, i: number) => {
    return { fillColor: `${generateLocationColours(locationArray, i)}`, color: "red", weight: 1 };
};

export const colours = (locationArray: Array<any>, i: number) => {
    return Object.assign({}, randomColour(locationArray, i))
};
