import {Box, TextField} from "@mui/material";
import {Edit, useAutocomplete} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import React, {ReactNode} from "react";
import EditFieldConfiguration from "../../editFieldConfiguration";

interface EntityEditProps {
    fieldsConfiguration?: Array<EditFieldConfiguration>
}

export const EntityEdit = ({fieldsConfiguration}: EntityEditProps) => {
    const {
        saveButtonProps,
        refineCore: {queryResult, formLoading},
        register,
        formState: {errors},
    } = useForm({});

    const blogPostsData = queryResult?.data?.data;

    const {autocompleteProps: categoryAutocompleteProps} = useAutocomplete({
        resource: "categories",
        defaultValue: blogPostsData?.category?.id,
    });

    let renderedFields: Array<ReactNode> = [];
    fieldsConfiguration?.forEach((fieldConfiguration: EditFieldConfiguration) => {
        console.log("asdfasdf)");
        renderedFields.push(
            <TextField
                key={fieldConfiguration.fieldName}
                {...register(fieldConfiguration.fieldName, {
                    // required: "This field is required", //TODO validation subcollection if field
                    required: false
                })}
                error={!!(errors as any)?.[fieldConfiguration.fieldName]}
                helperText={(errors as any)?.[fieldConfiguration.fieldName]?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                type="text"
                label={fieldConfiguration.label ?? fieldConfiguration.fieldName}
                name={fieldConfiguration.fieldName}
                // multiline
                // rows={2}
            />
        )

    });

    return (
        <Edit key="form-edit" isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                key="form-box"
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                {renderedFields}
            </Box>
        </Edit>
    );
};
