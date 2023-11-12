import classes from "../styles/QuizCard.module.css";

export default function QuizCard({ title, id, noq }) {
  return (
    <div className={classes.quizCard}>
      <img
        src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total points : {noq * 5}</p>
      </div>
    </div>
  );
}
