function QuestionNumber({ current, total }) {
    return (
        <h3 className="center-align teal-text text-darken-5">
            {current + 1} of {total}
        </h3>
    );
};

export default QuestionNumber;