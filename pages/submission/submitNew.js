import SubmissionForm from '../../components/forms/SubmissionForm';

export default function NewSubmission() {
  return (
    <main>
      <header>
        <h1>Ask or Answer</h1>
      </header>
      <section id="newSubmissionContainer">
        <SubmissionForm key="newSubmission" />
      </section>
    </main>
  );
}
