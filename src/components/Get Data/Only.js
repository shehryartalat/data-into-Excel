export const getWarehouseData = async () => {

    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DATA}warehouse`, {
        method: "GET",
    });
    const result = await response.json();

    return result.results.data;
}