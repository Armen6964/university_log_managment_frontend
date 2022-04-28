import { useEffect } from "react";

export default function useColumns (columns, setColumns, page) {

    useEffect(() => {

        let table_columns = localStorage.getItem(page + "_table_columns");

        if (table_columns) {
            try {
                table_columns = JSON.parse(table_columns);
            } catch (e) {
                table_columns = {};
            }
        } else {
            table_columns = {};
        }

        let _columns = [...columns];

        _columns.map((column) => {
            let { key } = column;
            column.visible = table_columns[key] == undefined || table_columns[key] == true;
        });

        setColumns(_columns);

    }, []);

    const onChangeColumns = (e) => {

        let { index, checked } = e.target;

        let _columns = [...columns];

        _columns[index].visible = checked;

        setColumns(_columns);

        let table_columns = {};

        columns.map(function (column) {
            table_columns[column.key] = column.visible;
            return column;
        });

        localStorage.setItem(page + "_table_columns", JSON.stringify(table_columns));
    };

    return [onChangeColumns];

}