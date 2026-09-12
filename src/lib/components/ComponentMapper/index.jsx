import React from "react";

export default function ComponentMapper(props) {
    const { array = null, onMap = null, component = null } = props;

    if (array === null) {
        return null;
    }

    if (component !== null) {
        const children = array.map((item, index) => {
            if (React.isValidElement(component)) {
                return React.cloneElement(component, { ...item, key: index });
            } else if (typeof component === 'function') {

                const Component = component;
                return <Component {...item} key={index} />;
            }
            return null;
        });

        return children;
    }

    if (onMap !== null) {
        const children = array.map((item, index) => {
            return onMap(item, index);
        })

        return children;
    }

}