import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { json } from "react-router-dom";
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const model_image = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const Gemini = () => {
    const [aiResponse, setResponse] = useState('');
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        steps: []
      });
    const [selectedFile, setSelectedFile] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleNameChange = (event) => {
        setRecipe({
          ...recipe,
          name: event.target.value
        });
      };
    
      const handleDescriptionChange = (event) => {
        setRecipe({
          ...recipe,
          description: event.target.value
        });
      };
    
      const handleStepChange = (index, event) => {
        const newSteps = [...recipe.steps];
        newSteps[index] = event.target.value;
        setRecipe({
          ...recipe,
          steps: newSteps
        });
      };
    
      const handleAddStep = () => {
        setRecipe({
          ...recipe,
          steps: [...recipe.steps, ""]
        });
      };
    
      const handleDeleteStep = (index) => {
        const newSteps = [...recipe.steps];
        newSteps.splice(index, 1);
        setRecipe({
          ...recipe,
          steps: newSteps
        });
      };

    async function aiRun() {
        setLoading(true);
        const prompt = `generate steps to cook ${search}. Generate it in the form of {"name": "recipe name","description" : "recipe description", "steps": ["step 1", "step 2", "step 3"]}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("THE JSON RESPONSE IS : ", response)
        const text = response.text();
        console.log(text);
        try{
            //console.log(JSON.parse(text));
            var jsonRecipe = JSON.parse(text)
            console.log("RECIPE is :", jsonRecipe);
            setRecipe(jsonRecipe)
            //console.log("RECIPE is : ", recipe)
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
        /*
       <div>
           <h1>Generative Recipe</h1>
       
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
         */

<div className="min-h-screen flex flex-col items-center bg-gray-100">
  <div className="text-4xl font-bold mt-12 mb-6">Generative Recipe</div>

  <div className="flex items-center space-x-4 mb-8">
    <div className="flex">
      <input
        type="text"
        placeholder="Search for Recipe"
        className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
        onChange={(e) => handleChangeSearch(e)}
      />
      <button className="text-white h-10 items-center justify-center border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 rounded-l-none rounded-r-md" onClick={() => handleClick()}>
        Search
      </button>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="image-upload" className={`border border-black text-black font-bold py-2 px-4 rounded cursor-pointer ${selectedFile ? 'bg-transparent' : ''}`}>
        {selectedFile ? selectedFile.name : "Upload Image"}
      </label>
      <input
        id="image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {selectedFile && (
        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      )}
    </div>
  </div>

  {recipe.name && (
  <div className="w-full max-w-md border border-black rounded p-4">
    <div className="mb-4">
      <label htmlFor="name" className="block mb-2 text-lg font-bold">Name:</label>
      <input
        type="text"
        value={recipe.name}
        onChange={handleNameChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none text-sm"
      />
    </div>
    
    <div className="mb-4">
      <label htmlFor="description" className="block mb-2 text-lg font-bold">Description:</label>
      <textarea
        value={recipe.description}
        onChange={handleDescriptionChange}
        className="w-full border border-gray-300 px-3 py-2 rounded-md resize-vertical focus:outline-none text-sm"
        rows="4"
      />
    </div>
    
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Steps:</h3>
      {recipe.steps.map((step, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={step}
            onChange={(e) => handleStepChange(index, e)}
            className="w-full border border-gray-300 px-3 py-1 rounded-md focus:outline-none text-sm"
          />
          <button
            onClick={() => handleDeleteStep(index)}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            -
          </button>
        </div>
      ))}
      <button
        onClick={handleAddStep}
        className="bg-black hover:bg-gray-900 text-white font-bold py-1 px-2 rounded"
      >
        +
      </button>
    </div>
    
    {/* Button to submit changes */}
    <button
      onClick={() => console.log("Updated Recipe:", recipe)}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Save
    </button>
  </div>
)}



</div>

    );
}

export default Gemini;