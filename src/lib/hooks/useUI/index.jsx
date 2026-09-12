export default function useUI(props = {}) {
    const { textField = {}, button = {}, select = {} } = props;
    const ui = {
        setUI: (p) => {
            return { ...p };
        },
        textField: {
            ...textField,
            value: props.value ?? "",
            error: props.error ?? false,
            onChange: props.onChange ?? (() => { }),
        },
        button:{
            ...button,
            onClick: props.onClick ?? (() => { }),
            children: props.children ?? props.text ?? "",
        },
        select:{
            ...select,
            variant: props.variant ?? "outlined",
            value: props.value ?? "",
            error: props.error ?? false,
            onChange: props.onChange ?? (() => { }),
        }
    }

    return ui;

}

