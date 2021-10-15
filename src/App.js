import './App.css';
import Menu from './componentes/menu';
import Tabela from './componentes/tabela';
import Resumo from './componentes/cardResumo';
import ModalAdicionar from './componentes/modalAdicionar';
import ModalExcluir from './componentes/modalExcluir';
import ModalEditar from './componentes/modalEditar';

import {useState, useEffect} from 'react'

function App() {

  const [mostrarModalAdd, setMostrarModalAdd] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [transactions, setTransacions] = useState([]);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('debit');
  const [currentTransaction, setCurrentTransaction] = useState();
  const [resumeCredit, setResumeCredit] = useState([0]);
  const [resumeDebit, setResumeDebit] = useState([0]);
  const [ordenado, setOrdenado] = useState(transactions)
  

  useEffect(() => {

    loadTransactions();

  },[]);

  async function loadTransactions(){
    try {
        const response = await fetch(' http://localhost:3333/transactions', {
            method: 'GET'
        });

        const data = await response.json();
        setTransacions(data);
        setOrdenado(data);
    } catch (error) {
        console.log(error)
    }
}
  
 useEffect(() => {
   console.log(currentTransaction)
 },[currentTransaction]);

  return (
    <div className="App">
      <Menu/>
      <div className='row'>
        <div>
          <Tabela setMostrarModalEditar={setMostrarModalEditar} setMostrarModalExcluir={setMostrarModalExcluir} transactions={transactions}  loadTransactions={loadTransactions} setCurrentTransaction={setCurrentTransaction} setTransacions={setTransacions} resumeCredit={resumeCredit} setResumeCredit={setResumeCredit} resumeDebit={resumeDebit} setResumeDebit={setResumeDebit}  setOrdenado={ setOrdenado}  ordenado={ordenado} />
        </div>
        <div>
          <Resumo setMostrarModalAdd={setMostrarModalAdd} resumeCredit={resumeCredit} setResumeCredit={setResumeCredit} resumeDebit={resumeDebit} setResumeDebit={setResumeDebit} />
        </div>
      </div>
      {mostrarModalAdd && <ModalAdicionar 
         setMostrarModalAdd={setMostrarModalAdd}
          setValue={setValue}
          value={value}
          setCategory={setCategory}
          category={category}
          setDate={setDate}
          date={date}
          setDescription={setDescription}
          description={description}
          type={type}
          setType={setType}
          setTransacions={setTransacions}
          loadTransactions={loadTransactions}
          />}

        {mostrarModalEditar && <ModalEditar setMostrarModalEditar={setMostrarModalEditar} currentTransaction={currentTransaction} loadTransactions={loadTransactions} />}

    </div>
  );
}

export default App;
