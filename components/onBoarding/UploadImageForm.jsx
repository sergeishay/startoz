
'use client';
import { useState, useEffect,useRef } from 'react';
import Image from 'next/image';

import ButtonSubmit from './ButtonSubmit';

const UploadImageForm = () => {
    const [files, setFiles] = useState("");


    const handleInputFile = async (e) => {  
        const file = e.target.files[0];
        console.log(file);
        // const base64 = await convertBase64(file);
        const urlFormat = URL.createObjectURL(file);
        console.log(urlFormat);
        console.log(typeof urlFormat);
        setFiles(urlFormat);
        console.log(files);
    }
    

  return (
    <div>

            <input type="file" name="file" onChange={handleInputFile} />
            <div>
                <Image src={files} alt="image" width={200} height={200} />
            </div>
            <ButtonSubmit value="Upload Image" />
    </div>
  )
}

export default UploadImageForm