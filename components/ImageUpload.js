import react from "react";

const ImageUpload = (props) => {

    return (
        <div>
            <input id={props.id} type="file" accept=".jpg, .jpg, .jpeg"/>
        </div>
    );
};

export default ImageUpload;
