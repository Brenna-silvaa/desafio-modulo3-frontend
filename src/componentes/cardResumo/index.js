import './style.css';
import linha from '../../assets/linhaResumo.svg';



function Resumo({setMostrarModalAdd, resumeCredit,  setResumeCredit,  resumeDebit,  setResumeDebit}) {


  return (
    <div className='container'>
        <div className= 'container-resume'>
            <h1>Resumo</h1>
            <div className='gap'>
                <div className='info'>
                    <div>Entradas</div>
                    <div className='in'>R${resumeCredit}</div>
                </div>
                <div className='info'>
                    <div>Saídas</div>
                    <div className='out'>R${resumeDebit}</div>
                </div>
            </div>
            <img src={linha} />
            <div className='info saldo'>
                <div>Saldo</div>
                <div className='balance'>R$ {resumeCredit - resumeDebit}</div>
            </div>
        </div>

        <button className='btn-add' onClick={() => setMostrarModalAdd(true)}>Adicionar Registro</button>
    </div>
  );
}

export default Resumo;