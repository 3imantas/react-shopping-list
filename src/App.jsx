
import {useState} from 'react';

function App() {

	const [text, setText] = useState('');
	const [submitedTexts, setSubmitedTexts] = useState([]);
	const [counters, setCounters] = useState([]);
	const [isCrossedOut, setIsCrossedOut] = useState([]);
	const [totalCounter, setTotalCounter] = useState(0);
	const [checkbox, setCheckbox] = useState([]);

	const handleChange = (event) => {
		setText(event.target.value);
	};
	
	const handleSubmit = () => {
		if(text === '') return;
		
		setSubmitedTexts([...submitedTexts, text]);
		setText('');
		setCounters([...counters, 1]);
		setTotalCounter(totalCounter+1);
		setIsCrossedOut([...isCrossedOut, '']);
		setCheckbox([...checkbox, '✔'])
	};

	const increment = (index) => {
		const newCounter = [...counters];
		newCounter[index] += 1;
		setCounters(newCounter)
		setTotalCounter(totalCounter+1);
	}

	const decrement = (index) => {
		const newCounter = [...counters];
		if(newCounter[index] === 1) return;

		newCounter[index] -= 1;
		setCounters(newCounter)
		setTotalCounter(totalCounter-1);
	}

	const handleDelete = (index) => {
		submitedTexts.splice(index, 1);
		checkbox.splice(index, 1);
		isCrossedOut.splice(index, 1);
		setSubmitedTexts(submitedTexts);
		setTotalCounter(totalCounter-counters[index]);
		counters.splice(index, 1);
	}

	const handleCrossOut = (index) => {
		const newIsCrossedOut = [...isCrossedOut];
		const newCheckbox = [...checkbox];
		if(newIsCrossedOut[index] === ''){
			newIsCrossedOut[index] = 'crossed-out';
			newCheckbox[index] = '✔️';
		}
		else{
			newIsCrossedOut[index] = '';
			newCheckbox[index] = '✔';
		}
		setIsCrossedOut(newIsCrossedOut);
		setCheckbox(newCheckbox);
	}

	return(
		<div className='container'>
				<div className='textbox'>
					<input onChange={handleChange} value={text} type="text" placeholder='add item..'/>
					<button onClick={handleSubmit}> + </button>
				</div>
				<ul>
					{submitedTexts.map( (text, index) =>
						<div className='item'>
							<div className='controls'>
								<button onClick={() => handleDelete(index)}>🗑️</button>
								<button onClick={() => handleCrossOut(index)}>{checkbox[index]}</button>
								<li className={isCrossedOut[index]} key-value={index} > {text} </li>
							</div>
							<div className='counter'>
								<button className='decrement' onClick={ () => decrement(index)}> &lt; </button>
								<p>{counters[index]}</p>
								<button className='increment' onClick={ () => increment(index)}> &gt; </button>
							</div>
						</div>
						)}	
				</ul>
				<div className='total'>
					<p>Total: {totalCounter}</p>
				</div>
			
		</div>
	)
}

export default App;