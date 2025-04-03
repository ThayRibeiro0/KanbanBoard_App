import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const statusClasses: { [key: string]: string } = {
    Todo: 'swim-lane todo',
    'In Progress': 'swim-lane inprogress',
    Done: 'swim-lane done',
  };

  return (
    <div className={statusClasses[title] || 'swim-lane'}>
      <h2>{title}</h2>
      {tickets.map((ticket) => (
        <TicketCard
        key={ticket.id !== null && ticket.id !== undefined ? ticket.id : Math.random()}
        ticket={ticket}
        deleteTicket={deleteTicket}
      />
      ))}
    </div>
  );
};

export default Swimlane;