import dotenv from "dotenv";
dotenv.config();

function getNepaliDateTime() {
  const options = {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDateTime = new Intl.DateTimeFormat("en-GB", options).format(
    new Date()
  );
  const [date] = formattedDateTime.split(", "); // Extract only the date
  return date;
}

export const AnswerCheck = async (req, res) => {
  const currentDate = getNepaliDateTime();
  const userAnswer = req.body.answer; // Assuming answer is sent in request body

  try {
    // Define date ranges for each week
    const weekAnswers = {
      "2024-11-01": process.env.WEEK1_ANSWER,
      "2024-11-08": process.env.WEEK2_ANSWER,
      "2024-11-15": process.env.WEEK3_ANSWER,
      "2024-11-22": process.env.WEEK4_ANSWER,
      "2024-10-29": process.env.WEEK5_ANSWER,
    };

    let correctAnswer = null;

    for (const [weekStartDate, answer] of Object.entries(weekAnswers)) {
      if (currentDate >= weekStartDate) {
        correctAnswer = answer;
      }
    }

    if (!correctAnswer) {
      return res
        .status(400)
        .json({ message: "No answer available for this date." });
    }

    if (userAnswer === correctAnswer) {
      return res.status(200).json({ message: "Correct answer!" });
    } else {
      return res.status(400).json({ message: "Incorrect answer. Try again!" });
    }
  } catch (error) {
    console.error("Error checking answer:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
