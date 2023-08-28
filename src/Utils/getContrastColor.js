export default function getContrastColor(bgColor) {
    // Remove any leading/trailing whitespaces and convert to lowercase
    bgColor = bgColor.trim().toLowerCase();

    // Convert hexadecimal colors to RGB format if necessary
    if (bgColor.startsWith("#")) {
        bgColor =
            "#" + bgColor.slice(1).replace(bgColor.length < 5 && /./g, "$&$&");
    }

    // Extract RGB values from the background color
    const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        bgColor
    ) || [null, 0, 0, 0];

    // Calculate relative luminance using the formula for sRGB color space
    const luminance =
        0.2126 * parseInt(r, 16) +
        0.7152 * parseInt(g, 16) +
        0.0722 * parseInt(b, 16);

    // Choose the best contrasting color based on luminance
    return luminance > 128 ? "black" : "white";
}
