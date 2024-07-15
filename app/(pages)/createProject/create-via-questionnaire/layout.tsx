import { QuestionnaireProvider } from '@context/useQuestionnaire';
// import "./test.css"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // <QuestionnaireProvider>
      <div className="test">
        {children}
      </div>
    // </QuestionnaireProvider>
  );
}
