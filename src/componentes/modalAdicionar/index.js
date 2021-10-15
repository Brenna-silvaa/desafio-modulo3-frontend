import './style.css';
import fechar from '../../assets/fechar.svg';
import InputMask from "react-input-mask";


function ModalAdicionar({setMostrarModalAdd,
    setValue,
    value,
    setCategory,
    category,
    setDate,
    date,
    setDescription,
    description,
    type,
    setType,
    setTransacions,
    loadTransactions
   }) {
    

    async function handleRegisterTransactions(){

        if (!value || !category || !date || !description || !type){
            return window.alert('Todos os campos são obrigatorios');
        }


        const tratamentoData = date.split("/").reverse().join("/");
        const tratamentoValue = value*100;
        const tratamentoWeekDay = [];

        const tratamentoData2 = new Date(tratamentoData);
        const weekday = tratamentoData2.getDay();

        if (weekday === 1) {
            tratamentoWeekDay.push("segunda");
        }
        if (weekday === 2) {
            tratamentoWeekDay.push("terça");
        }
        if (weekday === 3) {
            tratamentoWeekDay.push("quarta");
        }
        if (weekday === 4) {
            tratamentoWeekDay.push("quinta");
        }
        if (weekday === 5) {
            tratamentoWeekDay.push("sexta");
        }
        if (weekday === 6) {
            tratamentoWeekDay.push("sabado");
        }
        if (weekday === 0) {
            tratamentoWeekDay.push("domingo");
        }

        try {
          
          const dados = {
            date: new Date(tratamentoData),
            week_day: tratamentoWeekDay.toString(),
            description: description,
            value: tratamentoValue,
            category: category,
            type: type
          };

          console.log(type);

          const response = await fetch(' http://localhost:3333/transactions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
          });
    
          const dataResponse = await response.json();
          
          await loadTransactions();

          setDate('');
          setDescription('');
          setValue('');
          setCategory('');
          setType('');
    
        } catch (error) {
          console.log(error)
        }
      }
    
      function setCredit(){
          setType("credit")
      }

      function setDebit(){
        setType("debit")
    }

  return (
    <div className='containerM'>
        <div className='modal-container'>
            <div className='row-top'>
                <h1>Adicionar Registro</h1>
                <img className='close-icon' onClick={() => setMostrarModalAdd(false)} src={fechar} />
            </div>
            <div>
                <button className={`credit-button ${type === 'credit' && 'credit'}`} id='credit-button' onMouseEnter={() => setCredit()} value={type} > Entrada</button>
                <button className={`debit-button ${type === 'debit' && 'debit'}`} id='debit-button' onMouseEnter={() => setDebit()} value={type} >Saída</button>
            </div>
            <form>
                <div className='input'>
                    <label htmlFor='valor'>Valor</label>
                    <input id='valor' type='number' name='value' onChange={(e) => setValue(e.target.value)} value={value} required />
                </div>
                <div className='input'>
                    <label htmlFor='categoria'>Categoria</label>
                    <input id='categoria' type='text' name='category' onChange={(e) => setCategory(e.target.value)} value={category} required />
                </div>
                <div className='input'>
                    <label htmlFor='data'>Data</label>
                    <InputMask  mask='99/99/9999'  id='data' type='text' name='date' onChange={(e) => setDate(e.target.value)} value={date} required/>
                </div>
                <div className='input'>
                    <label htmlFor='descricao'>Descrição</label>
                    <input id='descricao' type='text' onChange={(e) => setDescription(e.target.value)} value={description} required />
                </div>
            </form>
            <div className='botao'>
                <button className='btn-insert' onClick={() => handleRegisterTransactions()}>Confirmar</button>
            </div>
        </div>
    </div>
  );
}

export default ModalAdicionar;