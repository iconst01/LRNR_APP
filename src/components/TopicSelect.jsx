
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { ClipLoader } from 'react-spinners';

import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const TopicSelect = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        topic: '',
        customTopic: '',
        expertise: '',
        numberOfQuestions: '',
        styleOfQuestions: ''
    });

    const { user, setUser } = useContext(UserContext);

    
    // everytime the User object's properties are changed update it in local storage for persistance
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);
    
    //everytime the formData.topic changes update the user's topic in context
    useEffect(() => {
        //copying the prevUser in context to avoid directly mutating it
        setUser((prevUser) => ({
            ...prevUser,
            topic: formData.topic,
        }));
    }, [formData.topic]); 
 
    useEffect(() => {
     setUser((prevUser) => ({
         ...prevUser,
         customTopic: formData.customTopic,      
     }));
 }, [formData.customTopic]); 

    // State to store API response messages
    const [responseText, setResponseText] = useState('');

    // State to manage loading state during API calls
    const [loading, setLoading] = useState(false);

    // useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    // Example topics (can also be fetched from an API)
    const exampleTopics = ['golang', 'aws', 'javascript', 'CI/CD', 'home gardens', 'coffee', 'finger foods'];

    // Initialize Materialize select dropdowns after the component mounts
    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!formData.topic) {
            setResponseText("Please select a topic.");
            return;
        }

        if (formData.topic === 'custom' && !formData.customTopic.trim()) {
            setResponseText("Custom topic is required. Please enter a valid custom topic.");
            return;
        }

        if (!formData.expertise) {
            setResponseText("Please select an expertise level.");
            return;
        }

        if (!formData.numberOfQuestions) {
            setResponseText("Please select the number of questions.");
            return;
        }

        if (!formData.styleOfQuestions) {
            setResponseText("Please select a style of questions.");
            return;
        }

        // Set loading to true while validating and generating
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            if (!apiKey) {
                console.error("API key is not defined");
                setResponseText("API key is missing. Please configure your environment.");
                return;
            }

            // Initialize Google's Generative AI
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // AI Validation Prompt for form data
            const validationPrompt = `
Validate the following form data for a quiz generation:
Topic: ${formData.topic}
Custom Topic: ${formData.customTopic}

Please validate the form data:
1. Ensure the topic is either a predefined topic or a non-empty custom topic.
2. Check if the custom topic contains meaningful text. If any of these fields appear to be gibberish or random words (i.e., nonsensical strings or unrelated terms), return an error message stating "Invalid input, please check your entries for gibberish or random words."

If everything is valid, respond with "VALID". If there are issues, provide specific error messages.
`;

            // Validate the form data with the AI model
            const validationResponse = await model.generateContent(validationPrompt);
            const validationResult = validationResponse.response.text();

            if (validationResult.includes("VALID")) {
                // Form data is valid, proceed with generating the quiz questions
                const selectedTopic = formData.topic === 'custom' ? formData.customTopic : formData.topic;
                const timestamp = new Date().getTime(); // Unique timestamp
                const randomSeed = Math.random().toString(36).substring(7); // Random seed

                const prompt = `
Generate ${formData.numberOfQuestions} entirely new and unique questions for a ${formData.expertise} level in the topic of ${selectedTopic}.
Style the questions as if they are spoken by **${formData.styleOfQuestions}**. Ensure the language, tone, and phrasing match the chosen style.

**Important:**
- The questions should be **completely new** and **different every time** this request is made. Do not reuse any previous questions.
- If ${formData.styleOfQuestions} is normal style, the questions should be styled like a regular quiz.
- If the language, tone, and phrasing match the chosen style. For example:
  "Normal" should sound like a regular quiz.
  "Master Oogway" should sound wise and philosophical.
  "1940’s gangster" should have a tough, old-school mobster vibe.
  "Like I'm an 8-year-old" should simplify concepts and be playful.
  "Jedi" should use Star Wars-themed wisdom and phrasing.
  "Captain Jack Sparrow" should be witty and pirate-themed.
  "Matthew McConaughey" should have a laid-back, Southern drawl style.

**Requirements:**
1. Ensure the questions are appropriate for the expertise level (${formData.expertise}).
2. Provide clear and concise answers for each question.
3. Format the output exactly as follows:
   Q1: [Question]
   A1: [Answer]
   Q2: [Question]
   A2: [Answer]
   ... and so on.

**Unique Identifier:**
- Timestamp: ${timestamp}
- Random Seed: ${randomSeed}

**Important:**
- If you cannot generate entirely new questions, respond with "ERROR: Unable to generate unique questions."
- Do not deviate from the format or instructions.
`;

                const result = await model.generateContent(prompt);
                const response = result.response.text();

                const questionsAndAnswers = response.split('\n').filter(q => q.trim() !== '');
                const questions = [];
                const answers = [];

                questionsAndAnswers.forEach((line, index) => {
                    if (line.startsWith('Q')) {
                        questions.push(line.substring(3).trim());
                    } else if (line.startsWith('A')) {
                        answers.push(line.substring(3).trim());
                    }
                });

                // Navigate to the quiz page with the generated questions and answers
                navigate('/quiz-page', { state: { questions, answers, numberOfQuestions: formData.numberOfQuestions } });

            } else {
                // AI provided validation error, display it
                setResponseText(`Error: ${validationResult}`);
            }

        } catch (error) {
            console.error("Error generating content:", error);
            setResponseText("Sorry, something went wrong. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state after process
        }
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Update the corresponding field in formData
        });
    };

    // Display loading spinner while generating questions
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
                    {/* Form for selecting quiz options */}
                    <form onSubmit={handleSubmit}>
                        {/* Topic selection dropdown */}
                        <div className="input-field">
                            <select
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                            >
                                <option value="" disabled></option>

                                {/* Example topics */}
                                {exampleTopics.map((topic, index) => (
                                    <option key={index} value={topic}>{topic}</option>
                                ))}
                                {/* Custom topic option */}
                                <option value="custom">+ Add custom Topic</option>
                            </select>
                            <label>Topic</label>
                        </div>

                        {/* Custom topic input field (only visible when "custom" is chosen) */}
                        {formData.topic === 'custom' && (
                            <div className="input-field">
                                <input
                                    type="text"
                                    name="customTopic"
                                    value={formData.customTopic}
                                    onChange={handleChange}
                                    placeholder="Enter your topic"
                                    required
                                />
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
