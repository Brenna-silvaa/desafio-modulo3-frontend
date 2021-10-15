import './style.css';
import setinhaCima from '../../assets/setinhaCima.svg';
import setinhaBaixo from '../../assets/setinhaBaixo.svg';

function Ordenar({visivel}) {
  return (
    <div>
        {visivel ? <img src= {setinhaCima} /> : <img src={setinhaBaixo} />}
    </div>
  );
}

export default Ordenar;