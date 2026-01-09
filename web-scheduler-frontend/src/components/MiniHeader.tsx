import './MiniHeader.css'

const MiniHeader = () => {
  return (
    <header className="mini-header">
      <a className='mini-header-text' onClick={() => console.log('hahahah')}>Web Scheduler</a>
    </header>
  );
};

export default MiniHeader;