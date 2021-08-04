import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Select as MuiSelect } from "@material-ui/core";
// formik
import { useField } from "formik";

function Select(props) {
    const { name, label, options, customValue, ...rest } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
                {label}
            </InputLabel>
            <MuiSelect
                labelId="demo-simple-select-outlined-label"
                name={name}
                {...rest}
                // id="demo-simple-select-outlined"
                // value={value}
                // onChange={onChange}
                label={label}
            >
                <MenuItem value="">
                    <em>Select a Value</em>
                </MenuItem>
                {options.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                        {customValue
                            ? `${JSON.stringify(item[`${customValue}`])}`
                            : item.value}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
}

export function MySelect(props) {
    const { name, label, options, ...rest } = props;
    const [field, meta] = useField(rest);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
                {label}
            </InputLabel>
            <MuiSelect
                labelId="demo-simple-select-outlined-label"
                name={name}
                {...field}
                label={label}
                helperText={errorText}
                error={!!errorText}
            >
                {options.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                        {item.value}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
}

export default Select;
