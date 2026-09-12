export default function ComponentDisplay(props) {
    const { when, fallback = null, children } = props;

    if (!when) {
        return fallback;
    }

    return children;
}