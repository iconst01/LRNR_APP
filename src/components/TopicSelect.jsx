// Import necessary hooks, components, and libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Google's Generative AI library

// Define the TopicSelect component
const TopicSelect = () => {
    // State to manage form data (topic, expertise, number of questions, and style of questions)
    const [formData, setFormData] = useState({
        topic: '',
        expertise: '',
        numberOfQuestions: '5',
        styleOfQuestions: 'normal'
    });

    // State to store the response text ( errors or success messages)
    const [responseText, setResponseText] = useState('');
    // State to manage loading state during API calls
    const [loading, setLoading] = useState(false);
    // useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate(); 

    // useEffect to initialize Materialize select dropdowns
    useEffect(() => {
        // Initialize Materialize select elements
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('Form submitted:', formData);

        setLoading(true); // Set loading state to true
        try {
            // Get the API key from environment variables
            const apiKey = import.meta.env.VITE_API_KEY;

            // Check if the API key is missing
            if (!apiKey) {
                console.error("API key is not defined");
                setResponseText("API key is missing. Please configure your environment.");
                return;
            }

            // Initialize Google's Generative AI with the API key
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use the Gemini model

            // Create a prompt to generate questions and answers based on form data
            const prompt = `Generate ${formData.numberOfQuestions} ${formData.styleOfQuestions} questions for a ${formData.expertise} level in the topic of ${formData.topic}. For each question, provide the correct answer. Format the response as follows:
            Q1: [Question]
            A1: [Answer]
            Q2: [Question]
            A2: [Answer]
            ...`;

            // Generate content using the model
            const result = await model.generateContent(prompt);
            const response = result.response.text(); // Get the generated response

            // Parse the response to extract questions and answers
            const questionsAndAnswers = response.split('\n').filter(q => q.trim() !== '');
            const questions = [];
            const answers = [];

            questionsAndAnswers.forEach((line, index) => {
                if (line.startsWith('Q')) {
                    // Extract questions (lines starting with 'Q')
                    questions.push(line.substring(3).trim());
                } else if (line.startsWith('A')) {
                    // Extract answers (lines starting with 'A')
                    answers.push(line.substring(3).trim());
                }
            });

            // Navigate to the quiz page with the generated questions and answers
            navigate('/quiz-page', { state: { questions, answers, numberOfQuestions: formData.numberOfQuestions } });
        } catch (error) {
            // Handle errors during content generation
            console.error("Error generating content:", error);
            setResponseText("Sorry, something went wrong. Please try again later.");
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Update the corresponding field in formData
        });
    };

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
                                <option value="math">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="history">History</option>
                            </select>
                            <label>Topic</label>
                        </div>

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
                                <option value="normal">Normal</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="true-false">True/False</option>
                                <option value="open-ended">Open Ended</option>
                            </select>
                            <label>Style of questions</label>
                        </div>

                        {/* Submit button */}
                        <button
                            className="btn waves-effect waves-light teal"
                            type="submit"
                            disabled={loading} // Disable button during loading
                        >
                            {loading ? 'Generating...' : 'SUBMIT'}
                        </button>
                    </form>

                    {/* Display response text (e.g., errors or success messages) */}
                    {responseText && <div className="response-text"><p>{responseText}</p></div>}
                </div>
            </div>
        </div>
    );
};

// Export the TopicSelect component as the default export
export default TopicSelect;