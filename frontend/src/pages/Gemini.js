import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const model_image = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const Gemini = () => {
    const [aiResponse, setResponse] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    async function aiRun() {
        setLoading(true);
        const prompt = `generate steps to cook ${search}. Generate it in the form of {"name": "recipe name","description" : "recipe description", "steps": ["step 1", "step 2", "step 3"]}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        try{
            console.log(JSON.parse(text));
        }
        catch{
            setResponse('Error generating recipe');
        }
        setResponse(text);
        setLoading(false);
    }

    // const getBase64 = (file) => new Promise(function (resolve, reject) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result)
    //     reader.onerror = (error) => reject('Error: ', error);
    // })
    
    // async function aiRunImage() {
    //     setLoading(true);
    //     const prompt = `generate steps to cook recipe in the image. Generate it in the form of {"name": "recipe name","description" : "recipe description", "steps": ["step 1", "step 2", "step 3"]}`;
    //     const result = await model_image.generateContent(prompt, { image: selectedFile });
    //     const response = await result.response;
    //     const text = response.text();
    //     console.log(text);
    //     try{
    //         console.log(JSON.parse(text));
    //     }
    //     catch{
    //         setResponse('Error generating recipe');
    //     }
    //     setResponse(text);
    //     setLoading(false);
    // }

    // button event trigger to consume gemini Api
    const handleClick = () => {
        aiRun();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
        // Perform upload logic here (e.g., send file to server)
            console.log('Generating recipe based on the image', selectedFile);
        // You can use Fetch API or any other method to send the file to your server
        } else {
            console.log('No file selected');
        }
    };
    return (
       <div>
           <h1>Generative AI Restaurant App!</h1>
       
           <div style={{ display: 'flex' }}>
             <input placeholder='Search for Recipe' onChange={(e) => handleChangeSearch(e)} />
             <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
           </div>
       
           {
             loading == true && search != '' ?
               <p style={{ margin: '30px 0' }}>Loading ...</p>
               :
               <div style={{ margin: '30px 0' }}>
                 <p>{aiResponse}</p>
               </div>
           }

           <div>
               <h2>Image Upload</h2>
               <input type="file" onChange={handleFileChange} accept="image/*" />
               <button onClick={handleUpload}>Upload</button>
           </div>
         </div>
    );
}

export default Gemini;