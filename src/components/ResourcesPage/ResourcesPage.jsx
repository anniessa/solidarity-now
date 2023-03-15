import { useSelector } from "react-redux";

function ResourcesPage(){

    // gathering ALL resources from the post store once approved by the Admin
    const post = useSelector(store => store.post);

    return (
        <h2>Resources</h2>

    )
}

export default ResourcesPage;