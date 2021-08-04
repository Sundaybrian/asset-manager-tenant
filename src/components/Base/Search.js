import React from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

function Search(props) {
    const { name, query, onChange, ...rest } = props;
    return (
        <form>
            <TextField
                name={name}
                fullWidth
                inputRef={query}
                type="text"
                onChange={onChange}
                placeholder="search for a  category"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                {...rest}
            />
        </form>
    );
}
// will figure out how to make you reusable
export default Search;
