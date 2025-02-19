
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { GoogleGenerativeAI } from '@google/generative-ai'; 
const TopicSelect = () => {
    const [formData, setFormData] = useState({
        topic: '',
        expertise: '',
        numberOfQuestions: '5',
        styleOfQuestions: 'normal'
    });
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        setLoading(true); 
        try {
            
            const apiKey = import.meta.env.VITE_API_KEY;

            if (!apiKey) {
                console.error("API key is not defined");
                setResponseText("API key is missing. Please configure your environment.");
                return;
            }

    
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Generate ${formData.numberOfQuestions} ${formData.styleOfQuestions} questions for a ${formData.expertise} level in the topic of ${formData.topic}. For each question, provide the correct answer. Format the response as follows:
            Q1: [Question]
            A1: [Answer]
            Q2: [Question]
            A2: [Answer]
            ...`;

           
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

           
            navigate('/quiz-page', { state: { questions, answers, numberOfQuestions: formData.numberOfQuestions } });
        } catch (error) {
            console.error("Error generating content:", error);
            setResponseText("Sorry, something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <form onSubmit={handleSubmit}>
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

                        <button
                            className="btn waves-effect waves-light teal"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'SUBMIT'}
                        </button>
                    </form>

                    {responseText && <div className="response-text"><p>{responseText}</p></div>}
                </div>
            </div>
        </div>
    );
};

export default TopicSelect;