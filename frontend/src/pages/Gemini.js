import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { json } from "react-router-dom";
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const model_image = genAI.getGenerativeModel({ model: "gemini-pro-vision" });



const getBase64 = (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
})

const Gemini = () => {
    const [aiResponse, setResponse] = useState('');
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        steps: []
      });
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('');
    const [imageInineData, setImageInlineData] = useState('');
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

      async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            `identify the dish and generate steps to cook this dish. Generate it in the form of {"name": "recipe name","description" : "recipe description", "steps": ["step 1", "step 2", "step 3"]}`, imageInineData
        ]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        var jsonRecipe = JSON.parse(text)
            //console.log("RECIPE is :", jsonRecipe);
            setRecipe(jsonRecipe)
        //console.log("IMAGE RECIPE : ", text)
        setResponse(text);
        setLoading(false);
    }

    

    const handleClick = () => {
        setImage('');
        setImageInlineData('');
        setRecipe({
            name: "",
            description: "",
            steps: []
          });
        aiRun();
    }

    const handleImageSearchClick = () => {
        setSearch("");
        setRecipe({
            name: "",
            description: "",
            steps: []
          });
        aiImageRun();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.
    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }


      const handleUpload = async () => {
        try {
          if (selectedFile) {
            const base64Image = await getBase64(selectedFile);
            const prompt = `generate steps to cook recipe in the image. Generate it in the form of {"name": "recipe name","description" : "recipe description", "steps": ["step 1", "step 2", "step 3"]}`;
            const result = await model_image.generateContent(prompt, { image: base64Image });
            const response = await result.response;
            const text = response.text();
            // Process the response (e.g., parse JSON and update state)
          } else {
            console.log('No image selected. Please select an image to upload.');
          }
        } catch (error) {
          if (error.message.includes('image')) {
            console.error('Error: Please select an image to upload for image-based recipe generation.');
          } else {
            console.error('Error generating recipe from image:', error);
          }
        }
      };
    return (
        

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
      <label htmlFor="image-upload" className={`border border-black text-black font-bold py-2 px-4 rounded cursor-pointer ${image ? 'bg-transparent' : ''}`}>
        {image ? "Image Uploaded!" : "Upload Image"}
      </label>
      <input
        id="image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />
      
      {image && (
        <button
        onClick={() => handleImageSearchClick()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      )}
    </div>


    
  </div>

  {image && (
  <div className="flex justify-center items-center mt-4 mb-4">
    <img src={image} className="w-36 h-36 object-cover rounded-md" alt="Uploaded Image" />
  </div>
)}
      


      {
        loading && <h4 style={{ margin: '30px 0' }}>Loading ...</h4>
        }

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

<br />
<br/ >


</div>

    );
}

export default Gemini;