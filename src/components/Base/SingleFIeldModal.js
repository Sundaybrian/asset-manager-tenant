import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Controls from "../Controls";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { Grid, Typography, makeStyles } from "@material-ui/core";

/*eslint-disable no-unused-vars*/
export function SingleFieldForm(props) {
    const { handleSubmit, label, validationSchema, handleClose } = props;
    return (
        <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, action) =>
                handleSubmit(values, action, handleClose)
            }
        >
            <Form>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Field
                            name="name"
                            type="text"
                            label={label}
                            component={TextField}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Ok
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
    dialogTitle: {
        paddingRight: "0px",
    },
}));

export default function SingleFieldModal({
    title,
    data,
    render,
    onSave,
    menuID,
    companyID,
    addCategoryMenu,
    children,
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {render(handleClickOpen)}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle
                    id="form-dialog-title"
                    className={classes.dialogTitle}
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            style={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        <Controls.ActionButton
                            color="secondary"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Controls.ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {React.cloneElement(children, {
                        handleClose,
                    })}
                </DialogContent>
            </Dialog>
        </>
    );
}

export function SingleFieldModal2({ title, handleClose, open, children }) {
    const classes = useStyles();

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle
                    id="form-dialog-title"
                    className={classes.dialogTitle}
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            style={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        <Controls.ActionButton
                            color="secondary"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Controls.ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
            </Dialog>
        </>
    );
}
