import './style.css';


function ModalExcluir({id,  loadTransactions, setTransactionId}) {

  async function handleDeleteTransaction(){

    const response = await fetch(`http://localhost:3333/transactions/${id}`, {
        method: 'DELETE'
      });

      const dataResponse = await response.json();
      
      loadTransactions()
}



  return (
    <div className= 'container-confirm-delete'>
        <h3 className='apagar'>Apagar item?</h3>
        <div className='button'>
            <button className='btn-actions-confirm-delete yes' onClick={handleDeleteTransaction}>Sim</button>
            <button className='btn-actions-confirm-delete no' onClick={() => setTransactionId(0)}>Não</button>
        </div>
    </div>
  );
}

export default ModalExcluir;