import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const checkLogin = () => {
    if (auth.loggedIn() !== null && auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <button type='button' id='create-ticket-link'>
        <Link to='/create' >New Ticket</Link>
      </button>

      {
        !loginCheck ? (
          <div className='login-notice'>
            <h1>
              Login to create & view tickets
            </h1>
          </div>  
        ) : (
            <div className='board'>
              <div className='board-display'>
                {boardStates.map((status) => {
                  const filteredTickets = tickets.filter(ticket => ticket.status === status);
                  return (
                    <Swimlane  
                      title={status}  
                      key={status}  
                      tickets={filteredTickets}  
                      deleteTicket={deleteIndvTicket}
                    />
                  );
                })}
              </div>
            </div>
          )
      }
    </>
  );
};

export default Board;