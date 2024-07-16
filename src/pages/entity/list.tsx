import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {useMany} from "@refinedev/core";
import {DeleteButton, EditButton, List, ShowButton, useDataGrid,} from "@refinedev/mui";
import React from "react";
import ListFieldConfiguration from "../../listFieldConfiguration";


interface EntityListProps {
    fields: Array<ListFieldConfiguration>
}

export const EntityList = ({fields}: EntityListProps) => {
    const {dataGridProps} = useDataGrid({
        syncWithLocation: true,
    });

    // const {data: categoryData, isLoading: categoryIsLoading} = useMany({
    //     resource: "categories",
    //     ids: dataGridProps?.rows?.map((item: any) => item?.category?.id).filter(Boolean) ?? [],
    //     queryOptions: {
    //         enabled: !!dataGridProps?.rows,
    //     },
    // });

    let rows: GridColDef[] = [];
    fields.forEach((field: ListFieldConfiguration) => {
        rows.push(
            {
                field: field.fieldName,
                headerName: field.headerName ?? field.fieldName,
                type: field.type,
                minWidth: field.minWidth ?? 50,
                flex: field.flex ?? 1,
            }
        )
    })
    rows.push(
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell: function render({row}) {
                return (
                    <>
                        <EditButton hideText recordItemId={row.id}/>
                        <ShowButton hideText recordItemId={row.id}/>
                        <DeleteButton hideText recordItemId={row.id}/>
                    </>
                );
            },
            align: "center",
            headerAlign: "center",
            minWidth: 80,
        }
    )

    const columns = React.useMemo<GridColDef[]>(
        () => rows,
        []
        // [categoryData],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};


//[
//             {
//                 field: "id",
//                 headerName: "ID",
//                 type: "number",
//                 minWidth: 50,
//             },
//             {
//                 field: "title",
//                 flex: 1,
//                 headerName: "Title",
//                 minWidth: 200,
//             },
//             {
//                 field: "content",
//                 flex: 1,
//                 headerName: "content",
//                 minWidth: 250,
//                 renderCell: function render({ value }) {
//                     if (!value) return '-'
//                     return (
//                         <MarkdownField value={value?.slice(0, 80) + "..." || ""} />
//                     );
//                 },
//             },
//             {
//                 field:  "category",
//                 flex: 1,
//                 headerName: "Category",
//                 minWidth: 300,
//                 valueGetter: ({ row }) => {
//                     const value = row?.category;
//                     return value;
//                 },
//                 renderCell: function render({ value }) {
//                     return categoryIsLoading ? (
//                         <>Loading...</>
//                     ) : (
//                         categoryData?.data?.find((item) => item.id === value?.id)?.title
//                         );
//                     },
//             },
//             {
//                 field: "status",
//                 flex: 1,
//                 headerName: "Status",
//                 minWidth: 200,
//             },
//             {
//                     field: "createdAt",
//                 flex: 1,
//                 headerName: "Created at",
//                 minWidth: 250,
//                 renderCell: function render({ value }) {
//                     return <DateField value={value} />;
//                 },
//             },
//             {
//                 field: "actions",
//                 headerName: "Actions",
//                 sortable: false,
//                 renderCell: function render({ row }) {
//                     return (
//                         <>
//                             <EditButton hideText recordItemId={row.id} />
//                             <ShowButton hideText recordItemId={row.id} />
//                             <DeleteButton hideText recordItemId={row.id} />
//                         </>
//                     );
//                 },
//                 align: "center",
//                 headerAlign: "center",
//                 minWidth: 80,
//             },
//         ]
