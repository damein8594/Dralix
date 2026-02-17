export function calculateStoryPoint() {
  const complexity = document.getElementById("spComplexity");
  const dependencies = document.getElementById("spDependencies");
  const risk = document.getElementById("spRisk");
  const testing = document.getElementById("spTesting");
  const familiarity = document.getElementById("spFamiliarity");

  const rawScore =
    parseInt(complexity.value) +
    parseInt(dependencies.value) +
    parseInt(risk.value) +
    parseInt(testing.value) +
    parseInt(familiarity.value);

  let points;
  if (rawScore <= 2) points = 1;
  else if (rawScore <= 4) points = 2;
  else if (rawScore === 5) points = 3;
  else if (rawScore === 6) points = 5;
  else if (rawScore === 7) points = 8;
  else points = 13;

  complexity.value = "1";
  dependencies.value = "0";
  risk.value = "0";
  testing.value = "0";
  familiarity.value = "0";

  return points;
}
