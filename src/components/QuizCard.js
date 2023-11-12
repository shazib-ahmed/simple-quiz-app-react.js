import classes from "../styles/QuizCard.module.css";

export default function QuizCard({ title, id, noq }) {
  return (
    <div className={classes.quizCard}>
      <img src={`/assets/images/${id}.png`} alt={title} />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total points : {noq * 5}</p>
      </div>
    </div>
  );
}
