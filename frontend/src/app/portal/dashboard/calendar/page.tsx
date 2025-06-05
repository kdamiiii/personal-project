import Calendar, { EventCreationForm } from "@/components/calendar";
import { FlexContainer } from "@/components/containers";

const CalendarPage: React.FC = () => {
  return (
    <FlexContainer className="justify-between gap-5 w-[100%]">
      <Calendar />
      <EventCreationForm />
    </FlexContainer>
  );
};

export default CalendarPage;
