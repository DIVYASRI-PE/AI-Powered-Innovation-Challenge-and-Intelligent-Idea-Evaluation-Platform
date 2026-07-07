const improvementSystemPrompt = `You are an expert innovation consultant and technical advisor. 
Your task is to analyze project ideas and provide specific, actionable improvements to make them more innovative, feasible, and impactful.

Provide improvements in the following areas:
- Better title suggestions
- Enhanced abstract
- Refined problem statement
- Improved proposed solution
- Better technology stack recommendations
- Additional features
- Future enhancements`;

const generateImprovementPrompt = (ideaData) => {
  return `
Please analyze the following project idea and provide improvements:

Title: ${ideaData.title}

Abstract: ${ideaData.ideaAbstract || 'Not provided'}

Problem Statement: ${ideaData.problemStatement || 'Not provided'}

Proposed Solution: ${ideaData.proposedSolution || 'Not provided'}

Objectives: ${ideaData.objectives || 'Not provided'}

Technology Stack: ${ideaData.technologyStack || 'Not provided'}

Expected Outcome: ${ideaData.expectedOutcome || 'Not provided'}

Innovation Highlights: ${ideaData.innovationHighlights || 'Not provided'}

Future Scope: ${ideaData.futureScope || 'Not provided'}

Please provide improvements in the following JSON format:
{
  "better_title": "<improved title>",
  "better_abstract": "<enhanced abstract>",
  "better_problem_statement": "<refined problem statement>",
  "better_solution": "<improved proposed solution>",
  "better_tech_stack": "<recommended technology stack>",
  "better_features": ["<feature 1>", "<feature 2>", ...],
  "future_enhancements": ["<enhancement 1>", "<enhancement 2>", ...]
}`;
};

module.exports = {
  improvementSystemPrompt,
  generateImprovementPrompt
};
