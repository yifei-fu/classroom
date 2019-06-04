import {Quiz} from '../../api/type';

export type QuizTime = 'past' | 'current' | 'upcoming';

export function quizTime(quiz: Quiz): QuizTime {
  const now = new Date();
  if (new Date(quiz.endTime) < now) {
    return 'past';
  }
  if (now >= new Date(quiz.startTime)) {
    return 'current';
  }
  return 'upcoming';
}
