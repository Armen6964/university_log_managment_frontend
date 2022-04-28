import moment from "moment";

export function generateQuery(tableState, fieldsType) {
    let { page, limit, sortedInfo, filteredInfo } = tableState;

    let query = {
        page,
        limit,
    };

    if (sortedInfo.field && sortedInfo.order) {
        query.sort = [sortedInfo.field, sortedInfo.order === "ascend" ? "ASC" : "DESC"];
    }

    for (let key in filteredInfo) {
        let value = filteredInfo[key];

        if (value) {
            let type = fieldsType[key];

            switch (type) {
                case "DATE":
                    if (!query.between) query.between = {};

                    let [from, to] = value;
                    query.between[key] = { from, to };

                    break;
                case "BOOLEAN":
                case "ENUM":
                    if (!query.filter_in) query.filter_in = {};
                    query.filter_in[key] = value;

                    break;
                default:
                    if (!query.search) query.search = {};
                    query.search[key] = value;

                    break;
            }
        }
    }

    return { query: JSON.stringify(query) };
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export function createFormData(data, fields) {
    let formData = new FormData();

    for (let key in fields) {
        let value = data[key];

        if (fields[key].isFile) {
            if (!Array.isArray(value)) continue;

            value.map(({ originFileObj }) => {
                if (originFileObj) formData.append(key, originFileObj);
            });
        } else {
            if (Array.isArray(value)) value = JSON.stringify(value);

            formData.append(key, value);
        }
    }

    return formData;
}

export function createFieldsValue(selectedRow, fields) {
    if (!selectedRow) selectedRow = {};

    let data = {};

    for (let key in fields) {
        let { type, isFile } = fields[key];

        let value = selectedRow[key];

        if (isFile) {
            data[key] = value || [];
        } else {
            switch (type) {
                case "DATE":
                    if (value) {
                        let date = moment(value);
                        value = date.isValid() ? date : null;
                    } else {
                        value = null;
                    }

                    break;
                case "BOOLEAN":
                    value = value ? true : false;
                    break;
                default:
                    value = value || "";
                    break;
            }

            data[key] = value;
        }
    }

    return data;
}
