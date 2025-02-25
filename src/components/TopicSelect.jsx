
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ClipLoader } from 'react-spinners';

const TopicSelect = () => {
    //state to manage form data
    const [formData, setFormData] = useState({
        topic: '',
        customTopic:'',
        expertise: '',
        numberOfQuestions: '',
        styleOfQuestions: ''
    });
    //state to store API response messages
    const [responseText, setResponseText] = useState('');
    //state to manage loading state during API calls
    const [loading, setLoading] = useState(false);
    //useNavigate hook to navigate to different routes
    const navigate = useNavigate(); 

    //example topics it can aslo be fetched from API
    const exampleTopics = ['golang', 'aws', 'javascript','CI/CD','home gardens','coffe','finger foods'];

//initialize materialize select dropdowns after the component mounts
    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);
//function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();//prevent default form submission behavior
        console.log('Form submitted:', formData);

        setLoading(true); 
        try {
            //get the API key from .env 
            const apiKey = import.meta.env.VITE_API_KEY;
//check if API key is missing
            if (!apiKey) {
                console.error("API key is not defined");
                setResponseText("API key is missing. Please configure your environment.");
                return;
            }

    //Intialize Googles Generative AI with the API key
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            //use customTopic id the topic is set to 'custom',otherwise use the selected topic
            const selectedTopic = formData.topic === 'custom' ? formData.customTopic : formData.topic;
        
            const timestamp = new Date().getTime(); // Add a timestamp for uniqueness
const randomSeed = Math.random().toString(36).substring(7); // Add a random seed for uniqueness

const prompt = `
Generate ${formData.numberOfQuestions} entirely new and unique questions for a ${formData.expertise} level in the topic of ${selectedTopic}.
 Style the questions as if they are spoken by **${formData.styleOfQuestions}**. Ensure the language, tone, and phrasing match the chosen style. For example:
"Master Oogway" should sound wise and philosophical.
"1940’s gangster" should have a tough, old-school mobster vibe.
"Like I'm an 8-year-old" should simplify concepts and be playful.
"Jedi" should use Star Wars-themed wisdom and phrasing.
"Captain Jack Sparrow" should be witty and pirate-themed.
"Matthew McConaughey" should have a laid-back, Southern drawl style.


**Important:**
-The questions should be **completely new** and **different every time** this request ${selectedTopic} is made. Do not reuse any previous questions. 
-If ${formData.styleOfQuestions}is normal style the question like a normal quiz.

**Requirements:**
1. Ensure the questions are appropriate for the expertise level (${formData.expertise}).
2. Provide clear and concise answers for each question.
3. Format the output exactly as follows:
   Q1: [Question]
   A1: [Answer]
   Q2: [Question]
   A2: [Answer]
   ... and so on.

**Examples:**
- Example (if style is "Jedi"):
  Q1: "The Force surrounds us, binds us. But tell me, young Padawan, which fundamental force in physics governs the attraction between two masses?"
  A1: "Gravity, Master Yoda."

- Example (if style is "Normal"):
  Q1: "What is the sum of 5 and 3?"
  A1: "8."

**Unique Identifier:**
- Timestamp: ${timestamp}
- Random Seed: ${randomSeed}

**Important:**
- If you cannot generate entirely new questions, respond with "ERROR: Unable to generate unique questions."
- Do not deviate from the format or instructions.
`;

console.log("Prompt:", prompt); // Log the prompt for debugging


const validateForm = (formData) => {
    const { topic, customTopic, expertise, numberOfQuestions, styleOfQuestions } = formData;

    // Validate topic
    if (!topic) {
        alert("Please select a topic.");
        return false;
    }

    // Validate custom topic (if selected)
    if (topic === "custom" && (!customTopic || customTopic.trim().length < 3)) {
        alert("Please enter a valid custom topic (at least 3 characters).");
        return false;
    }

    // Validate expertise level
    if (!expertise) {
        alert("Please select an expertise level.");
        return false;
    }

    // Validate number of questions
    if (!numberOfQuestions || isNaN(numberOfQuestions) || numberOfQuestions < 1 || numberOfQuestions > 20) {
        alert("Please enter a valid number of questions (between 1 and 20).");
        return false;
    }

    // Validate style of questions
    if (!styleOfQuestions) {
        alert("Please select a style for the questions.");
        return false;
    }

    return true; // Validation passed
};

// Usage in handleSubmit
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
        return; // Stop if validation fails
    }

    // Proceed with API call
    setLoading(true);
    try {
        // API call logic
    } catch (error) {
        console.error("Error generating content:", error);
    } finally {
        setLoading(false);
    }
};

            const result = await model.generateContent(prompt);
            const response = result.response.text();

           //parse the response to take questions and answers
            const questionsAndAnswers = response.split('\n').filter(q => q.trim() !== '');
            const questions = [];
            const answers = [];

            questionsAndAnswers.forEach((line, index) => {
                if (line.startsWith('Q')) {
                    //extract questions(lines starting with 'Q)
                    questions.push(line.substring(3).trim());
                } else if (line.startsWith('A')) {
                    //take answers (lines starting with 'A)
                    answers.push(line.substring(3).trim());
                }
            });

           //navigate to the quiz pg with the generated questions and answers
            navigate('/quiz-page', { state: { questions, answers, numberOfQuestions: formData.numberOfQuestions } });
        } catch (error) {
            //handle errors 
            console.error("Error generating content:", error);
            setResponseText("Sorry, something went wrong. Please try again later.");
        } finally {
            //reset loading state
            setLoading(false);
        }
    };
//function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value //update the corresponding fieldin formData
        });
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                padding: '20px'
            }}>
                <ClipLoader color="#26a69a" size={70} />
                <p className="teal-text" style={{ marginTop: '30px', textAlign: 'center' }}>
                    Generating your quiz questions...
                </p>
                <p className="grey-text text-darken-1" style={{ marginTop: '10px', textAlign: 'center', fontSize: '0.9em' }}>
                    This may take a few moments
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    {/*form for selecting quiz options */}
                    <form onSubmit={handleSubmit}>
                        {/* topic selection dropdown */}
                        <div className="input-field">
                            <select
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                            >
                                <option value="" disabled></option>

                               {/*Example topics*/}
                               {exampleTopics.map((topic, index) => (
                                <option key={index} value={topic}>{topic}</option>
                               ))}

                               {/*custom topic option*/}
                               <option value="custom"> + Add custom Topic</option>
                               </select>
                            <label>Topic</label>
                            </div>

                            {/* custom topic input field only visible when "custom" is choosen*/}
                            {formData.topic === 'custom' && (
                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '-10px',
                                }}>
                    
                
                        <div className="input-field" style={{ flex:1 }}>
                            <input 
                            type="text"
                            name="customTopic"
                            value={formData.customTopic}
                            onChange={handleChange}
                            placeholder="Enter your topic"
                            required
                            />
                            </div>
                            </div>
                            )}
                              {/* Expertise level selection dropdown */}
                        <div className="input-field">
                            <select
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                            >
                                <option value="" disabled></option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <label>Expertise</label>
                        </div>

                        {/* Number of questions selection dropdown */}
                        <div className="input-field">
                            <select
                                name="numberOfQuestions"
                                value={formData.numberOfQuestions}
                                onChange={handleChange}
                            >
                              <option value="" disabled></option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                            <label>Number of questions</label>
                        </div>

                        {/* Style of questions selection dropdown */}
                        <div className="input-field">
                            <select
                                name="styleOfQuestions"
                                value={formData.styleOfQuestions}
                                onChange={handleChange}
                            >
                              <option value="" disabled></option>
                              <option value="normal">Normal</option>
<option value="1940's gangster">1940's Gangster</option>
<option value="like I'm an 8 year old">Like I'm an 8 Year Old</option>
<option value="jedi">Jedi</option>
<option value="captain jack sparrow">Captain Jack Sparrow</option>
<option value="matthew mcconaughey">Matthew McConaughey</option>
<option value="master oogway">Master Oogway</option>

                            </select>
                            <label>Style of questions</label>
                        </div>

                        {/* Submit button */}
                        <button
                            className="btn waves-effect waves-light teal"
                            type="submit"
                            disabled={loading}
                        >
                            SUBMIT
                        </button>
                    </form>

                    {/* Display response text */}
                    {responseText && (
                        <div className="response-text red-text" style={{ marginTop: '20px' }}>
                            <p>{responseText}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopicSelect;







