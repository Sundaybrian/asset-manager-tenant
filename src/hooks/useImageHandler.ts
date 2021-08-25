import React from "react";
import { setSuccess, setErrors } from "../redux/Actions/alertActions";
// expand for docs
const useImageHandler = ({ accept }) => {
    const [file, setFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null); //once we have an image, we will duplicate it here
    const types =
        accept == true
            ? [
                  "application/pdf",
                  "application/doc",
                  "application/docx",
                  ".doc",
                  ".docx",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]
            : ["image/png", "image/jpeg", "image/jpg"];

    const imageChangeHandler = (e) => {
        const selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            console.log(selected);
            setSuccess("file set successfully");

            // clearError
        } else {
            setFile(null);
            accept !== undefined
                ? setErrors("please select a doc or pdf or jpg file")
                : setErrors("please select a file with a jpg or jpeg format");
            // setALertError e,g select an image file (png or jpeg)
        }
    };

    return {
        file,
        setFile,
        imageChangeHandler,
        imageUrl,
        setImageUrl,
    };
};

export default useImageHandler;
