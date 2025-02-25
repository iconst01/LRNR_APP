import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ClipLoader } from 'react-spinners';

import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const TopicSelect = () => {
    //state to manage form data
    const [formData, setFormData] = useState({
        topic: '',
        customTopic: '',
        expertise: '',
        numberOfQuestions: '',
        styleOfQuestions: ''
    });

    const { user, setUser } = useContext(UserContext);

    //everytime the User object's properties are changed update it in local storage for persistance
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

    //state to store API response messages
    const [responseText, setResponseText] = useState('');
    //state to manage loading state during API calls
    const [loading, setLoading] = useState(false);
    //state to manage form errors
    const [formErrors, setFormErrors] = useState({});
    //useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    //example topics it can also be fetched from API
    const exampleTopics = ['Math', 'Science', 'History'];

    //initialize materialize select dropdowns after the component mounts
    useEffect(() => {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);

    //function to validate form data
    const validateForm = () => {
        const errors = {};

        if (!formData.topic) {
            errors.topic = "Topic is required.";
        } else if (formData.topic === 'custom' && !formData.customTopic) {
            errors.customTopic = "Custom topic is required.";
        }

        if (!formData.expertise) {
            errors.expertise = "Expertise level is required.";
        }

        if (!formData.numberOfQuestions) {
            errors.numberOfQuestions = "Number of questions is required.";
        }

        if (!formData.styleOfQuestions) {
            errors.styleOfQuestions = "Style of questions is required.";
        }

        return errors;
    };

    //function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission behavior

        // Validate form data
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setResponseText("Please fill out all required fields.");
            setFormErrors(errors);
            return;
        }

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

            //Initialize Google's Generative AI with the API key
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            //use customTopic if the topic is set to 'custom', otherwise use the selected topic
            const selectedTopic = formData.topic === 'custom' ? formData.customTopic : formData.topic;

            const prompt = `Generate ${formData.numberOfQuestions} ${formData.styleOfQuestions} questions for a ${formData.expertise} level in the topic of ${selectedTopic}. For each question, provide the correct answer. Format the response as follows:
            Q1: [Question]
            A1: [Answer]
            Q2: [Question]
            A2: [Answer]
            ...`;

            //generate content using the model
            const result = await model.generateContent(prompt);
            const response = result.response.text();

            //parse the response to extract questions and answers
            const questionsAndAnswers = response.split('\n').filter(q => q.trim() !== '');
            const questions = [];
            const answers = [];

            questionsAndAnswers.forEach((line, index) => {
                if (line.startsWith('Q')) {
                    //extract questions (lines starting with 'Q')
                    questions.push(line.substring(3).trim());
                } else if (line.startsWith('A')) {
                    //extract answers (lines starting with 'A')
                    answers.push(line.substring(3).trim());
                }
            });

            //navigate to the quiz page with the generated questions and answers
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
            [e.target.name]: e.target.value //update the corresponding field in formData
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
                            {formErrors.topic && <span className="red-text">{formErrors.topic}</span>}
                        </div>

                        {/* custom topic input field only visible when "custom" is chosen */}
                        {formData.topic === 'custom' && (
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '-10px',
                            }}>
                                <div className="input-field" style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        name="customTopic"
                                        value={formData.customTopic}
                                        onChange={handleChange}
                                        placeholder="Enter your topic"
                                        required
                                    />
                                    {formErrors.customTopic && <span className="red-text">{formErrors.customTopic}</span>}
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
                            {formErrors.expertise && <span className="red-text">{formErrors.expertise}</span>}
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
                            {formErrors.numberOfQuestions && <span className="red-text">{formErrors.numberOfQuestions}</span>}
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
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="true-false">True/False</option>
                                <option value="open-ended">Open Ended</option>
                            </select>
                            <label>Style of questions</label>
                            {formErrors.styleOfQuestions && <span className="red-text">{formErrors.styleOfQuestions}</span>}
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