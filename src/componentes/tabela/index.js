import './style.css';
import icone from '../../assets/icone.svg';
import editar from '../../assets/editar.svg';
import excluir from '../../assets/excluir.svg';
import linha from '../../assets/linha.svg';
import ModalExcluir from '../modalExcluir';
import Ordenacao from '../ordenacao';
import {useEffect, useState} from 'react';


function Tabela({setMostrarModalEditar, transactions, setMostrarFiltro, mostrarFiltro,  loadTransactions, setCurrentTransaction, setTransacions={setTransacions}, resumeCredit,  setResumeCredit,  resumeDebit,  setResumeDebit ,  ordenado, setOrdenado}) {

    const [transactionId, setTransactionId] = useState(0);
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [ordenar, setOrdenar] = useState('date');
    const [crescente, setCrescente] = useState(true);
    
    console.log(transactions)

    function handleOrdenar(campo) {
        if (campo === ordenar){
            return setCrescente(!crescente);
        }
        setCrescente(!crescente);
        setOrdenar(campo);
    }

    function ordenarValor(){
        if(crescente){
            const arrayOrdenado = transactions.sort((transactionA, transactionB) => {
                return transactionB.value - transactionA.value
            })

             setOrdenado(arrayOrdenado);
             return;
        }

        const arrayOrdenado = transactions.sort((transactionA, transactionB) => {
            return transactionA.value - transactionB.value
        })

         setOrdenado(arrayOrdenado);
       
    }

    function ordenarData(){
        if(crescente){
            const arrayOrdenado = transactions.sort((transactionA, transactionB) => {
                if (transactionA.date > transactionB.date){
                    return -1;
                } else if (transactionA.date < transactionB.date){
                    return 1;
                }
            })

             setOrdenado(arrayOrdenado);
             return;
        }

        const arrayOrdenado = transactions.sort((transactionA, transactionB) => {
            if (transactionA.date > transactionB.date){
                return 1;
            } else if (transactionA.date < transactionB.date){
                return -1;
            }
        })

         setOrdenado(arrayOrdenado);
    }

    const pegarDiaSemana = (data) => {
        const tratamentoData = data.split("/").reverse().join("/");
        const tratamentoData2 = new Date(tratamentoData);
        const weekday = tratamentoData2.getDay();

        return weekday;
    }

    function ordenarWeekDay(){

        if(crescente){
            const arrayOrdenado = transactions.sort((transactionA, transactionB) => {
                if (pegarDiaSemana(transactionA.date) > pegarDiaSemana(transactionB.date)){
                    return -1;
                } else if (pegarDiaSemana(transactionA.date) < pegarDiaSemana(transactionB.date)){
                    return 1;
                }
            })

             setOrdenado(arrayOrdenado);
             return;
        }

        const arrayOrdenado = transactions.sort((transactionA, transactionB) => {
            if (pegarDiaSemana(transactionA.date) > pegarDiaSemana(transactionB.date)){
                return 1;
            } else if (pegarDiaSemana(transactionA.date) < pegarDiaSemana(transactionB.date)){
                return -1;
            }
        })

         setOrdenado(arrayOrdenado);
    }


    function submit(){

        if (minValue && maxValue){
            console.log('ambos')
            return setOrdenado(transactions.filter(valor => valor.value >= minValue*100 && valor.value <= maxValue*100).map(e => e))
        }

        if (minValue){
            console.log({minValue})
            return setOrdenado(transactions.filter(valor => valor.value >= minValue*100).map(e => e))
        }

        if (maxValue){
            console.log({maxValue})
            return setOrdenado(transactions.filter(valor => valor.value <= maxValue*100).map(e => e))
        }
        
    }

    function atualizarResumo(tabela) {
        const transacoesExibidas = [...tabela];

        const transacoesCredito  = transacoesExibidas.filter(function (transacao) {
            return transacao.type === 'credit';
        });

        const transacoesDebito = transacoesExibidas.filter(function (transacao) {
            return transacao.type === 'debit';
        });

        const totalCredito = transacoesCredito.reduce(getTotalCredit, 0);
        function getTotalCredit(total, item){
            return total + item.value/100
        }

        const totalDebit = transacoesDebito.reduce(getTotalDebit, 0);
        function getTotalDebit(total, item){
            return total + item.value/100
        }

        setResumeCredit(totalCredito);
        setResumeDebit(totalDebit)
    }

    useEffect(() => {
        atualizarResumo(ordenado)
    })
    

  return (
    
    <div className='vert' >
        <div className='open-filters-button' onClick={() => setIsVisibleFilter(!isVisibleFilter)} >
            <img src={icone} />
            <span>Filtrar</span>
        </div>

        {isVisibleFilter && (
            <div className='filtro'>
                <h3>Valor</h3>
                <div className='min'>
                    <label htmlFor='min-value'>Min</label>
                    <input onChange={(e) => setMinValue(e.target.value)} id='min-value' type='number' />
                </div>
                <div className='max'>
                    <label htmlFor='max-value'>Max</label>
                    <input id='max-value'  onChange={(e) => setMaxValue(e.target.value)} type='number' />
                </div>
                <div className='botoes-filtro'>
                    <button className='btn-clear-filters' onClick={() => loadTransactions()}>Limpar Filtro</button>
                    <button className='btn-apply-filters' onClick={() => submit() }>Aplicar Filtro</button>
                </div>
            </div>

        )}
        
        <div className='table'>
            <div className='table-head'>
                <div onClick={() => {handleOrdenar('date'); ordenarData()}} className='column-title align-icon' id='date'>Data <span>{ordenar === 'date' ? <Ordenacao visivel={crescente} /> : ''}</span></div>
                <div onClick={() => {handleOrdenar('week_day'); ordenarWeekDay()}} className='column-title align-icon' id='week-day'>Dia da semana<span>{ordenar === 'week_day' ? <Ordenacao visivel={crescente} /> : ''}</span></div>
                <div className='column-title'>Descrição</div>
                <div className='column-title'>Categoria</div>
                <div onClick={() => {handleOrdenar('value'); ordenarValor() }} className='column-title align-icon' id='value'>Valor<span>{ordenar === 'value' ? <Ordenacao visivel={crescente} /> : ''}</span></div>
                <div className='column-title'></div>
            </div>

            <div className='table-body'>
               {ordenado.map((transaction) => (
                    <div className='table-line' key={transaction.id}>
                        <div className='line-items data'>{transaction.date.substr(0,10).split('-').reverse().join('/')}</div>
                        <div className='line-items'>{transaction.week_day[0].toUpperCase()+transaction.week_day.substr(1)}</div>
                        <div className='line-items'>{transaction.description}</div>
                        <div className='line-items'>{transaction.category}</div>
                        <div className={`line-items ${transaction.type === 'credit'? 'entrada' : 'saida' }`}>{(transaction.value/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</div>
                        <div className='line-items imagem'>
                            <img className='line-items edit-icon' onClick={() => {setMostrarModalEditar(true); setCurrentTransaction(transaction)}} src={editar} />
                            <img className='line-items delete-icon' onClick={() => setTransactionId(transaction.id) } src={excluir} />
                            {(transaction.id === transactionId) && <ModalExcluir id={transaction.id}  loadTransactions={loadTransactions} setTransactionId={setTransactionId}/>}
                        </div>
                    </div>
               ))}
                <img src={linha}/>
            </div>
        </div>
  
    </div>
    
  );
}

export default Tabela;