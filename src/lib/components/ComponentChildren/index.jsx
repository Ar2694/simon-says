import React from "react";

export default function ComponentChildren(props) {

    return (
        <>
            {
                React.Children.map(props.children, (child) => {
                    if (React.isValidElement(child)) {
                        if (props.mapChildProps instanceof Function) {
                            return React.cloneElement(child, props.mapChildProps(child));
                        }

                        if (props.mapChild instanceof Function) {
                            return props.mapChild(child);
                        }
                    
                        if (props.childProps !== undefined) {
                            return React.cloneElement(child, props.childProps);
                        }

                        return React.cloneElement(child);
                    }
                    return child;
                })

            }
        </>
    );
}
