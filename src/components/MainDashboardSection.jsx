import UserBadgeList from "./UserBadgeList";
import BasicCard from "./BasicCard";

export default function MainDashboardSection({ badges = true, quizzes, questions, answers }) {
    return (
        <div className="mainDashboardWrapper">
            {badges ? (
                <div>
                    <UserBadgeList/>
                    <div>
                        <p className="badgesListTitle">Mastery Badges</p>
                        <p>These are a collection of all the badges you have obtained.</p>
                        <div className="basicCardWrapper">
                           {Array.from({ length: 12 }).map((_, index) => (
                                <BasicCard 
                                    icon
                                    key={index}
                                    color="#e0e0e0" 
                                    width={250}
                                    height={125}
                                    className="basicCard"
                                    title="Just Getting Started"
                                    text="Last achieved 3 days ago"/>
                            ))}
                        </div>
                    </div>
                </div>

            ) : quizzes ? (
                <h5>User Quizzes</h5>
            ) : questions ? (
                <h5>User Questions</h5>
            ) : answers ? (
                <h5>User Answers</h5>
            ) : null}
        </div>
    );
}
