import './style.css';
import fechar from '../../assets/fechar.svg';
import InputMask from "react-input-mask";
import {useState, useEffect} from 'react';


function ModalEditar({setMostrarModalEditar, currentTransaction, loadTransactions}) {

    const [value, setValue] = useState(currentTransaction.value/100);
    const [category, setCategory] = useState(currentTransaction.category);
    const [date, setDate] = useState(currentTransaction.date.substr(0,10).split('-').reverse().join('/'));
    const [description, setDescription] = useState(currentTransaction.description);
    const [type, setType] = useState(currentTransaction.type);



    async function editar(){

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

            const dados = {
                value: tratamentoValue,
                date:  new Date(tratamentoData),
                week_day: tratamentoWeekDay.toString(),
                category: category,
                description: description,
                type: type
            }

            try {
                const response = await fetch(`http://localhost:3333/transactions/${currentTransaction.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados),
                    });
        
                const data = await response.json();
            
                loadTransactions()
                
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div className='containerM'>
        <div className='modal-container'>
            <div className='row-top'>
                <h1>Editar Registro</h1>
                <img className='close-icon' onClick={() => {setMostrarModalEditar(false)}} src={fechar} />
            </div>
            <div>
                <button className={`credit-button-editar ${type === 'credit' && 'credit'}`} id='credit-button' onClick={() => setType('credit')} >Entrada</button>
                <button className={`debit-button-editar ${type === 'debit' && 'debit'}`} id='debit-button' onClick={() => setType('debit')} >Saída</button>
            </div>
            <form>
                <div className='input'>
                    <label htmlFor='valor'>Valor</label>
                    <input id='valor' type='text' name='value' onChange={(e) => setValue(e.target.value)} value={value} />
                </div>
                <div className='input'>
                    <label htmlFor='categoria'>Categoria</label>
                    <input id='categoria' type='text' name='category' onChange={(e) => setCategory(e.target.value)} value={category} />
                </div>
                <div className='input'>
                    <label htmlFor='data'>Data</label>
                    <InputMask  mask='99/99/9999' id='data' type='text' name='date' onChange={(e) => setDate(e.target.value)} value={date} />
                </div>
                <div className='input'>
                    <label htmlFor='descricao'>Descrição</label>
                    <input id='descricao' type='text' onChange={(e) => setDescription(e.target.value)}  value={description}/>
                </div>
            </form>
            <div className='botao'>
                <button className='btn-insert' onClick={editar} >Confirmar</button>
            </div>
        </div>
    </div>
  );
}

export default ModalEditar;