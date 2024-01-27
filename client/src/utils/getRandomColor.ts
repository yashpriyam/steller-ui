export const getRandomColor = (format: "hex" | "rgb" | "rgba" = 'hex'): string => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    if (format === 'hex') {
        return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    }
    else if (format === 'rgb') {
        return `rgb(${red}, ${green}, ${blue})`;
    }
    else {
        const alpha = Math.random().toFixed(2);
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
}