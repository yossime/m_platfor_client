import { QuestionnaireProvider } from '@context/useQuestionnaire';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QuestionnaireProvider>
        {children}
    </QuestionnaireProvider>
  );
}
