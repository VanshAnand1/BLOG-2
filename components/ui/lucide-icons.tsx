import { BadgeCheck, BadgeX, BadgeQuestionMark } from "lucide-react";

export const Check = () => {
  return <BadgeCheck className="text-green-800"></BadgeCheck>;
};

export const X = () => {
  return <BadgeX className="text-red-400"></BadgeX>;
};

export const QuestionMark = () => {
  return <BadgeQuestionMark className="text-gray-500"></BadgeQuestionMark>;
};
