import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const CategoryList = ({fields}) => {
    const { dataGridProps } = useDataGrid({
    });

    const columns = React.useMemo<GridColDef[]>(
        () => fields,
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
