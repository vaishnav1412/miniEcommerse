export const productFormValidation = (formdata) => {
    const error = {};
    const { name, price, description, image } = formdata

    error.name = !name || name.trim() === "" ? "Name is required" : "";

    error.price = !price || price.trim() === "" ? "price is required" : "";

    error.description = !description || description.trim() === "" ? "description is required" : "";

    error.image = !image ? "image is required" : "";

    return error;

}