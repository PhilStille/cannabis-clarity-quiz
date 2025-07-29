/*
 * Script to drive the cannabis clarity quiz.
 *
 * The quiz assigns each answer to one of four archetypes (Coaster,
 * Seeker, Explorer, Integrator) by incrementing a score for the
 * archetype that best aligns with the response. Questions using a 1–10
 * scale are binned into four ranges corresponding to the archetypes.
 * Multiple‑choice answers map directly via their letter (A–D).
 *
 * When the user submits the form the script calculates the highest
 * scoring archetype and navigates to the associated result page.
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('quiz-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Before processing any quiz logic, run built‑in browser validation
    // on the form. If any required fields (e.g. first name or email) are
    // missing or invalid, reportValidity() will display the appropriate
    // feedback and return false. In that case we abort submission to
    // prevent users from bypassing the contact information.
    if (!form.reportValidity()) {
      return;
    }

    // Initialise score counters
    const scores = {
      coaster: 0,
      seeker: 0,
      explorer: 0,
      integrator: 0
    };

    // Utility: map scale (1–10) to an archetype
    function scaleToType(value) {
      const v = parseInt(value, 10);
      if (v <= 3) return 'coaster';
      if (v <= 5) return 'seeker';
      if (v <= 7) return 'explorer';
      return 'integrator';
    }

    // Utility: map multiple-choice letter to archetype
    function choiceToType(choice) {
      switch (choice) {
        case 'A': return 'coaster';
        case 'B': return 'seeker';
        case 'C': return 'explorer';
        case 'D': return 'integrator';
        default: return null;
      }
    }

    // Collect answers
    const data = new FormData(form);

    // Scale questions
    const scaleQuestions = ['q1', 'q5', 'q11', 'q15'];
    scaleQuestions.forEach((name) => {
      const val = data.get(name);
      const type = scaleToType(val);
      if (type) scores[type]++;
    });

    // Multiple‑choice questions
    const choiceQuestions = ['q2','q3','q4','q6','q7','q8','q9','q10','q12','q13','q14'];
    choiceQuestions.forEach((name) => {
      const val = data.get(name);
      const type = choiceToType(val);
      if (type) scores[type]++;
    });

    // Determine the highest‑scoring archetype
    let resultType = 'coaster';
    let maxScore = -1;
    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        resultType = type;
      }
    }

    // Redirect to the appropriate result page
    // The page names correspond to the keys in the scores object.
    window.location.href = `${resultType}.html`;
  });
});