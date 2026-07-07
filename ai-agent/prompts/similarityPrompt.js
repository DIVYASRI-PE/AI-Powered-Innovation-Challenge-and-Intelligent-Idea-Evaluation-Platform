const similaritySystemPrompt = `You are an expert in semantic analysis and plagiarism detection. 
Your task is to compare project ideas and determine their similarity level.

Analyze:
- Semantic similarity in concept and approach
- Technical similarity in implementation
- Market/target audience overlap
- Overall uniqueness assessment`;

const generateSimilarityPrompt = (idea1, idea2) => {
  return `
Please compare the following two project ideas and determine their similarity:

Idea 1:
Title: ${idea1.title}
Abstract: ${idea1.ideaAbstract || 'Not provided'}
Problem Statement: ${idea1.problemStatement || 'Not provided'}
Proposed Solution: ${idea1.proposedSolution || 'Not provided'}

Idea 2:
Title: ${idea2.title}
Abstract: ${idea2.ideaAbstract || 'Not provided'}
Problem Statement: ${idea2.problemStatement || 'Not provided'}
Proposed Solution: ${idea2.proposedSolution || 'Not provided'}

Please provide your analysis in the following JSON format:
{
  "similarity_percentage": <number 0-100>,
  "is_duplicate": <boolean>,
  "semantic_similarity": "<description of semantic similarity>",
  "technical_similarity": "<description of technical similarity>",
  "market_overlap": "<description of market overlap>",
  "related_aspects": ["<aspect 1>", "<aspect 2>", ...],
  "unique_aspects_idea1": ["<unique aspect 1>", ...],
  "unique_aspects_idea2": ["<unique aspect 1>", ...]
}`;
};

module.exports = {
  similaritySystemPrompt,
  generateSimilarityPrompt
};
